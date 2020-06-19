import React, { useEffect } from 'react';
import { GamePlayProps } from './gameTypes';

export function GamePlay(props: GamePlayProps) {

	useEffect(() => {

		console.log(props.sessionId);

	}, [])

	return <h1> Hello World from the game play component </h1>
}
