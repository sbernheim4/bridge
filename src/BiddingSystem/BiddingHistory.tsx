import React from 'react';

import { Bid, BiddingHistoryProps } from './types/biddingTypes';
import { compose } from './../../src/global-utils';
import { getSuits, stringifyBid } from './BiddingHistoryUtils';

export function BiddingHistory(props: BiddingHistoryProps) {

	const playerPositions = ['North', 'East', 'South', 'West'];
	const { previousBids } = props;

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
