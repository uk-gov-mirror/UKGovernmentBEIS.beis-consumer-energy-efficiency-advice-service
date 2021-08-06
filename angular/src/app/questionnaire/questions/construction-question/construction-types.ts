// The indices here are BRE constants; do not change them unless BRE have changed
export enum WallType {
    DoNotKnow = 0,
    CavityNoInsulation = 1,
    CavityInsulated = 2,
    SolidNoInsulation = 3,
    SolidInsulated = 4,
}

// The indices here are BRE constants; do not change them unless BRE have changed
export enum RoofType {
    DoNotKnow = 0,
    PitchedNoInsulation = 1,
    PitchedInsulated = 2,
    FlatNoInsulation = 3,
    FlatInsulated = 4,
}

// The indices here are BRE constants; do not change them unless BRE have changed
export enum FloorInsulation {
    DontKnow,
    SolidFloor,
    SuspendedFloor,
    None
};