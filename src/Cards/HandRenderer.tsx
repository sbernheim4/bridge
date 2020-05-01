import React from 'react';

import { CardContainer } from './CardContainer';
import { ICard } from './card';

function HandRenderer() {

	function generateDeckOfCards() {
		const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
		const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
		let deckOfCards: ICard[] = [];

		for (const suit of suits) {
			for (const value of values) {
				deckOfCards.push(
					{
						value,
						suit,
					}
				);
			}
		}

		return deckOfCards;
	}

	function generateAllHands() {

		const deckOfCards = generateDeckOfCards();
		const hands = generateHand(deckOfCards);

		return hands;

	}

	// @ts-ignore
	function generateHand(deckOfCards: ICard[], hands: ICard[][] = [], baseCondition = 4) {

		if (baseCondition === 0) {
			return hands;
		}

		let hand = [];

		let remainingDeckOfCards = deckOfCards;

		for (let i = 0; i < 13; i++) {

			const currentIndex = Math.floor(Math.random() * remainingDeckOfCards.length);
			const currentCard = remainingDeckOfCards[currentIndex];

			hand.push(currentCard);

			remainingDeckOfCards = [
				...remainingDeckOfCards.slice(0, currentIndex),
				...remainingDeckOfCards.slice(currentIndex + 1)
			];
		}

		const updatedHands = [...hands, hand]
		const newBaseCondition = baseCondition - 1;

		return generateHand(remainingDeckOfCards, updatedHands, newBaseCondition);

	}

	const hands: ICard[][] = generateAllHands();

	return (
		<div>
			{hands.map((hand, index) => <CardContainer key={index} cards={hand}/>)}
		</div>
	)

}

export {
	HandRenderer
}
