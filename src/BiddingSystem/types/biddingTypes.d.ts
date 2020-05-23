export type Bid = {
	suitIndex: number;
	level: number;
}

export type DisplayBid = {
	suit: string;
	level: number;
}

export type NullableBid = Bid | null;

export type BidViewProps = {
	placeNewBid: (bid: Bid) => boolean;
	bid: Bid;
}

export type BiddingSystemProps = {
	currentBid: NullableBid;
	previousBids: Bid[];
	sessionId: string;
}

export type AvailableBidsProps = {
	validBids: Bid[];
	placeNewBid(bid: Bid): boolean;
}

export type BiddingHistoryProps = {
    positions: string[];
    previousBids: Bid[];
}
