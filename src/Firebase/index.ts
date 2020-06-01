import firebase from "firebase/app";
import dotenv from 'dotenv';

dotenv.config();

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

// This function should really just appennd a single bid to the bids array rather than replace the whole array.
// Bids are monoids.
export function sendBid(bids: Bid[], sessionId: string) {
	firebase.database().ref(`${sessionId}`).set({
		bids: bids
	});
}

export function receiveBid(sessionId: string) {
	return function (updatedBidsHandler: (a: firebase.database.DataSnapshot, b?: string | null | undefined) => void) {
		firebase.database().ref(sessionId).on('value', updatedBidsHandler);
	}

}
