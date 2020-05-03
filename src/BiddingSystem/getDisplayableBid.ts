import {
	Bid
} from './biddingTypes'


export function getDisplayableBid(bid: Bid) {

	if (!bid) {
		return '';
	}

	const suits = ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];

	if (bid.level === 99) {
		return 'Double';
	} else if (bid.level === 100) {
		return 'Pass';
	} else if (bid.level === 1 && suits[bid.suitIndex].slice(-1) === 's') {

		const suit = suits[bid.suitIndex];

		return `${bid.level} ${suit.slice(0, suit.length - 1)}`

	} else {
		return `${bid.level} ${suits[bid.suitIndex]}`
	}
}
