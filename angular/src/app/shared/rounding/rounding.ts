export function roundToNearest(input: number, roundingValue: number) {
    return Math.round(input / roundingValue) * roundingValue;
}