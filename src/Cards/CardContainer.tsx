import React from 'react';

import { CardElement } from './Card';
import { Card } from './card';

import './scss/cardContainer.scss';

export function CardContainer(props: { cards: Card[] }): JSX.Element {
	const { cards } = props;

	function sortCards(cardOne: Card, cardTwo: Card): number {
		// Same suit, sort by value
		if (cardOne.suit === cardTwo.suit) {
			return parseInt(cardTwo.value) - parseInt(cardOne.value);
		}

		// Different suits, sort by rank
		if (cardTwo.suit === 'Spades') {
			return 1;
		} else if (cardTwo.suit === 'Hearts' && cardOne.suit !== 'Spades') {
			return 1;
		} else if (cardTwo.suit === 'Diamonds' && cardOne.suit !== 'Spades' && cardOne.suit !== 'Hearts') {
			return 1;
		} else {
			return -1;
		}
	}

	const sortedCards = cards.sort(sortCards);

	const highCardPoints = sortedCards.reduce((acc, card) => {
		const number = parseInt(card.value);
		if (number > 10) {
			return acc += number - 10;
		} else {
			return acc;
		}
	}, 0)

	const suits = [
		{ suit: 'Spades', symbol: '♠️ ' },
		{ suit: 'Hearts', symbol: '♥️ ' },
		{ suit: 'Diamonds', symbol: '♦️ ' },
		{ suit: 'Clubs', symbol: '♣️' },
	];

	const cardsSplitBySuit: Card[][] = [];

	suits.forEach(val => {

		const currentSuit: Card[] = [];

		const foo = sortedCards.reduce((acc, curr) => {
			if (curr.suit === val.suit) {
				return [...acc, curr]
			} else {
				return acc;
			}
		}, currentSuit);

		cardsSplitBySuit.push(foo);

	});

	return (
		<div className='card-container'>
			<h4>You have <span>{highCardPoints}</span> HCP</h4>
			<div className='card-container__hand'>
				{cardsSplitBySuit.map((subCards, index) => {
					return (
						<div key={index} className='card-container__hand__suit'>
							<span className={suits[index].suit.toLowerCase()}>
								{suits[index].symbol}
							</span>
							{subCards.map((card, index) => <CardElement key={index} card={card} />)}
						</div>
					)
				})}
			</div>
		</div>
	)

}
