import React from "react";

import { HandRenderer } from './../../Cards/HandRenderer';

import './home.scss';

import { Link } from "react-router-dom";

 function Home(_props: any) {

	 const link = '/play?id=' + uuidv4();

	 return (
		 <div className="home">

		 	<Link to={link}>Start Playing</Link>

		 </div>
	 );
 }

export default Home;
