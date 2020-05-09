import React from "react";
import { v4 as uuidv4 } from 'uuid';

import { Link } from "react-router-dom";

import './home.scss';

function Home(): JSX.Element {

	const link = '/play?id=' + uuidv4();

	return (
		<div className="home">

			<Link to={link}>Start Playing</Link>

		</div>
	);
}

export default Home;
