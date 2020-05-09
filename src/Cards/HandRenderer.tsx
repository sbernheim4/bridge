import React from 'react';

import { Card } from './card';
import { CardContainer } from './CardContainer';

export function HandRenderer(): JSX.Element {

	function generateDeckOfCards(): Card[] {
		const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
		const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
		const deckOfCards: Card[] = [];

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

	function generateHand(deckOfCards: Card[], hands: Card[][] = [], baseCondition = 4): Card[][] {

		if (baseCondition === 0) {
			return hands;
		}

		const hand = [];

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

	function generateAllHands(): Card[][] {

		const deckOfCards = generateDeckOfCards();
		const hands = generateHand(deckOfCards);

		return hands;

	}

	const hands: Card[][] = generateAllHands();

	return (
		<div>
			{hands.map((hand, index) => <CardContainer key={index} cards={hand}/>)}
		</div>
	)

}
