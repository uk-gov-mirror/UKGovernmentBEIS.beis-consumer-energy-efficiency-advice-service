export enum HouseExposedWall {
    OneSideExposed = 1,
    TwoSidesExposed = 2,
    ThreeSidesExposed = 3
}

export function getHouseSharedWallDescription(houseExposedWall: HouseExposedWall): string {
    switch (houseExposedWall) {
        case HouseExposedWall.OneSideExposed:           { return '3 Sides'; }
        case HouseExposedWall.TwoSidesExposed:          { return '2 Sides'; }
        case HouseExposedWall.ThreeSidesExposed:        { return '1 Side'; }
        default:                                        { return null; }
    }
}
