import React from 'react';
import Loadable from 'react-loadable';

const loading = () => <div>Loading...</div>;

export const Home = Loadable({
	loader: () => import('./Home/Home'),
	loading
});

export const ErrorPage = Loadable({
	loader: () => import ('./404/404'),
	loading
});
