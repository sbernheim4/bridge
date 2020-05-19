module App

type contractMade = {
    aboveTheLine: int;
    belowTheLine: int
}

let determineTrickPoints suitIndex level =
    let isNoTrump = suitIndex = 0
    let isMajor = suitIndex = 2 || suitIndex = 1

    if isNoTrump then 40 + (level - 1) * 30
    elif isMajor then level * 30
    else level * 20

let determineBounsPoints trickCount suitIndex level isPenaltyDoubled =
    let determineSlamBonus level =
        if level = 6 then 500
        elif level = 7 then 1000
        else 0

    let doubleMultiplier = if isPenaltyDoubled then 2 else 1
    let suitMultiplier = if suitIndex <= 2 then 30 else 20
    let slamBonus = determineSlamBonus level
    let overTricks = trickCount - level
    ((suitMultiplier * overTricks * doubleMultiplier) + slamBonus);

let determineNegativePoints trickCount contractLevel isPenaltyDoubled =
    let underTrickValue = 50
    let multiplier = if isPenaltyDoubled then 2 else 1
    (-1 * (contractLevel - trickCount) * 50 * multiplier)

let checkContractMade trickCount suitIndex level isPenaltyDoubled =
    if trickCount >= level then
        let overTricks = determineBounsPoints trickCount suitIndex level isPenaltyDoubled
        let underTricks = determineTrickPoints suitIndex level

        {
            aboveTheLine=overTricks;
            belowTheLine=underTricks
        }
    else
        let overTricks = determineNegativePoints trickCount level isPenaltyDoubled

        {
            aboveTheLine=overTricks
            belowTheLine=0
        }
