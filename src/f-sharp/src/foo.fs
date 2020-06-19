module BidTracker

type Bid = {
    suitIndex: int;
    level: int
}

let someFun suit lvl =
  let result = {
    suitIndex = suit;
    level = lvl
  }

  result

let getAllBids =
    let mutable bids = [{ suitIndex = 100; level = 100 }; { suitIndex = 99; level = 99 }]

    for levelIndex = 0 to 4 do
        for suit = 1 to 7 do
            let newBid = [{ level = levelIndex; suitIndex = suit }]
            bids <- List.append bids newBid

    bids

let result = getAllBids
printfn "%A" getAllBid
