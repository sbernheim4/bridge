import React from 'react';

import { HandContainer } from './HandContainer';
import { generateAllHands } from './utils';

export function HandRenderer() {

	const allHands = generateAllHands();

	return (
		<div>
			{
				allHands.map((hand, index) => <HandContainer key={index} cards={hand}/>)
			}
		</div>
	)

}
