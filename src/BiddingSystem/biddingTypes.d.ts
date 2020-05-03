export type Bid = {
	suitIndex: number;
	level: number;
	previousSuitIndex?: number;
	previousLevel?: number;
}

export type DisplayBid = {
	suit: string;
	level: number;
}
