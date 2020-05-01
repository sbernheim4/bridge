import React from 'react';

import { Card } from './Card.tsx';

import './cardContainer.scss';

interface ICard {
	value: string;
	suit: string;
}

export default function CardContainer(props: { cards: ICard[] }) {
	const { cards } = props;

	function sortCards(cardOne: ICard, cardTwo: ICard) {
		// Same suit, sort by value
		if (cardOne.suit === cardTwo.suit) {
			return parseInt(cardTwo.value) - parseInt(cardOne.value);
		}

		// Different suits, sort by rank
		if (cardTwo.suit === 'Spades') {
			return 1;
		} else if (cardTwo.suit === 'Hearts' && cardOne.suit !== 'Spades') {
			return 1;
		} else if (cardTwo.suit === 'Diamonds' && cardOne.suit !=='Spades' && cardOne.suit !== 'Hearts') {
			return 1;
		} else {
			return -1;
		}
	}

	const sortedCards = cards.sort(sortCards);

	const highCardPoints = sortedCards.reduce((acc, card) => {
		const number = parseInt(card.value);
		if (number > 10) {
			return  acc += number - 10;
		} else {
			return acc;
		}
	}, 0)

	return (
		<div className='card-container'>
		<p>You have {highCardPoints} HCP</p>
		{sortedCards.map((card, index) => <Card key={index} card={card} />)}
		</div>
	)

}
