import React, { useState, useEffect } from 'react';

import { BiddingHistory } from './BiddingHistory';
import { AvailableBids } from './AvailableBids';
import { updateBidsFromServer } from './BiddingHistoryUtils';
import { BiddingSystemProps } from './types/biddingTypes'
import { Card } from './../Cards/card.d';

import './scss/biddingSystem.scss';
import { request } from './../global-utils';
import { HandContainer } from './../Cards/HandContainer';

export function BiddingSystem(props: BiddingSystemProps) {

	const [recordedBids, setRecordedBids] = useState(props.previousBids || []);
	const [hand, setHand] = useState([] as Card[][]);

	useEffect(() => {
		// Connect to firebase DB and register event handlers
		updateBidsFromServer(props.sessionId, setRecordedBids);
	}, [props.sessionId])

	useEffect(() => {

		async function getHands() {
			const payload = {
				sessionId: props.sessionId
			};
			const url = '/api/getHand'

			const fetchRequest = {
				method: '',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
				body: JSON.stringify(payload)
			};

			const res = await request<Card[][]>(url, fetchRequest);

			setHand(res);
		}

		getHands();

	}, [props.sessionId])

	return (
		<div className='bidding-system'>
			<HandContainer
				cards={hand[0]}
			/>

			<BiddingHistory
				previousBids={recordedBids}
			/>

			<AvailableBids
				sessionId={props.sessionId}
				recordedBids={recordedBids}
			/>

		</div>
	);
}
