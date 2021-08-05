import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import dts from 'rollup-plugin-dts';

import pkg from './package.json';

const packageName = pkg.name.replace('@nl/', '');
const extensions = ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'];

const buildFolder = 'dist/';
const inputFileName = 'src/index.ts';
const isBareModuleId = (id, parent, isResolved) => (!isResolved && !id.startsWith('.') && !id.includes(path.join(process.cwd(), 'modules')));

const cjs = [{
	input: inputFileName,
	output: {
		file: `${buildFolder}cjs/index.js`,
		sourcemap: true,
		format: 'cjs',
		esModule: false,
	},
	external: isBareModuleId,
	plugins: [
		resolve({
			extensions,
		}),
		babel({
			exclude: /node_modules/,
			extensions,
			sourceMaps: true,
			runtimeHelpers: true,
		}),
		replace({'process.env.NODE_ENV': JSON.stringify('development')}),
	],
}, {
	input: inputFileName,
	output: {file: `${buildFolder}cjs/index.min.js`, sourcemap: true, format: 'cjs'},
	external: isBareModuleId,
	plugins: [
		resolve({
			extensions,
		}),
		babel({
			exclude: /node_modules/,
			extensions,
			sourceMaps: true,
			runtimeHelpers: true,
		}),
		replace({'process.env.NODE_ENV': JSON.stringify('production')}),
		terser(),
	],
}];

const esm = [
	{
		input: inputFileName,
		output: {file: `${buildFolder}esm/index.js`, sourcemap: true, format: 'esm'},
		external: isBareModuleId,
		plugins: [
			resolve({
				extensions,
			}),
			babel({
				exclude: /node_modules/,
				extensions,
				runtimeHelpers: true,
				sourceMaps: true,
				plugins: [['@babel/transform-runtime', {useESModules: true}]],
				rootMode: 'upward',
			}),
		],
	},
];

const globals = {
	react: 'React',
	'react-bootstrap': 'react-bootstrap',
	'react-dom': 'ReactDOM',
	'prop-types': 'PropTypes',
	classnames: 'classnames',
};

const umd = [
	{
		input: inputFileName,
		output: {
			file: `${buildFolder}umd/index.js`,
			sourcemap: true,
			sourcemapPathTransform: (relativePath) => relativePath.replace(/^.*?\/node_modules/, '../../node_modules'),
			format: 'umd',
			name: packageName,
			globals,
		},
		external: Object.keys(globals),
		plugins: [
			babel({
				exclude: /node_modules/,
				extensions,
				runtimeHelpers: true,
				sourceMaps: true,
				plugins: [['@babel/transform-runtime', {useESModules: true}]],
				rootMode: 'upward',
			}),
			resolve({
				extensions,
			}),
			commonjs({
				include: /node_modules/,
				namedExports: {
					'../../node_modules/react-is/index.js': ['isValidElementType'],
				},
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify('development'),
			}),
			json(),
		],
	},
	{
		input: inputFileName,
		output: {
			file: `${buildFolder}umd/index.min.js`,
			sourcemap: true,
			sourcemapPathTransform: (relativePath) => relativePath.replace(/^.*?\/node_modules/, '../../node_modules'),
			format: 'umd',
			name: packageName,
			globals,
		},
		external: Object.keys(globals),
		plugins: [
			babel({
				exclude: /node_modules/,
				extensions,
				runtimeHelpers: true,
				sourceMaps: true,
				plugins: [['@babel/transform-runtime', {useESModules: true}]],
				rootMode: 'upward',
			}),
			resolve({
				extensions,
				browser: true,
				modulesOnly: true,
			}),
			commonjs({
				include: /node_modules/,
				namedExports: {
					'../../node_modules/react-is/index.js': ['isValidElementType'],
				},
			}),
			replace({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			terser(),
			json(),
		],
	},
];

const dtsConfig = [
	{
		input: inputFileName,
		output: [{file: `${buildFolder}cjs/index.d.ts`, format: 'es'}],
		plugins: [dts()],
	},
];

// eslint-disable-next-line import/no-mutable-exports
let config;

switch (process.env.BUILD_ENV) {
	case 'cjs':
		config = cjs;
		break;
	case 'esm':
		config = esm;
		break;
	case 'umd':
		config = umd;
		break;
	default:
		config = dtsConfig.concat(cjs).concat(esm).concat(umd);
}

export default config;
