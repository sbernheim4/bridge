import React from 'react';

import { sendBid } from './../Firebase/';
import { containsThreeConsecutivePasses, determineRemainingBids } from './BiddingHistoryUtils';
import { BidView } from './Bid';
import { Bid, AvailableBidsProps } from './types/biddingTypes'

export function AvailableBids(props: AvailableBidsProps) {

	function placeBid(bid: Bid) {
		const updatedPreviousBidsArray = [...props.recordedBids, bid];

		if (!containsThreeConsecutivePasses(props.recordedBids)) {
			sendBid(updatedPreviousBidsArray, props.sessionId)
		}
	}

    const remainingBids = determineRemainingBids(props.recordedBids);

	return (
		<>
			<h3 className='bidding-system__available-header'>Available Bids</h3>

			<div className='bidding-system__available-bids'>

				{remainingBids.map((bid, index) => (
					<BidView
						key={index}
						placeBid={placeBid}
						bid={bid}
					/>
				))}

			</div>
		</>
	);
}
