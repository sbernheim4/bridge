import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Home, ErrorPage } from './LazyLoadRoutes';
import Navbar from './../Navbar/Navbar';
import { BiddingSystem } from './../BiddingSystem/BiddingSystem';

function Routes() {

	const getGameId = () => {
		try {
            // Currently possible as there is only 1 query param used throughout the whole app
			return window.location.href.split('?')[1].split('=')[1]
		} catch(err) {
			return uuidv4();
		}
	}

	const id = getGameId();

	return (
		<div>
			<Navbar />

			<Switch>

				<Route exact path='/' render={() => <Home id={id}/>}/>

				<Route exact path='/bid' render={() =>
					<BiddingSystem
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
