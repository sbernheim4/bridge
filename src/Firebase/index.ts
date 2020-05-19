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

const db = firebase.database();
const ref = db.ref();

async function handleUpdates() {
	ref.on("value",
		(snapshot) => { console.log(snapshot.val()); },
		(errorObject: { code: number }) => { console.log("The read failed: " + errorObject.code); }
	);
}

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

export function receiveBid() {

	return true;

}
