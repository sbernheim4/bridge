import {
	DisplayBid,
	Bid,
} from './biddingTypes.d'

import React, { useState } from 'react';

import { BidView } from './Bid';

export function BiddingSystem(props: { currentBid: Bid; numberOfPasses: number }) {

	const [currBid, setCurrBid] = useState(props.currentBid || null);

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

			if (newSuitIndex > previousSuitIndex) {

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


	function getValidBids(currentBid: Bid) {
		if (currentBid === null) {

			let validBids: Bid[] = [];

			for (const level of levels) {
				for (const suit of suits) {
					validBids.push({
						level: level,
						suitIndex: suits.indexOf(suit)
					})
				}
			}

			return validBids;

		} else {

			const validSuitsForCurrentLevel = getValidSuitsForCurrentLevel(currentBid); // tied to
			const validSuitsForHigherLevel = getValidSuitsForHigherLevel();

			const bidsForCurrentLevel = validSuitsForCurrentLevel.map(suit => {
				let levelF;

				if (currentBid !== null) {
					levelF = typeof currentBid.level === 'number' ?
						currentBid.level :
						1
				} else {
					levelF = currentBid.level
				}

				return {
					suitIndex: suits.indexOf(suit),
					level: levelF
				}
			});

			const bidsForHigherLevel: Bid[] = [];

			const currentLevel = currentBid !== null && typeof currentBid.level === 'number' ?
				currentBid.level :
				1;

			for (const level of levels.slice(currentLevel)) {
				for (const suit of validSuitsForHigherLevel) {
					bidsForHigherLevel.push({
						level: level,
						suitIndex: suits.indexOf(suit)
					})
				}
			}

			return [...bidsForCurrentLevel, ...bidsForHigherLevel];

		}

	}

	function getValidSuitsForCurrentLevel(currentBid: Bid) {

		if (currentBid === null) {
			return suits;
		} else {
			const { suitIndex } = currentBid;

			return suits.slice(0, suitIndex);
		}

	}

	function getValidSuitsForHigherLevel() {
		return suits;
	}

	const validBids = getValidBids(props.currentBid);
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
