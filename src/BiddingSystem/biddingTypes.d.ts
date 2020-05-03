export type Bid = {
	suitIndex: number;
	level: number;
}

export type DisplayBid = {
	suit: string;
	level: number;
}

export interface BidViewProps {
	placeNewBid: (bid: Bid) => boolean;
	bid: Bid;
}

