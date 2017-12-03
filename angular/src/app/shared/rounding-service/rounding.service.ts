export abstract class RoundingService {

    private static readonly POUNDS_ROUNDING = 5;

    static roundCostValue(input: number): number {
        const roundingValue = input > RoundingService.POUNDS_ROUNDING ?
            RoundingService.POUNDS_ROUNDING :
            1;
        return Math.round(input/roundingValue) * roundingValue;
    }
}