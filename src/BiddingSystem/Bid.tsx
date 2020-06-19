import React from 'react';

import { sendBid } from './../Firebase/';
import { containsThreeConsecutivePasses, stringifyBid } from './BiddingHistoryUtils';
import { Bid, BidViewProps } from './types/biddingTypes';

import './scss/bid.scss';

export function BidView(props: BidViewProps) {

	function placeBid(bid: Bid) {
		const updatedPreviousBidsArray = [...props.recordedBids, bid];

		if (!containsThreeConsecutivePasses(props.recordedBids)) {
			sendBid(updatedPreviousBidsArray, props.sessionId)
		} else {
			// Bidding is complete
			// Redirect to the game
        }
	}

	return (
		<div className='bid'>
			<p className='bid__info' onClick={() => placeBid(props.bid)}>
				{stringifyBid(props.bid)}
			</p>
		</div>
	)

}
