import { receiveBid } from './../Firebase/';
import { Bid } from './types/biddingTypes'

export function updateBidsFromServer(
	sessionId: string,
	updateBids: (newBids: Bid[]) => void)
{

	const bidReceiver = receiveBid(sessionId);

	bidReceiver(childSnapshot => {

		const updatedBids = childSnapshot.val().bids;

		updateBids(updatedBids);

	});

}
