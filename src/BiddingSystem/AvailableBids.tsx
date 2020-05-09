import React from 'react';

import { BidView } from './Bid';
import { Bid } from './biddingTypes.d'

interface BiddingHistoryProps {
	validBids: Bid[];
	placeNewBid(bid: Bid): boolean;
}

export function AvailableBids(props: BiddingHistoryProps): JSX.Element {

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

