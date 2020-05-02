import {
	DisplayBid,
	Bid,
} from './biddingTypes.d'

import React, { useState } from 'react';

import { BidView } from './Bid';

export function BiddingSystem(props: { currentBid: Bid; numberOfPasses: number }) {

	const [currBid, setCurrBid] = useState(props.currentBid || null);

	const double: Bid = {
		suitIndex: 99,
		level: 99
	};
	const suits = ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];
	const levels = [1, 2, 3, 4, 5, 6, 7];

	function isValidBid(previousBid: Bid, newBid: Bid) {
		const {
			suitIndex: previousSuitIndex,
			level: previousLevel
		} = previousBid;

		const {
			suitIndex: newSuitIndex,
			level: newLevel,
		} = newBid;

		// No bid has been made and this is the first one
		if (previousBid === null) {
			return true;
		}

		if (newLevel > previousLevel) {

			return true;

		} else if (newLevel < previousLevel) {

			return false;

		} else {
			// Level is the same

			if (newSuitIndex < previousSuitIndex) {

				return true;

			} else {

				return false;

			}

		}

	}

	function placeNewBid(newSuit: string, newLevel: number) {

		const suitIndex = suits.indexOf(newSuit);

		const newBid: Bid = {
			suitIndex,
			level: newLevel
		}

		// No bidding allowed after three passes
		if (props.numberOfPasses === 3) {
			// throw an error
		}

        const isValid = props.currentBid === null ?
            true :
            isValidBid(props.currentBid, newBid);

		if (isValid) {
			// TODO: Fire new bid to the server
			setCurrBid(newBid);
		} else {
			// throw error
		}

	}

	function getValidBidsTwo(currentBid: Bid) {

		let allBids: Bid[] = [];

		for (const level of levels) {
			for (const suit of suits) {
				allBids.push({
					level: level,
					suitIndex: suits.indexOf(suit)
				})
			}
		}

		const validBids = allBids.filter(bid => isValidBid(currentBid, bid));

		return [...validBids, double];

    }


	const validBids = getValidBidsTwo(props.currentBid);
	const displayValidBids: DisplayBid[] = validBids.map(bid => {
		return {
			suit: suits[bid.suitIndex],
			level: bid.level
		};
	});

	return (
		<div className='bidding-system'>
			<div className='bidding-system__current-bids'>
				<h1>{props.currentBid.level} {suits[props.currentBid.suitIndex]}</h1>
			</div>

			<div className='bidding-system__available-bids'>
				{displayValidBids.map((bid, index) => <BidView key={index} placeNewBid={placeNewBid} bid={bid}/>)}
			</div>
		</div>
	)

}
