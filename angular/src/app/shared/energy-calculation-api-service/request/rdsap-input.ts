import {PropertyType} from './property-type';
import {BuiltForm} from './built-form';
import {FlatLevel} from './flat-level';
import {ResponseData} from '../../response-data/response-data';
import {HomeType, isDetached} from '../../../questionnaire/questions/home-type-question/home-type';
import {HomeAge} from '../../../questionnaire/questions/home-age-question/home-age';
import {FuelType} from '../../../questionnaire/questions/fuel-type-question/fuel-type';
import toString from 'lodash-es/toString';
import {Epc} from '../../postcode-epc-service/model/epc';
import {FloorAreaUnit} from '../../../questionnaire/questions/floor-area-question/floor-area-unit';
import {FloorLevel} from '../../../questionnaire/questions/floor-level-question/floor-level';
import {getNumberOfExposedWallsInFlat} from '../../../questionnaire/questions/flat-exposed-wall-question/flat-exposed-wall';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import includes from 'lodash-es/includes';


export class RdSapInput {
    public static readonly SQUARE_FOOT_PER_SQUARE_METRE: number = 10.7639;
    public static readonly NUMBER_OF_HOURS_PER_QUARTER_DAY = 6;
    public static readonly NUMBER_OF_EXPOSED_WALLS_IN_DETACHED_PROPERTY = 4;

    readonly postcode: string;
    readonly epc: Epc;
    readonly property_type: string;
    readonly built_form: string;
    readonly flat_level: string;
    readonly flat_top_storey: string;
    readonly number_of_exposed_walls: number;
    readonly construction_date: string;
    readonly floor_area: number;
    readonly num_storeys: number;
    readonly num_bedrooms: number;
    readonly heating_fuel: string;
    readonly normal_days_off_hours: number[];
    readonly heating_pattern_type: number;
    readonly measures: boolean;
    readonly rented: boolean;
    readonly condensing_boiler: boolean;
    readonly hot_water_cylinder: boolean;
    readonly electricity_tariff: number;
    readonly roof_type: number;
    readonly wall_type: number;
    readonly glazing_type: number;

    readonly living_room_temperature: number;
    readonly occupants: number;
    readonly showers_per_week: number;
    readonly baths_per_week: number;
    readonly shower_type: string;

    constructor(responseData: ResponseData) {
        this.postcode = responseData.postcode;
        this.epc = responseData.epc;

        // TODO:BEISDEAS-230 This is not currently a full correct mapping
        // to RdSAP. For a full mapping, the homeType question needs to be
        // changed. This is a 'best possible' mapping based on the current
        // questions, to enable a PoC connection to the BRE API. See
        // BEISDEAS-28 for updating the questions to allow a correct mapping.
        this.property_type = toString(RdSapInput.getPropertyType(responseData.homeType));
        this.built_form = toString(RdSapInput.getBuiltForm(responseData.homeType));
        this.flat_level = toString(RdSapInput.getFlatLevel(responseData.floorLevels));
        this.flat_top_storey = RdSapInput.getFlatTopStorey(responseData.floorLevels);
        this.number_of_exposed_walls = RdSapInput.getNumberOfExposedWalls(responseData);
        this.construction_date = RdSapInput.getConstructionDateEncoding(responseData.homeAge);
        this.floor_area = RdSapInput.getFloorArea(responseData.floorArea, responseData.floorAreaUnit);
        this.num_storeys = responseData.numberOfStoreys;
        this.num_bedrooms = responseData.numberOfBedrooms;
        this.heating_fuel = RdSapInput.getFuelTypeEncoding(responseData.fuelType);
        this.normal_days_off_hours = responseData.normalDaysOffHours;
        this.heating_pattern_type = responseData.heatingPatternType;
        this.measures = true;
        this.rented = responseData.tenureType !== TenureType.OwnerOccupancy;
        this.condensing_boiler = responseData.condensingBoiler;
        this.hot_water_cylinder = responseData.hotWaterCylinder;
        this.electricity_tariff = responseData.electricityTariff;
        this.roof_type = responseData.roofType;
        this.wall_type = responseData.wallType;
        this.glazing_type = responseData.glazingType;

        // Habit data+
        this.living_room_temperature = responseData.livingRoomTemperature;
        this.occupants = responseData.numberOfChildren + responseData.numberOfAdultsAgedUnder64 +
            responseData.numberOfAdultsAged64To80 + responseData.numberOfAdultsAgedOver80;
        this.showers_per_week = responseData.numberOfShowersPerWeek;
        this.baths_per_week = responseData.numberOfBathsPerWeek;
    }

    public isMinimalDataSet() {
        const requiredProperties = [
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
            case HomeType.SemiDetachedOrTerracedHouse: {
                return PropertyType.House;
            }
            case HomeType.DetachedBungalow: {
                return PropertyType.Bungalow;
            }
            case HomeType.SemiDetachedBungalow: {
                return PropertyType.Bungalow;
            }
            case HomeType.FlatDuplexOrMaisonette: {
                return PropertyType.Flat;
            }
            case HomeType.ParkHomeOrMobileHome: {
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
            case HomeType.SemiDetachedOrTerracedHouse: {
                return BuiltForm.SemiDetached;
            }
            case HomeType.DetachedBungalow: {
                return BuiltForm.Detached;
            }
            case HomeType.SemiDetachedBungalow: {
                return BuiltForm.SemiDetached;
            }
            case HomeType.FlatDuplexOrMaisonette: {
                return BuiltForm.MidTerrace;
            }
            case HomeType.ParkHomeOrMobileHome: {
                return BuiltForm.Detached;
            }
            default: {
                return null;
            }
        }
    }

    private static getFlatLevel(floorLevels: FloorLevel[]): FlatLevel {
        // For now, we use the lowest floor level as the flat level
        if (!floorLevels) {
            return null;
        }

        const lowestFloorLevel: FloorLevel = floorLevels.sort()[0];
        switch (lowestFloorLevel) {
            case FloorLevel.Basement: {
                return FlatLevel.Basement;
            }
            case FloorLevel.Ground: {
                return FlatLevel.GroundFloor;
            }
            case FloorLevel.MidFloor: {
                return FlatLevel.MidFloor;
            }
            case FloorLevel.TopFloor: {
                return FlatLevel.TopFloor;
            }
        }
    }

    private static getFlatTopStorey(floorLevels: FloorLevel[]): string {
        if (!floorLevels) {
            return null;
        }

        return includes(floorLevels, FloorLevel.TopFloor) ? 'Y' : 'N';
    }

    private static getNumberOfExposedWalls(responseData: ResponseData) {
        if (responseData.homeType === HomeType.FlatDuplexOrMaisonette) {
            return getNumberOfExposedWallsInFlat(responseData.numberOfExposedWallsInFlat);
        } else if (isDetached(responseData.homeType)) {
            return RdSapInput.NUMBER_OF_EXPOSED_WALLS_IN_DETACHED_PROPERTY;
        } else {
            return responseData.numberOfExposedWallsInHouse;
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

    private static getFloorArea(area: number, unit: FloorAreaUnit): number {
        if (unit === FloorAreaUnit.SquareMetre) {
            return area;
        } else {
            return area / RdSapInput.SQUARE_FOOT_PER_SQUARE_METRE;
        }
    }
}
