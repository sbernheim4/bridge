import React, { useState } from 'react';

import {
	Bid,
} from './biddingTypes.d'
import { getDisplayableBid } from './getDisplayableBid';
import { BidView } from './Bid';

import './biddingSystem.scss';

export function BiddingSystem(props: { currentBid: Bid; numberOfPasses: number, previousBids: Bid[] }) {

	const pass: Bid = { suitIndex: 100, level: 100 };
	const double: Bid = { suitIndex: 99, level: 99 };
	const suits = ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];
	const allBids = getAllBids();
	const initialValidBids = getValidBids(props.currentBid, allBids)
		.sort((bidOne, bidTwo) => {
			return bidTwo.level - bidOne.level;
		})
		.reverse()
		.concat(double, pass)

	const [validBids, setValidBids] = useState(initialValidBids);
	const [previousBids, setPreviousBids] = useState(props.previousBids || []);

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

	function placeNewBid(bid: Bid) {

		const updatedPreviousBidsArray = [...previousBids, bid];
		setPreviousBids(updatedPreviousBidsArray);

		const mostRecentThreeBids = updatedPreviousBidsArray.slice(-3);
		const threePasses = mostRecentThreeBids.reduce((acc, current) => {
			return acc && current.level === 100;
		}, true)

		if (threePasses) {
			setValidBids([]);
			return false;
		}

		const updatedValidBids = getValidBids(bid, validBids);
		setValidBids(updatedValidBids);

		return true;

	}

	function getValidBids(previousBid: Bid, validBids: Bid[]) {
		if (previousBid === null || previousBid.level >= 99 ) {
			return validBids;
		}

		const updatedValidBids = validBids.filter(newBid => isCurrentBidValid(previousBid, newBid));

		return updatedValidBids;
    }

	function getMostRecentSuitBid(stackOfBids: Bid[]) {
		return [...stackOfBids].reverse().find(bid => bid.level < 99)
	}

	return (
		<div className='bidding-system'>
			<div className='bidding-system__current-bid'>
				<h1>{getDisplayableBid(getMostRecentSuitBid(previousBids))}</h1>
			</div>

			<div className='bidding-system__bidding-history'>
				{previousBids.map((bid, index) => {
					return <p key={index}>{getDisplayableBid(bid)}</p>
				})}
			</div>

			<div className='bidding-system__available-bids'>
				{validBids.map((bid, index) => {
					return <BidView key={index} placeNewBid={placeNewBid} bid={bid}/>
				})}
			</div>
		</div>
	);
}
