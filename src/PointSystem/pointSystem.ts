import {
    Bid
} from '../BiddingSystem/types/biddingTypes'

import {
    OverLine,
    UnderLine
} from './pointSystem.d'

function determineTrickPoints(contract: Bid): UnderLine {

    const isNoTrump = contract.suitIndex === 0;
    const isMajor = contract.suitIndex === 1 || contract.suitIndex === 2;

    if (isNoTrump) {
        return { points: 40 + (contract.level - 1) * 30 };
    } else if (isMajor) {
        return { points: contract.level * 30 };
    } else {
        return { points: contract.level * 20 };
    }

}

function determineBounsPoints(trickCount: number, contract: Bid, isPenaltyDoubled: boolean): OverLine {

    function determineSlamBonus(level: number): 0 | 500 | 1000 {
        switch (level) {
            case 6:
                return 500;
            case 7:
                return 1000;
            default:
                return 0;
        }
    }

    const doubleMultiplier = isPenaltyDoubled ? 2 : 1;
    const suitMultiplier = contract.suitIndex <= 2 ? 30 : 20;
    const slamBonus = determineSlamBonus(contract.level);
    const overTricks = trickCount - contract.level;

    return { points: (suitMultiplier * overTricks * doubleMultiplier) + slamBonus };

}

function determineNegativePoints(trickCount: number, contractLevel: number, isPenaltyDoubled: boolean): OverLine {
    const underTrickValue = 50
    const multiplier = isPenaltyDoubled ? 2 : 1;

    return { points: -1 * (contractLevel - trickCount) * underTrickValue * multiplier };
}

export function checkContractMade(trickCount: number, contract: Bid, isPenaltyDoubled: boolean): { aboveTheLine: OverLine; belowTheLine: UnderLine } {

    if (trickCount >= contract.level) {

        const overTricks = determineBounsPoints(trickCount, contract, isPenaltyDoubled);
        const underTricks = determineTrickPoints(contract);

        return {
            aboveTheLine: overTricks,
            belowTheLine: underTricks
        };

    } else {

        const overTricks = determineNegativePoints(trickCount, contract.level, isPenaltyDoubled);

        return {
            aboveTheLine: overTricks,
            belowTheLine: { points: 0 } as UnderLine
        };

    }
}

