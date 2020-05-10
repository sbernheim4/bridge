/* This is where you declare routes for client side routing and specify which component corresponds to which route */
/* The components for each route should be created in Routes/LazyLoadRoutes.jsx as this will enable lazy loading */
/* Routes or components (like navbar) which you don't want to be lazy loaded can be imported directly in this
 * file and SHOULD NOT be declared in LazyLoadRoutes.jsx
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Navbar should appear on every page and so should not be lazy loaded
import Navbar from "../Navbar/Navbar";

// Import lazy loaded route components
import { Home, ErrorPage } from './LazyLoadRoutes';
import { BiddingSystem } from './../BiddingSystem/BiddingSystem';

function Routes(): JSX.Element {

	const id = uuidv4();

	return (
		<div>
			<Navbar />

			<Switch>
				<Route exact path='/' render={(): JSX.Element => <Home id={id}/>}/>

				<Route exact path='/play' render={
						(): JSX.Element => <BiddingSystem
							currentBid={null}
							previousBids={[]}
							sessionId={id}
						/>
					}
				/>

				<Route component={ErrorPage}/> {/* This route is run when no matches are found - It's your 404 fallbback */}

			</Switch>
		</div>
	);
}

export default Routes;
