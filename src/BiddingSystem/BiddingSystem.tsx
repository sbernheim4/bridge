import React, { useState, useEffect } from 'react';

import { BiddingHistory } from './BiddingHistory';
import { AvailableBids } from './AvailableBids';
import { updateBidsFromServer } from './BiddingHistoryUtils';
import { BiddingSystemProps } from './types/biddingTypes'

import './scss/biddingSystem.scss';

export function BiddingSystem(props: BiddingSystemProps) {

	const [recordedBids, setRecordedBids] = useState(props.previousBids || []);

	useEffect(() => {
		// Connect to firebase DB and register event handlers
		updateBidsFromServer(props.sessionId, setRecordedBids);
	}, [props.sessionId])

	return (
		<div className='bidding-system'>

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
