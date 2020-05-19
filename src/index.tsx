/* Here we are binding React (and the client side routing via react-router-dom) to the HTML file to an
 * element with an ID of `root` and setting up
 */

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from 'react-router-dom'





// eslint-disable-next-line
// @ts-ignore
import { subtract, subtractFive } from './f-sharp/src/AppTwo.fs';
// eslint-disable-next-line
// @ts-ignore
import { determineTrickPoints } from './f-sharp/src/App.fs';


console.log(`10 - 5 is ${subtractFive(10)}`);
console.log(`20 - 3 is ${subtract(3, 20)}`);
console.log(`determine trick points with suit index of 2 and level of 4 is
    ${determineTrickPoints(2, 4)}
`);





import "./styles/reset.css";

/* App is the entry point to the React code.*/
import Routes from './Routes/index';

ReactDOM.render(
	<BrowserRouter basename="/">
		<Routes />
	</BrowserRouter>,
    document.getElementById("root")
);
