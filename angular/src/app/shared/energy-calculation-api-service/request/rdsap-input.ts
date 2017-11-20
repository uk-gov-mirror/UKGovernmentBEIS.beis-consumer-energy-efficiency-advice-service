import {PropertyType} from "./property-type";
import {BuiltForm} from "./built-form";
import {FlatLevel} from "./flat-level";
import {ResponseData} from "../../response-data/response-data";
import {HomeType} from "../../../questionnaire/questions/home-type-question/home-type";
import {HomeAge} from "../../../questionnaire/questions/home-age-question/home-age";
import {FuelType} from "../../../questionnaire/questions/fuel-type-question/fuel-type";
import toString from "lodash-es/toString";
import {Epc} from "../../postcode-epc-service/model/epc";
import {ShowerType} from "../../../questionnaire/questions/shower-type-question/shower-type";

export class RdSapInput {
    readonly epc: Epc;
    readonly property_type: string;
    readonly built_form: string;
    readonly flat_level: string;
    readonly construction_date: string;
    readonly floor_area: string;
    readonly num_storeys: number;
    readonly num_bedrooms: number;
    readonly heating_fuel: string;
    readonly measures: string;

    readonly living_room_temperature: number;
    readonly occupants: number;
    readonly showers_per_week: number;
    readonly baths_per_week: number;
    readonly shower_type: string;
    readonly fridge_freezers: number;
    readonly fridges: number;
    readonly freezers: number;

    constructor(responseData: ResponseData) {
        this.epc = responseData.epc;

        // TODO: This is not currently a full correct mapping to RdSAP. For a full mapping, the homeType question needs to be changed.
        // This is a 'best possible' mapping based on the current questions, to enable a PoC connection to the BRE API.
        // See BEISDEAS-28 for updating the questions to allow a correct mapping.
        this.property_type = toString(RdSapInput.getPropertyType(responseData.homeType));
        this.built_form = toString(RdSapInput.getBuiltForm(responseData.homeType));
        this.flat_level = toString(RdSapInput.getFlatLevel(responseData.homeType));
        this.construction_date = RdSapInput.getConstructionDateEncoding(responseData.homeAge);
        this.floor_area = undefined;
        this.num_storeys = responseData.numberOfStoreys;
        this.num_bedrooms = responseData.numberOfBedrooms;
        this.heating_fuel = RdSapInput.getFuelTypeEncoding(responseData.fuelType);
        this.measures = 'Y';

        // Habit data+
        this.living_room_temperature = responseData.livingRoomTemperature;
        this.occupants = responseData.numberOfChildren + responseData.numberOfAdultsAgedUnder64 +
            responseData.numberOfAdultsAged64To80 + responseData.numberOfAdultsAgedOver80;
        this.showers_per_week = responseData.numberOfShowersPerWeek;
        this.baths_per_week = responseData.numberOfBathsPerWeek;
        if (responseData.showerType)
            this.shower_type = RdSapInput.getShowerTypeEncoding(responseData.showerType);
        this.fridge_freezers = responseData.numberOfFridgeFreezers;
        this.fridges = responseData.numberOfFridges;
        this.freezers = responseData.numberOfFreezers;
    }

    public isMinimalDataSet() {
        let requiredProperties = [
            this.property_type,
            this.built_form,
            this.construction_date,
            this.heating_fuel
        ];
        if (this.property_type === toString(PropertyType.Flat)) {
            requiredProperties.push(this.flat_level);
        }
        if (!this.floor_area) {
            requiredProperties.push(toString(this.num_storeys));
            requiredProperties.push(toString(this.num_bedrooms));
        }
        return requiredProperties.every(value => {
            return value && value.length > 0;
        });
    }

    private static getPropertyType(homeType: HomeType): PropertyType {
        switch (homeType) {
            case HomeType.DetachedHouse: {
                return PropertyType.House;
            }
            case HomeType.SemiDetachedHouse: {
                return PropertyType.House;
            }
            case HomeType.EndTerraceHouse: {
                return PropertyType.House;
            }
            case HomeType.MidTerraceHouse: {
                return PropertyType.House;
            }
            case HomeType.GroundFloorFlat: {
                return PropertyType.Flat;
            }
            case HomeType.MidFloorFlat: {
                return PropertyType.Flat;
            }
            case HomeType.TopFloorFlat: {
                return PropertyType.Flat;
            }
            case HomeType.BungalowDetached: {
                return PropertyType.Bungalow;
            }
            case HomeType.BungalowAttached: {
                return PropertyType.Bungalow;
            }
            case HomeType.ParkHome: {
                return PropertyType.ParkHome;
            }
            default: {
                return null;
            }
        }
    }

    private static getBuiltForm(homeType: HomeType): BuiltForm {
        switch (homeType) {
            case HomeType.DetachedHouse: {
                return BuiltForm.Detached;
            }
            case HomeType.SemiDetachedHouse: {
                return BuiltForm.SemiDetached;
            }
            case HomeType.EndTerraceHouse: {
                return BuiltForm.EndTerrace
            }
            case HomeType.MidTerraceHouse: {
                return BuiltForm.MidTerrace
            }
            case HomeType.GroundFloorFlat: {
                return BuiltForm.MidTerrace;
            }
            case HomeType.MidFloorFlat: {
                return BuiltForm.MidTerrace;
            }
            case HomeType.TopFloorFlat: {
                return BuiltForm.MidTerrace;
            }
            case HomeType.BungalowDetached: {
                return BuiltForm.Detached;
            }
            case HomeType.BungalowAttached: {
                return BuiltForm.SemiDetached;
            }
            case HomeType.ParkHome: {
                return BuiltForm.Detached;
            }
            default: {
                return null;
            }
        }
    }

    private static getFlatLevel(homeType: HomeType): FlatLevel {
        switch (homeType) {
            case HomeType.GroundFloorFlat: {
                return FlatLevel.GroundFloor;
            }
            case HomeType.MidFloorFlat: {
                return FlatLevel.MidFloor;
            }
            case HomeType.TopFloorFlat: {
                return FlatLevel.TopFloor;
            }
        }
    }

    private static getConstructionDateEncoding(homeAge: HomeAge): string {
        const encodingCharacters = 'ABCDEFGHIJKL';
        return encodingCharacters.charAt(homeAge);
    }

    private static getFuelTypeEncoding(fuelType: FuelType): string {
        if (fuelType !== undefined) {
            return fuelType.toString(10);
        }
        return undefined;
    }

    private static getShowerTypeEncoding(showerType: ShowerType): string {
        if (showerType !== undefined) {
            return showerType.toString(10);
        }
        return undefined;
    }
}