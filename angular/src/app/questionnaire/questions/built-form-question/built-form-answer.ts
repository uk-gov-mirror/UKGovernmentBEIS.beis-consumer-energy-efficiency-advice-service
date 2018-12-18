import {Epc} from "../../../shared/postcode-epc-service/model/epc";

export enum BuiltFormAnswer {
    Detached,
    SemiDetached,
    EndTerrace,
    MidTerrace,
    EnclosedEndTerrace,
    EnclosedMidTerrace
}

export function getBuiltFormDescription(builtForm: BuiltFormAnswer): string {
    switch (builtForm) {
        case BuiltFormAnswer.Detached:               { return 'detached'; }
        case BuiltFormAnswer.SemiDetached:           { return 'semi-detached'; }
        case BuiltFormAnswer.EndTerrace:             { return 'end-terrace'; }
        case BuiltFormAnswer.MidTerrace:             { return 'mid-terrace'; }
        case BuiltFormAnswer.EnclosedEndTerrace:     { return 'enclosed end-terrace'; }
        case BuiltFormAnswer.EnclosedMidTerrace:     { return 'enclosed mid-terrace'; }
        default:                                    { return null; }
    }
}

export function getBuiltFormFromEpc(epc: Epc): BuiltFormAnswer {
    if (epc.propertyType === 'house' || epc.propertyType === 'bungalow') {
        if (epc.builtForm === 'detached') {
            return BuiltFormAnswer.Detached;
        } else if (epc.builtForm === 'semi-detached') {
            return BuiltFormAnswer.SemiDetached;
        }
    }

    return undefined;
}
