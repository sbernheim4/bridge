import React, { Component } from "react";

import { BiddingSystem } from './../../BiddingSystem/BiddingSystem';
import { Bid } from './../../BiddingSystem/biddingTypes.d'

class Subpage extends Component {
	constructor(props: {}) {
		super(props);
	}

	render() {
		const currentBid: Bid = {
			suitIndex: 2,
			level: 2
		}
		return (
			<div className="subpage">
				<BiddingSystem numberOfPasses={0} currentBid={currentBid}/>
			</div>
		);
	}
}

export default Subpage;
