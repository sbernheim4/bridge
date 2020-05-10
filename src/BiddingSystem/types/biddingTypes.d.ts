export type Bid = {
	suitIndex: number;
	level: number;
}

export type DisplayBid = {
	suit: string;
	level: number;
}

export type NullableBid = Bid | null;

export interface BidViewProps {
	placeNewBid: (bid: Bid) => boolean;
	bid: Bid;
}

export interface BiddingSystemProps {
	currentBid: NullableBid;
	previousBids: Bid[];
	sessionId: string;
}

export interface AvailableBidsProps {
	validBids: Bid[];
	placeNewBid(bid: Bid): boolean;
}

export interface BidViewProps {
	placeNewBid: (bid: Bid) => boolean;
	bid: Bid;
}

export interface BiddingHistoryProps {
    positions: string[];
    previousBids: Bid[];
}