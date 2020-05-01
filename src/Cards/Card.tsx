import React from "react";

import './card.scss';

interface ICard {
	value: string;
	suit: string;
}

export function Card (props: { card: ICard }) {

	const { value, suit } = props.card;

	let displayValue;
	switch (value) {
		case '11':
			displayValue = 'Jack';
			break;
		case '12':
			displayValue = 'Queen';
			break;
		case '13':
			displayValue = 'King';
			break;
		case '14':
			displayValue = 'Ace';
			break;
		default:
			displayValue = value;
			break;
	}

	return (
		<p className='card'>{suit}: {displayValue}</p>
	)

}
