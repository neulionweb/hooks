import React from 'react';
import {Route, Switch} from 'react-router-dom';

export const routes = [
	{
		path: '/',
		exact: true,
		name: 'Introduction',
		component: React.lazy(() => import('../dev_site/pages/introduction')),
	},
];

const MainRoute = () => (
		<Switch>
			{routes.map((route) => (
					<Route
							key={route.name} exact={!!route.exact} path={route.path}
							render={() => <route.component />} />
			))}
		</Switch>
);

export default MainRoute;
