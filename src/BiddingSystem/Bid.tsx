import React, { MouseEvent } from 'React'

import {
	DisplayBid
} from './biddingTypes.d'

import './bid.scss';

interface foo {
    placeNewBid: (newSuit: string, newLevel: number) => void;
    bid: DisplayBid;
}

export function BidView(props: foo) {

    function handleClick() {
        console.log('clicked on', props.bid.level, props.bid.suit);

        // let level: number;
        // if (typeof props.bid.level === 'number') {
        //     level = props.bid.level;
        // } else {
        //     level = 0;
        // }

        // props.placeNewBid(props.bid.suit, level);
    }

	return (
		<div className='bid'>
			<p className='bid__info' onClick={handleClick}>- {props.bid.level} {props.bid.suit}</p>
		</div>
	)

}
