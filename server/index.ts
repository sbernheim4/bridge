/* eslint no-undefined: "off" */

import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import chalk from 'chalk';

import startDb from './db';
import logger from './logger';


const app = express();

const PORT = process.env.PORT;

/****************** Sessions ******************/
const sessionInfo = session({
	secret: 'JDKLSJDKL*(@#SJKJK#@ULSFJDOIP(*J@KJKDLFJAL)',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 600000 },
});

if (process.env.DB_URI) {

	// Connect to the DB
	mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

	// Use mongo for session store
	const sessionStore = MongoStore(session)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	sessionInfo['store'] = new sessionStore({ mongooseConnection: mongoose.connection });
}

app.use(sessionInfo);


/****************** Server Options ******************/
const cacheTime = 172800000; // 2 Days in ms - Tells clients to cache static files

app.use(helmet()); // Sets some good default headers
app.use(compression()); // Enables gzip compression
app.use(bodyParser.json()) // Lets express handle JSON encoded data sent on the body of requests
app.use(bodyParser.urlencoded({ extended: true }));


/****************** Serve Static Files --> JS, CSS, IMAGES ETC ******************/
app.use(express.static(path.resolve('public'), { maxAge: cacheTime } ));


/****************** Log Requests ******************/
app.use('*', (req: Request, _res: Response, next: NextFunction) => {

	const { method, path, query, body } = req;

	const requestStr = `\nREQUEST ${JSON.stringify(method)} ${path}\n`
	const queryStr = `QUERY ${JSON.stringify(query)}\n`
	const bodyStr = `BODY: ${JSON.stringify(body)}\n`

	logger.log({
		level: 'info',
		message: chalk.red(requestStr) + chalk.yellow(queryStr) + chalk.cyan(bodyStr)
	});

	next();
});


/****************** Route Handling ******************/
// Use api.js for any and all requests made to /api
import apiRouter from './api';
app.use('/api', apiRouter);

app.use('/*', (_req: Request, res: Response) => {
	res.sendFile(path.resolve("./public/index.html"));
});

// Return a 404 page for all other requests - This should be the last get/put/post/delete/all/use call for app
app.use("*", (_req: Request, res: Response) => {
	res.status(404).send(`<h1>404 Page Not Found</h1>`);
});

/****************** Start the Server and DB (if DB_URI env var is set) ******************/

function startServer(): void {
	app.listen(PORT, () => {
		console.log(chalk.blue(`App is live on ${process.env.DEV_BASE_URL}`));
	});
}

if (process.env.DB_URI && process.env.DB_URI !== '') {

	startDb().then(() => {

		startServer();

	}).catch(err => {

		console.log(err)

	});

} else {

	console.log(chalk.red(`
		Process.env.DB_URI is undefined (this should be set in your .env file).
		Skipping opening connection to DB.
		Sessions are being stored in memory`
	));

	startServer();
}
