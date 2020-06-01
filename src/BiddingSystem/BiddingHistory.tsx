import React from 'react';

import { Bid, BiddingHistoryProps } from './types/biddingTypes';
import { compose } from './../../src/global-utils';

export function BiddingHistory(props: BiddingHistoryProps) {

	const playerPositions = ['North', 'East', 'South', 'West'];
	const { previousBids } = props;

	const stringifyBid = (bid: Bid | undefined) => {

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

	const getMostRecentSuittedBid = (stackOfBids: Bid[]) => {
		return [...stackOfBids]
			.reverse()
			.find(bid => bid.level < 99);
	}

	const getDisplayableCurrentBid = compose(stringifyBid, getMostRecentSuittedBid);

	const currentBid = getDisplayableCurrentBid(previousBids);

	return (
		<>
			<h3 className='bidding-system__history-header'>Bids ({currentBid})</h3>
			<div className='bidding-system__bidding-history'>

				{playerPositions.map((position, index) =>
					<p className='bidding-system__bidding-history--header' key={index}>{position}</p>
				)}

				{previousBids.map((bid, index) => {
					return <p key={index}>{stringifyBid(bid)}</p>
				})}

			</div>
		</>
	);
}
