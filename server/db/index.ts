import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import chalk from 'chalk';
import logger from './../logger';

import './models';

const startDb = async function(): Promise<void> {

	try {

		await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
		logger.info(chalk.blue('MongoDB connection opened!'));

	} catch (error) {

		logger.error('Error in server/db/index.ts');
		throw error;

	}

}

export default startDb;

