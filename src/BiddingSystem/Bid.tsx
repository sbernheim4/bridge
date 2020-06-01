import React from 'react';

import { Bid, BidViewProps } from './types/biddingTypes';

import './scss/bid.scss';

export function BidView(props: BidViewProps) {

	function getDisplayableBid(bid: Bid | undefined) {

		if (!bid) {
			return '';
		}

		const suits = ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];

		if (bid.level === 99) {
			return 'Double';
		} else if (bid.level === 100) {
			return 'Pass';
		} else if (bid.level === 1 && suits[bid.suitIndex].slice(-1) === 's') {

			const suit = suits[bid.suitIndex];

			return `${bid.level} ${suit.slice(0, suit.length - 1)}`

		} else {
			return `${bid.level} ${suits[bid.suitIndex]}`
		}
	}

	return (
		<div className='bid'>
			<p
				className='bid__info'
				onClick={() => props.placeBid(props.bid)}
			>
				{getDisplayableBid(props.bid)}
			</p>
		</div>
	)

}
