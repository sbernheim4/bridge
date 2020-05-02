export type Bid = {
	suitIndex: number;
	level: number | { previousLevel: number}
}

export type DisplayBid = {
	suit: string;
	level: number | { previousLevel: number };
}
