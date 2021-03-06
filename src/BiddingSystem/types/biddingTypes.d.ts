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
	recordedBids: Bid[];
	sessionId: string;
	bid: Bid;
}

export type BiddingSystemProps = {
	currentBid: NullableBid;
	previousBids: Bid[];
	sessionId: string;
}

export type AvailableBidsProps = {
    recordedBids: Bid[];
    sessionId: string;
}

export type BiddingHistoryProps = {
    previousBids: Bid[];
}
