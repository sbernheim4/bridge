import React from 'react';
import { useHistory } from 'react-router-dom';

import { sendBid } from './../Firebase/';
import { containsThreeConsecutivePasses, stringifyBid } from './BiddingHistoryUtils';
import { Bid, BidViewProps } from './types/biddingTypes';

import './scss/bid.scss';

export function BidView(props: BidViewProps) {
	const history = useHistory();

	function placeBid(bid: Bid) {
		const updatedPreviousBidsArray = [...props.recordedBids, bid];

		// Determine if the bid should be sent to the server
		if (!containsThreeConsecutivePasses(props.recordedBids)) {
			sendBid(updatedPreviousBidsArray, props.sessionId)
		}

		// If in all the bids placed, there are three passes, redirect the user to /play
		if (
			containsThreeConsecutivePasses(props.recordedBids) ||
			containsThreeConsecutivePasses(updatedPreviousBidsArray)
		) {
			history.push('/play');
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
