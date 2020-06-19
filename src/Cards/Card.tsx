import React from 'react';

import { CardElementProps } from './types';

import './scss/card.scss';

export function CardElement (props: CardElementProps) {

	function getDisplayValue(value: string) {
		switch (value) {
			case '11':
				return 'J';
			case '12':
				return 'Q';
			case '13':
				return 'K';
			case '14':
				return 'A';
			default:
				return value;
		}
	}

	function playCard() {
		console.log(props.card);
	}

	const { value } = props.card;

	return (
		<p onClick={playCard} className='card'>{getDisplayValue(value)}</p>
	)

}
