import {
	DisplayBid,
	Bid,
} from './biddingTypes.d'

import React, { useState } from 'react';

import { BidView } from './Bid';

export function BiddingSystem(props: { currentBid: Bid; numberOfPasses: number }) {

	const [usersBid, setUsersBid] = useState(null);

	const double: DisplayBid = { suit: 'Double', level: 99 };
	const suits = ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];
	const allBids = getAllBids();
	const validBids = getValidBids(props.currentBid);

	let displayableValidBids: DisplayBid[] = validBids
		.sort((bidOne, bidTwo) => {
			//@ts-ignore
			return bidTwo.level - bidOne.level;
		})
		.map(bid => {
			return {
				suit: suits[bid.suitIndex],
				level: bid.level
			};
		})
		.reverse();

	displayableValidBids.push(double);

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

	function isCurrentBidValid(previousBid: Bid, currentBid: Bid) {
		let {
			suitIndex: previousSuitIndex,
			level: previousLevel
		} = previousBid;

		// If the previous bid was a Double, use the bid before the Double to filter
		// out invalid bid
		if (previousBid.previousLevel && previousBid.previousSuitIndex) {
			previousSuitIndex = previousBid.previousSuitIndex;
			previousLevel = previousBid.previousLevel;
		}

		const {
			suitIndex: newSuitIndex,
			level: newLevel,
		} = currentBid;

		// No previous bids have been made yet
		if (previousBid === null) {
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

	function placeNewBid(bid: DisplayBid) {

		const {
			suit,
			level
		} = bid;

		// When bidding Double, store the previous bid suit and level in optional props
		const isDoubleBid = suit === 'Double';

		const newBid: Bid = {
			suitIndex: isDoubleBid ? 99 : suits.indexOf(suit),
			level: level,
			previousSuitIndex: isDoubleBid ? props.currentBid.suitIndex : undefined, // eslint-disable-line no-undefined
			previousLevel: isDoubleBid ? props.currentBid.level : undefined // eslint-disable-line no-undefined
		}

		// No bidding allowed after three passes
		if (props.numberOfPasses === 3) {
			// throw an error
		}

		// Note: This will always be true as user can only select valid bids
        const isValid = isCurrentBidValid(props.currentBid, newBid);

		if (isValid) {
			// TODO: Fire new bid to the server

			setUsersBid(newBid);
			return true;
		} else {
			return false;
		}

	}

	function getValidBids(currentBid: Bid) {
		const validBids = allBids.filter(bid => isCurrentBidValid(currentBid, bid));

		return validBids;
    }

	function getDisplayableBid(bid: Bid) {
		if (bid.suitIndex === 99) {

		}
	}

	return (
		<div className='bidding-system'>
			<div className='bidding-system__current-bids'>
				<h1>{props.currentBid.level} {suits[props.currentBid.suitIndex]}</h1>
			</div>

			<div className='bidding-system__available-bids'>
				{displayableValidBids.map((bid, index) => {
					return <BidView key={index} placeNewBid={placeNewBid} bid={bid}/>
				})}
			</div>
		</div>
	)

}
