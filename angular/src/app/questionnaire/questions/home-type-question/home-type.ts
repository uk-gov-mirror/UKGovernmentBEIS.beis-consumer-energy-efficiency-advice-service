export enum HomeType {
    DetachedHouse,
    SemiDetachedHouse,
    EndTerraceHouse,
    MidTerraceHouse,
    GroundFloorFlat,
    MidFloorFlat,
    TopFloorFlat,
    BungalowDetached,
    BungalowAttached,
    ParkHome,
}

export function isFlat(homeType: HomeType): boolean {
    return homeType === HomeType.GroundFloorFlat ||
           homeType === HomeType.MidFloorFlat ||
           homeType === HomeType.TopFloorFlat;
}