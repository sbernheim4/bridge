import React from 'react';

import { Bid, BiddingHistoryProps } from './types/biddingTypes';

export function BiddingHistory(props: BiddingHistoryProps): JSX.Element {

	const positions = ['North', 'East', 'South', 'West'];
	const { previousBids } = props;

	function stringifyBid(bid: Bid | undefined): string {

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

			return `${bid.level} ${suits[bid.suitIndex]}`;

		}
	}

	function getMostRecentSuitBid(stackOfBids: Bid[]) {
		return [...stackOfBids]
			.reverse()
			.find(bid => bid.level < 99);
	}

	return (
		<>
			<h3 className='bidding-system__history-header'>Bids ({stringifyBid(getMostRecentSuitBid(previousBids))})</h3>
			<div className='bidding-system__bidding-history'>

				{positions.map((position, index) =>
					<p className='bidding-system__bidding-history--header' key={index}>{position}</p>
				)}

				{previousBids.map((bid, index) => {
					return <p key={index}>{stringifyBid(bid)}</p>
				})}
			</div>
		</>
	);
}
