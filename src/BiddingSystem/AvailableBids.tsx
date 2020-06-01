import React from 'react';

import { sendBid } from './../Firebase/';
import { containsThreeConsecutivePasses } from './BiddingHistoryUtils';
import { BidView } from './Bid';
import { Bid, AvailableBidsProps } from './types/biddingTypes'

export function AvailableBids(props: AvailableBidsProps): JSX.Element {

	function placeBid(bid: Bid) {
		const updatedPreviousBidsArray = [...props.recordedBids, bid];

		if (!containsThreeConsecutivePasses(props.recordedBids)) {
			sendBid(updatedPreviousBidsArray, props.sessionId)
		}
	}

	return (
		<>
			<h3 className='bidding-system__available-header'>Available Bids</h3>

			<div className='bidding-system__available-bids'>

				{props.validBids.map((bid, index) => (
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

