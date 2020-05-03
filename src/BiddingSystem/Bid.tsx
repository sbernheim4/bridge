import React from 'React'

import {
	DisplayBid
} from './biddingTypes.d'

import './bid.scss';

interface BidViewProps {
	placeNewBid: (bid: DisplayBid) => boolean;
	bid: DisplayBid;
}

export function BidView(props: BidViewProps) {

	const level = props.bid.suit === 'Double' ? '' : props.bid.level;

	function handleClick() {
		console.log('clicked on', props.bid);

		props.placeNewBid(props.bid);
	}

	return (
		<div className='bid'>
		<p className='bid__info' onClick={handleClick}>- {level} {props.bid.suit}</p>
		</div>
	)

}
