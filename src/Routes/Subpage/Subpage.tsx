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
			level: 1,
		}

		return (
			<div className="subpage">
				<BiddingSystem currentBid={null} previousBids={[]}/>
			</div>
		);
	}
}

export default Subpage;
