import {
	Bid
} from './biddingTypes'


export function getDisplayableBid(bid: Bid) {

	const suits = ['No Trump', 'Spades', 'Hearts', 'Diamonds', 'Clubs'];

	if (bid.level === 99) {
		return 'Double';
	} else if (bid.level === 100) {
		return 'Pass';
	}

	return `${bid.level} ${suits[bid.suitIndex]}`
}
