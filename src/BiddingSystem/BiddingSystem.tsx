import {
	DisplayBid,
	Bid,
} from './biddingTypes.d'

import React, { useState } from 'react';

import { BidView } from './Bid';

export function BiddingSystem(props: { currentBid: Bid; numberOfPasses: number }) {

	const [currBid, setCurrBid] = useState(props.currentBid || null);

	const double: Bid = { suitIndex: 99, level: 99 };
	const suits = ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];
	const allBids = getAllBids();
	const validBids = getValidBids(props.currentBid);

	const displayableValidBids: DisplayBid[] = validBids.map(bid => {
		return {
			suit: suits[bid.suitIndex],
			level: bid.level
		};
	});

	function getAllBids() {
		let allBids: Bid[] = [];

		const levels = [1, 2, 3, 4, 5, 6, 7];

		for (const level of levels) {
			for (const suit of suits) {

				allBids.push({
					level: level,
					suitIndex: suits.indexOf(suit)
				});

			}
		}

		return allBids;

	}

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

		// No previous bids have been made yet
		if(previousBid === null) {
			return true;
		}

		// Allow a bid of Double at any time
		if (newSuitIndex === 99) {
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

		const newBid: Bid = {
			suitIndex: newSuit === 'Double' ? 99 : suits.indexOf(newSuit),
			level: newLevel
		}

		// No bidding allowed after three passes
		if (props.numberOfPasses === 3) {
			// throw an error
		}

		// Note: This will always be true as user can only select valid bids
        const isValid = isValidBid(props.currentBid, newBid);

		if (isValid) {
			// TODO: Fire new bid to the server
			setCurrBid(newBid);
		} else {
			// throw error
		}

	}

	function getValidBids(currentBid: Bid) {
		const validBids = allBids.filter(bid => isValidBid(currentBid, bid));

		return [...validBids, double];
    }

	return (
		<div className='bidding-system'>
			<div className='bidding-system__current-bids'>
				<h1>{props.currentBid.level} {suits[props.currentBid.suitIndex]}</h1>
			</div>

			<div className='bidding-system__available-bids'>
				{displayableValidBids.map((bid, index) => <BidView key={index} placeNewBid={placeNewBid} bid={bid}/>)}
			</div>
		</div>
	)

}
