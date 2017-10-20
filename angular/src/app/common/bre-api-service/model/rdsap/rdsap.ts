import {PropertyType} from './property-type';
import {BuiltForm} from './built-form';
import {FlatLevel} from './flat-level';
import {HomeAge, HomeAgeUtil} from '../../../../questionnaire/questions/home-age-question/home-age';
import {FuelType} from '../../../../questionnaire/questions/fuel-type-question/fuel-type';
import {ResponseData} from '../../../../response-data/response-data';
import {HomeType} from '../../../../questionnaire/questions/home-type-question/home-type';
import {FlatPosition} from '../../../../questionnaire/questions/flat-position-question/flat-position';

export class RdSAP {
    property_type: PropertyType;
    built_form: BuiltForm;
    flat_level: FlatLevel;
    construction_date: string;
    floor_area: number;
    num_storeys: number;
    num_bedrooms: number;
    heating_fuel: string;

    constructor(responseData: ResponseData) {
        this.property_type = RdSAP.getPropertyType(responseData.homeType);
        this.built_form = RdSAP.getBuiltForm(responseData.homeType, responseData.flatPosition);
        this.flat_level = RdSAP.getFlatLevel(responseData.homeType);
        this.construction_date = RdSAP.getConstructionDateEncoding(responseData.homeAge);
        this.floor_area = undefined;
        this.num_storeys = responseData.numberOfStoreys;
        this.num_bedrooms = responseData.numberOfBedrooms;
        this.heating_fuel = RdSAP.getFuelTypeEncoding(responseData.fuelType);
    }

    private static getPropertyType(homeType: HomeType): PropertyType {
        switch(homeType) {
            case HomeType.DetachedHouse:         { return PropertyType.House; }
            case HomeType.SemiDetachedHouse:     { return PropertyType.House; }
            case HomeType.EndTerraceHouse:       { return PropertyType.House; }
            case HomeType.MidTerraceHouse:       { return PropertyType.House; }
            case HomeType.BasementFlat:          { return PropertyType.Flat; }
            case HomeType.GroundFloorFlat:       { return PropertyType.Flat; }
            case HomeType.MidFloorFlat:          { return PropertyType.Flat; }
            case HomeType.TopFloorFlat:          { return PropertyType.Flat; }
            case HomeType.DetachedBungalow:      { return PropertyType.Bungalow; }
            case HomeType.SemiDetachedBungalow:  { return PropertyType.Bungalow; }
            case HomeType.MidTerraceBungalow:    { return PropertyType.Bungalow; }
            case HomeType.EndTerraceBungalow:    { return PropertyType.Bungalow; }
            case HomeType.ParkHome:              { return PropertyType.ParkHome; }
            default:                             { return null; }
        }
    }

    private static getBuiltForm(homeType: HomeType, flatPosition: FlatPosition): BuiltForm {
        switch(homeType) {
            case HomeType.DetachedHouse:         { return BuiltForm.Detached; }
            case HomeType.SemiDetachedHouse:     { return BuiltForm.SemiDetached; }
            case HomeType.EndTerraceHouse:       { return RdSAP.getEndTerraceBuiltForm(flatPosition); }
            case HomeType.MidTerraceHouse:       { return RdSAP.getMidTerraceBuiltForm(flatPosition); }
            case HomeType.BasementFlat:          { return null; }
            case HomeType.GroundFloorFlat:       { return null; }
            case HomeType.MidFloorFlat:          { return null; }
            case HomeType.TopFloorFlat:          { return null; }
            case HomeType.DetachedBungalow:      { return BuiltForm.Detached; }
            case HomeType.SemiDetachedBungalow:  { return BuiltForm.SemiDetached; }
            case HomeType.MidTerraceBungalow:    { return RdSAP.getMidTerraceBuiltForm(flatPosition); }
            case HomeType.EndTerraceBungalow:    { return RdSAP.getEndTerraceBuiltForm(flatPosition); }
            case HomeType.ParkHome:              { return BuiltForm.Detached; }
            default:                             { return null; }
        }
    }

    private static getEndTerraceBuiltForm(flatPosition: FlatPosition): BuiltForm {
        switch(flatPosition) {
            case FlatPosition.OneSideExposed:    { return BuiltForm.EnclosedEndTerrace; }
            case FlatPosition.TwoSidesExposed:   { return BuiltForm.EnclosedEndTerrace; }
            default:                             { return BuiltForm.EndTerrace; }
        }
    }

    private static getMidTerraceBuiltForm(flatPosition: FlatPosition): BuiltForm {
        switch(flatPosition) {
            case FlatPosition.OneSideExposed:    { return BuiltForm.EnclosedMidTerrace; }
            default:                             { return BuiltForm.MidTerrace; }
        }
    }

    private static getFlatLevel(homeType: HomeType): FlatLevel {
        switch(homeType) {
            case HomeType.BasementFlat:     { return FlatLevel.Basement; }
            case HomeType.GroundFloorFlat:  { return FlatLevel.GroundFloor; }
            case HomeType.MidFloorFlat:     { return FlatLevel.MidFloor; }
            case HomeType.TopFloorFlat:     { return FlatLevel.TopFloor; }
        }
    }

    private static getConstructionDateEncoding(homeAge: HomeAge): string {
        const encodingCharacters = 'ABCDEFGHIJKL';
        return encodingCharacters.charAt(homeAge);
    }

    private static getFuelTypeEncoding(fuelType: FuelType): string {
        switch(fuelType) {
            case FuelType.SolidFuel:   { return '9'; }
            case FuelType.MainsGas:    { return '26'; }
            case FuelType.LPGGas:      { return '27'; }
            case FuelType.HeatingOil:  { return '28'; }
            case FuelType.Electricity: { return '29'; }
        }
    }
}