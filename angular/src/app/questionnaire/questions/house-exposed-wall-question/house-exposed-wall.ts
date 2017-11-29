export enum HouseExposedWall {
    OneSideExposed,
    TwoSidesExposed,
    ThreeSidesExposed
}

export function getNumberOfExposedWallsInHouse(houseExposedWall: HouseExposedWall): number {
    switch (houseExposedWall) {
        case HouseExposedWall.OneSideExposed:            { return 1; }
        case HouseExposedWall.TwoSidesExposed:           { return 2; }
        case HouseExposedWall.ThreeSidesExposed:         { return 3; }
    }
}