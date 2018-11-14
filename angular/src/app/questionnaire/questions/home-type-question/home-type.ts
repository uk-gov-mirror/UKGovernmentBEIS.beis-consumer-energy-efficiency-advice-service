import {Epc} from '../../../shared/postcode-epc-service/model/epc';
import includes from 'lodash-es/includes';

export enum HomeType {
    DetachedHouse,
    SemiDetachedOrTerracedHouse,
    DetachedBungalow,
    SemiDetachedBungalow,
    FlatDuplexOrMaisonette,
    ParkHomeOrMobileHome
}

export function isDetached(homeType: HomeType): boolean {
    return homeType === HomeType.DetachedHouse ||
        homeType === HomeType.DetachedBungalow ||
        homeType === HomeType.ParkHomeOrMobileHome;
}

export function getHomeTypeDescription(homeType: HomeType): string {
    switch (homeType) {
        case HomeType.DetachedHouse:                { return 'detached house'; }
        case HomeType.SemiDetachedOrTerracedHouse:  { return 'semi-detached or terraced house'; }
        case HomeType.DetachedBungalow:             { return 'detached bungalow'; }
        case HomeType.SemiDetachedBungalow:         { return 'semi-detached bungalow'; }
        case HomeType.FlatDuplexOrMaisonette:       { return 'flat, duplex or maisonette'; }
        case HomeType.ParkHomeOrMobileHome:         { return 'park-home or mobile home'; }
        default:                                    { return null; }
    }
}

export function getHomeTypeFromEpc(epc: Epc): HomeType {
    // TODO:BEISDEAS-230 As with the TODO in rdsap-input.ts, there is not a complete mapping from propertyType / builtForm <=> HomeType.
    // We may need to update our questions to improve this.
    switch (epc.propertyType) {
        case 'flat':
        case 'maisonette': {
            return HomeType.FlatDuplexOrMaisonette;
        }
        case 'house': {
            if (epc.builtForm === 'detached') {
                return HomeType.DetachedHouse;
            } else if (epc.builtForm === 'semi-detached' || includes(epc.builtForm, 'terrace')) {
                return HomeType.SemiDetachedOrTerracedHouse;
            }
            return undefined;
        }
        case 'bungalow': {
            if (epc.builtForm === 'detached') {
                return HomeType.DetachedBungalow;
            } else if (epc.builtForm === 'semi-detached') {
                return HomeType.SemiDetachedBungalow;
            }
            return undefined;
        }
        case 'park-home': {
            return HomeType.ParkHomeOrMobileHome;
        }
        default: {
            return undefined;
        }
    }
}
