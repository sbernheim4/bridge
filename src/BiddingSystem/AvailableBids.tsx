import React from 'react';

import { determineRemainingBids } from './BiddingHistoryUtils';
import { BidView } from './Bid';
import { AvailableBidsProps } from './types/biddingTypes'

export function AvailableBids(props: AvailableBidsProps) {

    const remainingBids = determineRemainingBids(props.recordedBids);

	return (
		<>
			<h3 className='bidding-system__available-header'>Available Bids</h3>

			<div className='bidding-system__available-bids'>

				{remainingBids.map((bid, index) => (
					<BidView
						key={index}
						recordedBids={props.recordedBids}
						sessionId={props.sessionId}
						bid={bid}
					/>
				))}

			</div>
		</>
	);
}
