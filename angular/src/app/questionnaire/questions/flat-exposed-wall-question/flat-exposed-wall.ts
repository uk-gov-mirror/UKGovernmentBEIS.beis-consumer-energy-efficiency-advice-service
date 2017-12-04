export enum FlatExposedWall {
    OneSideExposedInset,
    TwoSidesExposedCorner,
    TwoSidesExposedThroughBuilding,
    ThreeSidesExposedWholeSide,
    FourSidesExposedWholeFloor
}

export function getFlatExposedWallDescription(flatExposedWall: FlatExposedWall): string {
    switch (flatExposedWall) {
        case FlatExposedWall.OneSideExposedInset:             { return '1 Side Exposed (Inset)'; }
        case FlatExposedWall.TwoSidesExposedCorner:           { return '2 Sides Exposed (In a corner)'; }
        case FlatExposedWall.TwoSidesExposedThroughBuilding:  { return '2 Sides Exposed (Through building)'; }
        case FlatExposedWall.ThreeSidesExposedWholeSide:      { return '3 Sides Exposed (Whole side)'; }
        case FlatExposedWall.FourSidesExposedWholeFloor:      { return '4 Sides Exposed (Whole floor)'; }
        default:                                              { return null; }
    }
}

export function getNumberOfExposedWallsInFlat(flatExposedWall: FlatExposedWall): number {
    switch (flatExposedWall) {
        case FlatExposedWall.OneSideExposedInset:            { return 1; }
        case FlatExposedWall.TwoSidesExposedCorner:          { return 2; }
        case FlatExposedWall.TwoSidesExposedThroughBuilding: { return 2; }
        case FlatExposedWall.ThreeSidesExposedWholeSide:     { return 3; }
        case FlatExposedWall.FourSidesExposedWholeFloor:     { return 4; }
    }
}