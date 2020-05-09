import React, { useState } from 'react';

import {
	Bid,
	BiddingSystemProps,
	NullableBid
} from './biddingTypes.d'
import { getDisplayableBid } from './getDisplayableBid';
import { BidView } from './Bid';

import './biddingSystem.scss';
import { sendBid } from './../Firebase/';

export function BiddingSystem(props: BiddingSystemProps): JSX.Element {

	const pass: Bid = { suitIndex: 100, level: 100 };
	const double: Bid = { suitIndex: 99, level: 99 };

	function getValidBids(previousBid: NullableBid, validBids: Bid[]): Bid[] {
		if (previousBid === null || previousBid.level >= 99 ) {
			return validBids;
		}

		const {
			suitIndex: previousSuitIndex,
			level: previousLevel
		} = previousBid;

		function filterValidBids(currentBid: Bid): boolean {

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

		const updatedValidBids = validBids.filter(newBid => filterValidBids(newBid));

		return updatedValidBids;
	}

	function getAllBids(): Bid[] {
		const suits = ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];
		const levels = [1, 2, 3, 4, 5, 6, 7];

		const allBids: Bid[] = [];

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


	const initialValidBids = getValidBids(props.currentBid, getAllBids())
		.sort((bidOne, bidTwo) => {
			return bidTwo.level - bidOne.level;
		})
		.reverse()
		.concat(double, pass)

	const [validBids, setValidBids] = useState(initialValidBids);
	const [previousBids, setPreviousBids] = useState(props.previousBids || []);
	const positions = ['North', 'East', 'South', 'West'];

	function containsThreeConsecutivePasses(bids: Bid[]): boolean {

		const mostRecentThreeBids = bids.slice(-3);
		const threeConsecutivePasses = mostRecentThreeBids.reduce((acc, current) => {
			return acc && current.level === 100;
		}, true)

		return threeConsecutivePasses;

	}

	function placeNewBid(bid: Bid): boolean {

		const updatedPreviousBidsArray = [...previousBids, bid];
		setPreviousBids(updatedPreviousBidsArray);

		if (containsThreeConsecutivePasses(updatedPreviousBidsArray)) {
			setValidBids([]);
			return false;
		}

		const updatedValidBids = getValidBids(bid, validBids);
		setValidBids(updatedValidBids);

		sendBid(updatedPreviousBidsArray, props.sessionId)

		return true;

	}

	function getMostRecentSuitBid(stackOfBids: Bid[]): Bid | undefined {
		return [...stackOfBids].reverse().find(bid => bid.level < 99);
	}

	return (
		<div className='bidding-system'>
            <h3 className='bidding-system__history-header'>Bids ({getDisplayableBid(getMostRecentSuitBid(previousBids))})</h3>

			<div className='bidding-system__bidding-history'>
				{positions.map((position, index) => <p className='bidding-system__bidding-history--header' key={index}>{position}</p>)}

				{previousBids.map((bid, index) => {
					return <p key={index}>{getDisplayableBid(bid)}</p>
				})}
			</div>

            <h3 className='bidding-system__available-header'>Available Bids</h3>
			<div className='bidding-system__available-bids'>
				{validBids.map((bid, index) => {
					return <BidView key={index} placeNewBid={placeNewBid} bid={bid}/>
				})}
			</div>

		</div>
	);
}
