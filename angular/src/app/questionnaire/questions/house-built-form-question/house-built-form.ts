import {Epc} from "../../../shared/postcode-epc-service/model/epc";

export enum HouseBuiltForm {
    Detached,
    SemiDetached,
    EndTerrace,
    MidTerrace,
    EnclosedEndTerrace,
    EnclosedMidTerrace
}

export function getHouseBuiltFormDescription(houseBuiltForm: HouseBuiltForm): string {
    switch (houseBuiltForm) {
        case HouseBuiltForm.Detached:               { return 'detached'; }
        case HouseBuiltForm.SemiDetached:           { return 'semi-detached'; }
        case HouseBuiltForm.EndTerrace:             { return 'end-terrace'; }
        case HouseBuiltForm.MidTerrace:             { return 'mid-terrace'; }
        case HouseBuiltForm.EnclosedEndTerrace:     { return 'enclosed end-terrace'; }
        case HouseBuiltForm.EnclosedMidTerrace:     { return 'enclosed mid-terrace'; }
        default:                                    { return null; }
    }
}

export function getHouseBuiltFormFromEpc(epc: Epc): HouseBuiltForm {
    if (epc.propertyType === 'house' || epc.propertyType === 'bungalow') {
        if (epc.builtForm === 'detached') {
            return HouseBuiltForm.Detached;
        } else if (epc.builtForm === 'semi-detached') {
            return HouseBuiltForm.SemiDetached;
        }
    }

    return undefined;
}
