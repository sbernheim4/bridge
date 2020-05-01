import React from "react";

import './card.scss';

interface ICard {
	value: string;
	suit: string;
}

export function Card (props: { card: ICard }) {

	const { value } = props.card;

	let displayValue;
	switch (value) {
		case '11':
			displayValue = 'J';
			break;
		case '12':
			displayValue = 'Q';
			break;
		case '13':
			displayValue = 'K';
			break;
		case '14':
			displayValue = 'A';
			break;
		default:
			displayValue = value;
			break;
	}

	return (
		<p className='card'>{displayValue}</p>
	)

}
