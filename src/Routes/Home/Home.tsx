import React, { Component } from "react";

import { HandRenderer } from './../../Cards/HandRenderer';

import './home.css';

class Home extends Component {
	constructor(props: Readonly<{}>) {
		super(props);

		this.state = {

		};
	}

	render() {
		return (
			<div className="home">
				<HandRenderer />
			</div>
		);
	}
}

export default Home;
