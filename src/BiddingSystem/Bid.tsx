import React from 'React'

import {
	Bid
} from './biddingTypes.d'
import { getDisplayableBid } from './getDisplayableBid'

import './bid.scss';

interface BidViewProps {
	placeNewBid: (bid: Bid) => boolean;
	bid: Bid;
}

export function BidView(props: BidViewProps) {

	function handleClick() {
		console.log('clicked on', props.bid);

		props.placeNewBid(props.bid);
	}

	return (
		<div className='bid'>
			<p className='bid__info' onClick={handleClick}>- {getDisplayableBid(props.bid)}</p>
		</div>
	)

}
