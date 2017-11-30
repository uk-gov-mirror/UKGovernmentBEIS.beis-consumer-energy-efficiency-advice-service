export enum FloorLevel {
    Basement,
    Ground,
    MidFloor,
    TopFloor
}

export function getFloorLevelDescription(floorLevel: FloorLevel): string {
    switch(floorLevel) {
        case FloorLevel.Basement:           { return 'basement'; }
        case FloorLevel.Ground:             { return 'ground'; }
        case FloorLevel.MidFloor:           { return 'mid-floor'; }
        case FloorLevel.TopFloor:           { return 'top-floor'; }
        default:                            { return null; }
    }
}