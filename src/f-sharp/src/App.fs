module App

let add x y = x + y
let addTwo = add 2

type Bid = {
    suitIndex: int;
    level: int
}

let determineTrickPoints bid =
