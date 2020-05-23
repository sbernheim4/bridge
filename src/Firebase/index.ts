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

const db = firebase.database();
const ref = db.ref();

function connectToGame(sessionId: string): void {
	firebase.database().ref(sessionId).set({
		numPlayers: 1
	})
}

export function sendBid(bids: Bid[], sessionId: string): void {
	firebase.database().ref(`${sessionId}`).set({
		bids: bids
	});
}

export function receiveBid(sessionId: string) {
	return function (updatedBidsHandler: (a: firebase.database.DataSnapshot, b?: string | null | undefined) => any) {
		firebase.database().ref(sessionId).on('value', updatedBidsHandler);
	}

}
