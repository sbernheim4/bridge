import React, { useState, useEffect } from 'react';

import { BiddingHistory } from './BiddingHistory';
import { AvailableBids } from './AvailableBids';
import { Bid, BiddingSystemProps, NullableBid } from './types/biddingTypes'
import { updateBidsFromServer } from './BiddingHistoryUtils';
import { sendBid } from './../Firebase/';

import './scss/biddingSystem.scss';

export function BiddingSystem(props: BiddingSystemProps): JSX.Element {

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

	function getInitialValidBids(bid: NullableBid): Bid[] {

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

		const pass: Bid = { suitIndex: 100, level: 100 };
		const double: Bid = { suitIndex: 99, level: 99 };

		const res = getValidBids(bid, getAllBids())
			.sort((bidOne, bidTwo) => {
				return bidTwo.level - bidOne.level;
			})
			.reverse()
			.concat(double, pass);

		return res;
	}

	const [validBids, setValidBids] = useState(getInitialValidBids(props.currentBid));
	const [previousBids, setPreviousBids] = useState(props.previousBids || []);
	const positions = ['North', 'East', 'South', 'West'];

	useEffect(() => {
		updateBidsFromServer(props.sessionId, setPreviousBids);
	}, [props.sessionId]);

	function placeNewBid(bid: Bid): boolean {

		function containsThreeConsecutivePasses(bids: Bid[]): boolean {

			const mostRecentThreeBids = bids.slice(-3);
			const threeConsecutivePasses = mostRecentThreeBids.reduce((acc, current) => {
				return acc && current.level === 100;
			}, true)

			return threeConsecutivePasses;

		}

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

	return (
		<div className='bidding-system'>

			<BiddingHistory positions={positions} previousBids={previousBids} />
			<AvailableBids validBids={validBids} placeNewBid={placeNewBid} />

		</div>
	);
}
