import {PropertyType} from './property-type';
import {BuiltForm} from './built-form';
import {FlatLevel} from './flat-level';
import {HomeAge} from '../../../../questionnaire/questionnaires/home-basics/questions/home-age-question/home-age';
import {FuelType} from '../../../../questionnaire/questionnaires/home-basics/questions/fuel-type-question/fuel-type';
import {HomeType} from '../../../../questionnaire/questionnaires/home-basics/questions/home-type-question/home-type';
import {ResponseData} from '../../../response-data/response-data';

export class RdSapInput {
    property_type: PropertyType;
    built_form: BuiltForm;
    flat_level: FlatLevel;
    construction_date: string;
    floor_area: number;
    num_storeys: number;
    num_bedrooms: number;
    heating_fuel: string;

    constructor(responseData: ResponseData) {
        // TODO: This is not currently a full correct mapping to RdSAP. For a full mapping, the homeType question needs to be changed.
        // This is a 'best possible' mapping based on the current questions, to enable a PoC connection to the BRE API.
        // See BEISDEAS-28 for updating the questions to allow a correct mapping.
        this.property_type = RdSapInput.getPropertyType(responseData.homeType);
        this.built_form = RdSapInput.getBuiltForm(responseData.homeType);
        this.flat_level = RdSapInput.getFlatLevel(responseData.homeType);
        this.construction_date = RdSapInput.getConstructionDateEncoding(responseData.homeAge);
        this.floor_area = undefined;
        this.num_storeys = responseData.numberOfStoreys;
        this.num_bedrooms = responseData.numberOfBedrooms;
        this.heating_fuel = RdSapInput.getFuelTypeEncoding(responseData.fuelType);
    }

    private static getPropertyType(homeType: HomeType): PropertyType {
        switch(homeType) {
            case HomeType.DetachedHouse:         { return PropertyType.House; }
            case HomeType.SemiDetachedHouse:     { return PropertyType.House; }
            case HomeType.EndTerraceHouse:       { return PropertyType.House; }
            case HomeType.MidTerraceHouse:       { return PropertyType.House; }
            case HomeType.GroundFloorFlat:       { return PropertyType.Flat; }
            case HomeType.MidFloorFlat:          { return PropertyType.Flat; }
            case HomeType.TopFloorFlat:          { return PropertyType.Flat; }
            case HomeType.BungalowDetached:      { return PropertyType.Bungalow; }
            case HomeType.BungalowAttached:      { return PropertyType.Bungalow; }
            case HomeType.ParkHome:              { return PropertyType.ParkHome; }
            default:                             { return null; }
        }
    }

    private static getBuiltForm(homeType: HomeType): BuiltForm {
        switch(homeType) {
            case HomeType.DetachedHouse:         { return BuiltForm.Detached; }
            case HomeType.SemiDetachedHouse:     { return BuiltForm.SemiDetached; }
            case HomeType.EndTerraceHouse:       { return BuiltForm.EndTerrace }
            case HomeType.MidTerraceHouse:       { return BuiltForm.MidTerrace }
            case HomeType.GroundFloorFlat:       { return null; }
            case HomeType.MidFloorFlat:          { return null; }
            case HomeType.TopFloorFlat:          { return null; }
            case HomeType.BungalowDetached:      { return BuiltForm.Detached; }
            case HomeType.BungalowAttached:      { return BuiltForm.SemiDetached; }
            case HomeType.ParkHome:              { return BuiltForm.Detached; }
            default:                             { return null; }
        }
    }

    private static getFlatLevel(homeType: HomeType): FlatLevel {
        switch(homeType) {
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