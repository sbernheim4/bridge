import React from 'react';

import { BidView } from './Bid';
import { AvailableBidsProps } from './types/biddingTypes'

export function AvailableBids(props: AvailableBidsProps): JSX.Element {

	const {
		validBids,
		placeNewBid
	} = props;

	return (
		<>
			<h3 className='bidding-system__available-header'>Available Bids</h3>
			<div className='bidding-system__available-bids'>
				{validBids.map((bid, index) => {
					return <BidView key={index} placeNewBid={placeNewBid} bid={bid}/>
				})}
			</div>
		</>
	);
}

