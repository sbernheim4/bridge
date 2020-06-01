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
    let pass = { suitIndex = 100; level = 100 }
    let double = { suitIndex = 99; level = 99 }

    let suits = [0 .. 4]
    let levels = [1 .. 7]

    let allSuitedBids = List.reduce2 someFun suits levels
    // let allBids = allSuitedBids + double + pass
    allSuitedBids


let result = getAllBids

printfn "%A" getAllBids
