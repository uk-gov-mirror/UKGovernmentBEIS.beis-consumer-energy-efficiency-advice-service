export enum FlatExposedWall {
    OneSideExposedInset,
    TwoSidesExposedCorner,
    TwoSidesExposedThroughBuilding,
    ThreeSidesExposedWholeSide,
    FourSidesExposedWholeFloor
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