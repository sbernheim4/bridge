import React from "react";

import { Link } from "react-router-dom";

import './home.scss';

function Home(props: { id: string }): JSX.Element {

	const link = '/bid?id=' + props.id;

	return (
		<div className="home">

			<Link to={link}>Start Playing</Link>

		</div>
	);
}

export default Home;
