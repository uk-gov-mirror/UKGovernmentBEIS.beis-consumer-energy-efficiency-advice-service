import {Epc} from '../../../shared/postcode-epc-service/model/epc';


export enum HomeType {
    House,
    Bungalow,
    FlatDuplexOrMaisonette,
    ParkHomeOrMobileHome
}

export function isHouseOrBungalow(homeType: HomeType): boolean {
    return homeType === HomeType.House || homeType === HomeType.Bungalow;
}

export function getHomeTypeDescription(homeType: HomeType): string {
    switch (homeType) {
        case HomeType.House:                        { return 'house'; }
        case HomeType.Bungalow:                     { return 'bungalow'; }
        case HomeType.FlatDuplexOrMaisonette:       { return 'flat, duplex or maisonette'; }
        case HomeType.ParkHomeOrMobileHome:         { return 'park-home or mobile home'; }
        default:                                    { return null; }
    }
}

export function getHomeTypeFromEpc(epc: Epc): HomeType {
    switch (epc.propertyType) {
        case 'flat':
        case 'maisonette': {
            return HomeType.FlatDuplexOrMaisonette;
        }
        case 'house': {
            return HomeType.House;
        }
        case 'bungalow': {
            return HomeType.Bungalow;
        }
        case 'park-home': {
            return HomeType.ParkHomeOrMobileHome;
        }
        default: {
            return undefined;
        }
    }
}
