import {PropertyType} from './property-type';
import {ResponseData} from '../../response-data/response-data';
import toString from 'lodash-es/toString';
import {Epc} from '../../postcode-epc-service/model/epc';
import {TenureType} from '../../../questionnaire/questions/tenure-type-question/tenure-type';
import {RdsapInputHelper} from "./rdsap-input-helper";


export class RdSapInput {
    readonly postcode: string;
    readonly epc: Epc;
    readonly property_type: string;
    readonly built_form: string;
    readonly flat_level: string;
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
    readonly with_vulnerable_occupants: boolean;
    readonly showers_per_week: number;
    readonly baths_per_week: number;
    readonly shower_type: string;

    readonly measures_package: string[];

    constructor(responseData: ResponseData, selectedMeasureCodes: string[] = []) {
        this.postcode = responseData.postcode;
        this.epc = responseData.epc;

        this.property_type = toString(RdsapInputHelper.getPropertyType(responseData.homeType));
        this.built_form = toString(RdsapInputHelper.getBuiltForm(responseData));
        this.flat_level = toString(RdsapInputHelper.getFlatLevel(responseData.floorLevels));
        this.construction_date = RdsapInputHelper.getConstructionDateEncoding(responseData.homeAge);
        this.floor_area = RdsapInputHelper.getFloorArea(responseData.floorArea, responseData.floorAreaUnit);
        this.num_storeys = responseData.numberOfStoreys;
        this.num_bedrooms = responseData.numberOfBedrooms;
        this.heating_fuel = RdsapInputHelper.getFuelTypeEncoding(responseData.fuelType);
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
        this.occupants = RdsapInputHelper.getOccupants(responseData);
        this.with_vulnerable_occupants = RdsapInputHelper.getWithVulnerableOccupants(responseData);
        this.showers_per_week = responseData.numberOfShowersPerWeek;
        this.baths_per_week = responseData.numberOfBathsPerWeek;

        this.measures_package = selectedMeasureCodes;
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
}
