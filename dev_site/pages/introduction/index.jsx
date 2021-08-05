import Markdown from '../../libs/markdown';

export default class DL extends Markdown {
	document() {
		return require('../../docs/introduction.md');
	}
}
