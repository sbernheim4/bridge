import firebase from "firebase/app";
import dotenv from 'dotenv';

dotenv.config();

import "firebase/database";
import { Bid } from "../BiddingSystem/types/biddingTypes";

const config = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: process.env.databaseURL,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
	measurementId: process.env.measurementId,
};


firebase.initializeApp(config);

export function sendBid(bids: Bid[], sessionId: string): void {
	firebase.database().ref(`${sessionId}`).set({
		bids: bids
	});
}

