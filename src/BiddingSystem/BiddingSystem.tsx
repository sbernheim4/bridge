import React from 'react';

import { BiddingHistory } from './BiddingHistory';
import { AvailableBids } from './AvailableBids';
import { useSyncBidsWithDB, useBiddingInfo } from './BiddingHistoryUtils';
import { BiddingSystemProps } from './types/biddingTypes'

import './scss/biddingSystem.scss';

export function BiddingSystem(props: BiddingSystemProps) {

	const bidTrackingInfo = useBiddingInfo(props.currentBid, props.previousBids);
	const { remainingBids, recordedBids, } = bidTrackingInfo;

	useSyncBidsWithDB(props.sessionId, bidTrackingInfo);

	return (
		<div className='bidding-system'>

			<BiddingHistory
				previousBids={recordedBids}
			/>

			<AvailableBids
				sessionId={props.sessionId}
				recordedBids={recordedBids}
				validBids={remainingBids}
			/>

		</div>
	);
}
