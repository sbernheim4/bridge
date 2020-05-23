import React, { useState } from 'react';

import { BiddingHistory } from './BiddingHistory';
import { AvailableBids } from './AvailableBids';
import {
	getValidBids,
	useSyncBidsWithDB,
	containsThreeConsecutivePasses
} from './BiddingHistoryUtils';
import { sendBid } from './../Firebase/';
import { Bid, BiddingSystemProps } from './types/biddingTypes'

import './scss/biddingSystem.scss';

export function BiddingSystem(props: BiddingSystemProps): JSX.Element {

	const [remainingBids, setRemainingBids] = useState(getValidBids(props.currentBid));
	const [recordedBids, setRecordedBids] = useState(props.previousBids || []);
	const positions = ['North', 'East', 'South', 'West'];

	// Custom useEffect hook
	useSyncBidsWithDB(
		props.sessionId,
		recordedBids,
		setRecordedBids,
		setRemainingBids
	);

	function placeNewBid(bid: Bid) {
		const updatedPreviousBidsArray = [...recordedBids, bid];

		if (!containsThreeConsecutivePasses(recordedBids)) {
			sendBid(updatedPreviousBidsArray, props.sessionId)
		}
	}

	console.log(remainingBids);
	return (
		<div className='bidding-system'>

			<BiddingHistory positions={positions} previousBids={recordedBids} />
			<AvailableBids validBids={remainingBids} placeNewBid={placeNewBid} />

		</div>
	);
}
