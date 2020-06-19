import React, { useState, useEffect } from 'react';

import { BiddingHistory } from './BiddingHistory';
import { updateBidsFromServer } from './BiddingHistoryUtils';
import { AvailableBids } from './AvailableBids';
import { BiddingSystemProps } from './types/biddingTypes'

import { HandContainer } from './../Cards/HandContainer';
import { generateAllHands } from './../Cards/utils';
/* import { Card } from './../Cards/types';
/* import { request } from './../global-utils'; */

import './scss/biddingSystem.scss';

export function BiddingSystem(props: BiddingSystemProps) {

	const initialHand = generateAllHands()[0];
	const [recordedBids, setRecordedBids] = useState(props.previousBids || []);
	const [hand] = useState(initialHand);

	useEffect(() => {
		// Connect to firebase DB and register event handlers
		updateBidsFromServer(props.sessionId, setRecordedBids);
	}, [props.sessionId])

	return (
		<div className='bidding-system'>
			<HandContainer
				cards={hand}
			/>

			<BiddingHistory
				previousBids={recordedBids}
			/>

			<AvailableBids
				sessionId={props.sessionId}
				recordedBids={recordedBids}
			/>

		</div>
	);
}
