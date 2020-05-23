import { useEffect } from 'react';
import { receiveBid } from './../Firebase/';
import { Bid, NullableBid } from './types/biddingTypes'

function getAllBids(): Bid[] {
	const pass: Bid = { suitIndex: 100, level: 100 };
	const double: Bid = { suitIndex: 99, level: 99 };

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

	return allBids.concat(double, pass);
}

export function getValidBids(mostRecentBid: NullableBid): Bid[] {
	const allBids = getAllBids();

	if (mostRecentBid === null) {
		return allBids;
	}

	const {
		suitIndex: previousSuitIndex,
		level: previousLevel
	} = mostRecentBid;

	function filterValidBids(currentBid: Bid): boolean {

		const {
			suitIndex: newSuitIndex,
			level: newLevel,
		} = currentBid;

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

	const availableBids = allBids.filter(newBid => filterValidBids(newBid));

	return availableBids
		.sort((bidOne, bidTwo) => {
			return bidTwo.level - bidOne.level;
		})
		.reverse();

}

export function containsThreeConsecutivePasses(bids: Bid[]): boolean {

	if (bids.length > 3) {

		const mostRecentThreeBids = bids.slice(-3);
		const hasThreeConsecutivePasses = mostRecentThreeBids.reduce((acc, current) => {
			return acc && current.level === 100;
		}, true)

		return hasThreeConsecutivePasses;

	} else {

		return false;

	}

}

function updateBidsFromServer(sessionId: string, setRecoredBids: (newBids: Bid[]) => void) {

	const bidReceiver = receiveBid(sessionId);

	bidReceiver(childSnapshot => {

		if (childSnapshot.val() && childSnapshot.val().bids) {

			const updatedBids = childSnapshot.val().bids;

			setRecoredBids(updatedBids);

		}

	});

}

// eslint-disable-next-line
// @ts-ignore
// eslint-disable-next-line
function pureArrayReversse(arr: any[]) {
	const copy = arr.map(x => x);

	return copy.reverse();
}

// Custom useEffect hook
export const useSyncBidsWithDB = (
	sessionId: string,
	recordedBids: Bid[],
	setRecordedBids: (newBids: Bid[]) => void,
	setRemainingBids: (currentBids: Bid[]) => void
) => {

	useEffect(() => {
		// Connect to firebase DB and register event handlers
		updateBidsFromServer(sessionId, setRecordedBids);
	}, [sessionId])

	useEffect(() => {

		if (containsThreeConsecutivePasses(recordedBids)) {

			setRemainingBids([]);

		} else {

			const mostRecentSuitedBid = pureArrayReversse(recordedBids).find(bid => bid.level < 99);
			const mostRecentBid: NullableBid = mostRecentSuitedBid || null;
			const remainingBids = getValidBids(mostRecentBid);

			setRemainingBids(remainingBids)

		}

	}, [recordedBids])

}
