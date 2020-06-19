import { receiveBid } from './../Firebase/';
import { Bid, NullableBid } from './types/biddingTypes'

export const getSuits = (): ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'] => ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];

function getAllBids() {
	const pass: Bid = { suitIndex: 100, level: 100 };
	const double: Bid = { suitIndex: 99, level: 99 };

	const levels = [1, 2, 3, 4, 5, 6, 7];
	const allBids: Bid[] = [];
	const suits = getSuits();

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

export function getValidBids(mostRecentBid: NullableBid) {
	const allBids = getAllBids();

	if (mostRecentBid === null) {
		return allBids;
	}

	const {
		suitIndex: previousSuitIndex,
		level: previousLevel
	} = mostRecentBid;

	function filterValidBids(currentBid: Bid) {

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

	const availableBids = allBids.filter(filterValidBids);

	return availableBids
		.sort((bidOne, bidTwo) => {
			return bidTwo.level - bidOne.level;
		})
		.reverse();

}

export function containsThreeConsecutivePasses(bids: Bid[]) {

	if (bids.length > 3) {

		const mostRecentThreeBids = bids.slice(-3);
		const hasThreeConsecutivePasses = mostRecentThreeBids.reduce((acc, current) => {
			return current.level === 100 && acc;
		}, true)

		return hasThreeConsecutivePasses;

	} else {

		return false;

	}

}

export function updateBidsFromServer(sessionId: string, setRecoredBids: (newBids: Bid[]) => void) {

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

export function determineRemainingBids(currentBids: Bid[]) {
	if (containsThreeConsecutivePasses(currentBids)) {
		return [];
	} else {
		const mostRecentSuitedBid = pureArrayReversse(currentBids).find(bid => bid.level < 99);
		const mostRecentBid: NullableBid = mostRecentSuitedBid || null;
		const remainingBids = getValidBids(mostRecentBid);

		return remainingBids;
	}
}

export function stringifyBid(bid: Bid | undefined) {

	if (!bid) {
		return '';
	}

	const suits = getSuits();

	switch(bid.level) {
		case 99:
			return 'Double';
		case 100:
			return 'Pass';
		default: {
			const suit = suits[bid.suitIndex];
			const lastCharacterOfSuitName = suit.slice(-1);
			const isLastCharacterS = lastCharacterOfSuitName === 's';

			if (isLastCharacterS) {
				return bid.level + ' ' + suit.slice(0, suit.length - 1)
			} else {
				return bid.level + ' ' + suit;
			}
		}
	}

}
