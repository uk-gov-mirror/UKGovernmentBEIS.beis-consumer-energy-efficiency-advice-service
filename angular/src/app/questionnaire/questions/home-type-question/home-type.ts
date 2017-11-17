import {Epc} from "../../../shared/epc-api-service/model/epc";
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
    ParkHome
}

export function isFlat(homeType: HomeType): boolean {
    return homeType === HomeType.GroundFloorFlat ||
        homeType === HomeType.MidFloorFlat ||
        homeType === HomeType.TopFloorFlat;
}

export function isBungalow(homeType: HomeType): boolean {
    return homeType === HomeType.BungalowDetached ||
        homeType === HomeType.BungalowAttached;
}

export function isParkHome(homeType: HomeType): boolean {
    return homeType === HomeType.ParkHome;
}

export function getHomeTypeDescription(homeType: HomeType): string {
    switch(homeType) {
        case HomeType.DetachedHouse:        { return 'detached house'; }
        case HomeType.SemiDetachedHouse:    { return 'semi-detached house'; }
        case HomeType.EndTerraceHouse:      { return 'end-terrace house'; }
        case HomeType.MidTerraceHouse:      { return 'mid-terrace house'; }
        case HomeType.GroundFloorFlat:      { return 'ground floor flat'; }
        case HomeType.MidFloorFlat:         { return 'mid floor flat'; }
        case HomeType.TopFloorFlat:         { return 'top floor flat'; }
        case HomeType.BungalowDetached:     { return 'detached bungalow'; }
        case HomeType.BungalowAttached:     { return 'attached bungalow'; }
        case HomeType.ParkHome:             { return 'park home'; }
        default:                            { return null; }
    }
}

export function getHomeTypeFromEpc(epc: Epc): HomeType {
    // TODO: this is very fragile!
    if (epc.propertyType === 'flat') {
        if (epc.flatTopStorey) {
            return HomeType.TopFloorFlat;
        } else if (epc.floorLevel === 0) {
            return HomeType.GroundFloorFlat;
        } else {
            return HomeType.MidFloorFlat;
        }
    } else if (epc.propertyType === 'house') {
        if (epc.builtForm === 'detached') {
            return HomeType.DetachedHouse;
        } else if (epc.builtForm === 'semi-detached') {
            return HomeType.SemiDetachedHouse;
        } else if (epc.builtForm.includes('end-terrace')) {
            return HomeType.EndTerraceHouse;
        } else if (epc.builtForm.includes('mid-terrace')) {
            return HomeType.MidTerraceHouse;
        }
    } else {
        return null;
    }
}