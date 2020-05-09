import React, { Component } from "react";

class ErrorPage extends Component {
	constructor(props: {}) {
		super(props);

		this.state = {

		};
	}

	render(): JSX.Element {
		return (
			<div className="home">
				<h1>Uh oh, that is a 404</h1>
				<h1>We were not able to find that page for you</h1>
			</div>
		);
	}
}

export default ErrorPage;
