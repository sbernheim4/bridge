import React from 'react';

import { Bid } from './biddingTypes';

interface BiddingHistoryProps {
    positions: string[];
    previousBids: Bid[];
}

export function BiddingHistory(props: BiddingHistoryProps): JSX.Element {

	const {
		positions,
		previousBids
	} = props;

	// eslint-disable-next-line no-undefined
	function getDisplayableBid(bid: Bid | undefined): string {
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

	function getMostRecentSuitBid(stackOfBids: Bid[]): Bid | undefined {
		return [...stackOfBids].reverse().find(bid => bid.level < 99);
	}

	return (
		<>
			<h3 className='bidding-system__history-header'>Bids ({getDisplayableBid(getMostRecentSuitBid(previousBids))})</h3>
			<div className='bidding-system__bidding-history'>
				{positions.map((position, index) => <p className='bidding-system__bidding-history--header' key={index}>{position}</p>)}

				{previousBids.map((bid, index) => {
					return <p key={index}>{getDisplayableBid(bid)}</p>
				})}
			</div>
		</>
	);
}

