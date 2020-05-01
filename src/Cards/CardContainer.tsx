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

	const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];

	const bar: ICard[][]= [];

	suits.forEach(suit => {
		const initialValue: ICard[] = [];
		const foo = sortedCards.reduce((acc, curr) => {
			if (curr.suit === suit) {
				return [...acc, curr]
			} else {
				return acc;
			}
		}, initialValue);

		bar.push(foo);

	});

	return (
		<div className='card-container'>
			<h4>You have <span>{highCardPoints}</span> HCP</h4>
			<div className='card-container__hand'>
			<div className='card-container__hand__suit'><span className='spades'>♠️ </span> {bar[0].map((card, index) => <Card key={index} card={card} />)}</div>
			<div className='card-container__hand__suit'><span className='hearts'>♥️ </span> {bar[1].map((card, index) => <Card key={index} card={card} />)}</div>
			<div className='card-container__hand__suit'><span className='diamonds'>♦️ </span> {bar[2].map((card, index) => <Card key={index} card={card} />)}</div>
			<div className='card-container__hand__suit'><span className='clubs'>♣️ </span> {bar[3].map((card, index) => <Card key={index} card={card} />)}</div>
			</div>
		</div>
	)

}
