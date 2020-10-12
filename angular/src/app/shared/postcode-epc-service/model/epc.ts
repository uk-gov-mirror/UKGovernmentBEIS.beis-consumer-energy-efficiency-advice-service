import {EpcRating} from './epc-rating';
import {EpcResponse} from './response/epc-response';
import {HomeAge} from "../../../questionnaire/questions/home-age-question/home-age";

export class Epc {

    // See https://epc.opendatacommunities.org/docs/guidance for documentation of the data

    public lmkKey: string;
    public address1: string;
    public address2: string;
    public address3: string;
    public postcode: string;
    public buildingReferenceNumber: string;
    public currentEnergyRating: EpcRating;
    public potentialEnergyRating: string;
    public currentEnergyEfficiency: string;
    public potentialEnergyEfficiency: string;
    public propertyType: string;
    public builtForm: string;
    public inspectionDate: string;
    public localAuthorityCode: string;
    public constituency: string;
    public county: string;
    public epcDate: Date | undefined;
    public transactionType: string;
    public environmentImpactCurrent: string;
    public environmentImpactPotential: string;
    public energyConsumptionCurrent: string;
    public energyConsumptionPotential: string;
    public co2EmissionsCurrent: string;
    public co2EmissCurrPerFloorArea: string;
    public co2EmissionsPotential: string;
    public lightingCostCurrent: string;
    public lightingCostPotential: string;
    public heatingCostCurrent: string;
    public heatingCostPotential: string;
    public hotWaterCostCurrent: string;
    public hotWaterCostPotential: string;
    public totalFloorArea: string;
    public energyTariff: string;
    public isConnectedToMainsGas: boolean;
    public floorLevel: number;
    public flatTopStorey: boolean;
    public flatStoreyCount: string;
    public mainHeatingControls: string;
    public multiGlazeProportion: string;
    public glazedType: string;
    public glazedArea: string;
    public extensionCount: string;
    public numberHabitableRooms: number;
    public numberHeatedRooms: string;
    public lowEnergyLighting: string;
    public numberOpenFireplaces: string;
    public hotWaterDescription: string;
    public hotWaterEnergyEff: string;
    public hotWaterEnvEff: string;
    public floorDescription: string;
    public floorEnergyEff: string;
    public floorEnvEff: string;
    public windowsDescription: string;
    public windowsEnergyEff: string;
    public windowsEnvEff: string;
    public wallsDescription: string;
    public wallsEnergyEff: string;
    public wallsEnvEff: string;
    public secondHeatDescription: string;
    public sheatingEnergyEff: string;
    public sheatingEnvEff: string;
    public roofDescription: string;
    public roofEnergyEff: string;
    public roofEnvEff: string;
    public mainheatDescription: string;
    public mainheatEnergyEff: string;
    public mainheatEnvEff: string;
    public mainheatcontDescription: string;
    public mainheatcEnergyEff: string;
    public mainheatcEnvEff: string;
    public lightingDescription: string;
    public lightingEnergyEff: string;
    public lightingEnvEff: string;
    public mainFuel: string;
    public windTurbineCount: string;
    public heatLossCorridor: string;
    public unheatedCorridorLength: string;
    public floorHeight: string;
    public photoSupply: string;
    public solarWaterHeatingFlag: string;
    public mechanicalVentilation: string;
    public address: string;
    public localAuthorityLabel: string;
    public constituencyLabel: string;
    public certificateHash: string;
    public constructionAgeBand: HomeAge | null;

    private static MAIN_HEAT_DESCRIPTION_EMPTY_RESPONSE = 'Main-Heating';

    constructor(epcResponse?: EpcResponse, epc?: Epc) {
        if (epcResponse) {
            // NB The data quality is mixed. Any field that
            // we use should be escaped/parsed appropriately and we
            // should be able to deal with a missing or bad field.
            this.lmkKey = epcResponse['lmk-key'];
            this.address1 = epcResponse['address1'];
            this.address2 = epcResponse['address2'];
            this.address3 = epcResponse['address3'];
            this.postcode = epcResponse['postcode'];
            this.currentEnergyRating = EpcRating[epcResponse['current-energy-rating']];
            this.numberHabitableRooms = Epc.getParsedIntegerOrNull(epcResponse['number-habitable-rooms']);
            this.propertyType = epcResponse['property-type'].toLowerCase();
            this.floorLevel = Epc.getParsedFloorLevel(epcResponse['floor-level']);
            this.localAuthorityLabel = epcResponse['local-authority-label'];
            this.mainheatDescription = (epcResponse['mainheat-description'] === Epc.MAIN_HEAT_DESCRIPTION_EMPTY_RESPONSE) ?
                null : epcResponse['mainheat-description'].toLowerCase();
            this.flatTopStorey = Epc.getParsedBooleanFromEpcResponseValue(epcResponse['flat-top-storey']);
            this.builtForm = epcResponse['built-form'].toLowerCase();
            this.isConnectedToMainsGas = Epc.getParsedBooleanFromEpcResponseValue(epcResponse['mains-gas-flag']);
            this.mainFuel = epcResponse['main-fuel'].toLowerCase();
            this.hotWaterDescription = epcResponse['hotwater-description'].toLowerCase();
            this.localAuthorityCode = epcResponse['local-authority'];
            this.epcDate = new Date(epcResponse['lodgement-date']);
            this.certificateHash = epcResponse['certificate-hash'];
            this.constructionAgeBand = Epc.getParsedConstructionAgeBand(epcResponse['construction-age-band']);

            this.buildingReferenceNumber = epcResponse['building-reference-number'];
            this.potentialEnergyRating = epcResponse['potential-energy-rating'];
            this.currentEnergyEfficiency = epcResponse['current-energy-efficiency'];
            this.potentialEnergyEfficiency = epcResponse['potential-energy-efficiency'];
            this.inspectionDate = epcResponse['inspection-date'];
            this.constituency = epcResponse['constituency'];
            this.county = epcResponse['county'];
            this.transactionType = epcResponse['transaction-type'];
            this.environmentImpactCurrent = epcResponse['environment-impact-current'];
            this.environmentImpactPotential = epcResponse['environment-impact-potential'];
            this.energyConsumptionCurrent = epcResponse['energy-consumption-current'];
            this.energyConsumptionPotential = epcResponse['energy-consumption-potential'];
            this.co2EmissionsCurrent = epcResponse['co2-emissions-current'];
            this.co2EmissCurrPerFloorArea = epcResponse['co2-emiss-curr-per-floor-area'];
            this.co2EmissionsPotential = epcResponse['co2-emissions-potential'];
            this.lightingCostCurrent = epcResponse['lighting-cost-current'];
            this.lightingCostPotential = epcResponse['lighting-cost-potential'];
            this.heatingCostCurrent = epcResponse['heating-cost-current'];
            this.heatingCostPotential = epcResponse['heating-cost-potential'];
            this.hotWaterCostCurrent = epcResponse['hot-water-cost-current'];
            this.hotWaterCostPotential = epcResponse['hot-water-cost-potential'];
            this.totalFloorArea = epcResponse['total-floor-area'];
            this.energyTariff = epcResponse['energy-tariff'];
            // this is the number of storeys in the apartment block, not the number of storeys in the flat
            this.flatStoreyCount = epcResponse['flat-storey-count'];
            this.mainHeatingControls = epcResponse['main-heating-controls'];
            this.multiGlazeProportion = epcResponse['multi-glaze-proportion'];
            this.glazedType = epcResponse['glazed-type'];
            this.glazedArea = epcResponse['glazed-area'];
            this.extensionCount = epcResponse['extension-count'];
            this.numberHeatedRooms = epcResponse['number-heated-rooms'];
            this.lowEnergyLighting = epcResponse['low-energy-lighting'];
            this.numberOpenFireplaces = epcResponse['number-open-fireplaces'];
            this.hotWaterEnergyEff = epcResponse['hot-water-energy-eff'];
            this.hotWaterEnvEff = epcResponse['hot-water-env-eff'];
            this.floorDescription = epcResponse['floor-description'];
            this.floorEnergyEff = epcResponse['floor-energy-eff'];
            this.floorEnvEff = epcResponse['floor-env-eff'];
            this.windowsDescription = epcResponse['windows-description'];
            this.windowsEnergyEff = epcResponse['windows-energy-eff'];
            this.windowsEnvEff = epcResponse['windows-env-eff'];
            this.wallsDescription = epcResponse['walls-description'];
            this.wallsEnergyEff = epcResponse['walls-energy-eff'];
            this.wallsEnvEff = epcResponse['walls-env-eff'];
            this.secondHeatDescription = epcResponse['secondheat-description'];
            this.sheatingEnergyEff = epcResponse['sheating-energy-eff'];
            this.sheatingEnvEff = epcResponse['sheating-env-eff'];
            this.roofDescription = epcResponse['roof-description'];
            this.roofEnergyEff = epcResponse['roof-energy-eff'];
            this.roofEnvEff = epcResponse['roof-env-eff'];
            this.mainheatEnergyEff = epcResponse['mainheat-energy-eff'];
            this.mainheatEnvEff = epcResponse['mainheat-env-eff'];
            this.mainheatcontDescription = epcResponse['mainheatcont-description'];
            this.mainheatcEnergyEff = epcResponse['mainheatc-energy-eff'];
            this.mainheatcEnvEff = epcResponse['mainheatc-env-eff'];
            this.lightingDescription = epcResponse['lighting-description'];
            this.lightingEnergyEff = epcResponse['lighting-energy-eff'];
            this.lightingEnvEff = epcResponse['lighting-env-eff'];
            this.windTurbineCount = epcResponse['wind-turbine-count'];
            this.heatLossCorridor = epcResponse['heat-loss-corridoor'];
            this.unheatedCorridorLength = epcResponse['unheated-corridor-length'];
            this.floorHeight = epcResponse['floor-height'];
            this.photoSupply = epcResponse['photo-supply'];
            this.solarWaterHeatingFlag = epcResponse['solar-water-heating-flag'];
            this.mechanicalVentilation = epcResponse['mechanical-ventilation'];
            this.address = epcResponse['address'];
            this.constituencyLabel = epcResponse['constituency-label'];
        }

        if (epc) {
            this.lmkKey = epc.lmkKey;
            this.address1 = epc.address1;
            this.address2 = epc.address2;
            this.address3 = epc.address3;
            this.postcode = epc.postcode;
            this.buildingReferenceNumber = epc.buildingReferenceNumber;
            this.currentEnergyRating = epc.currentEnergyRating;
            this.potentialEnergyRating = epc.potentialEnergyRating;
            this.currentEnergyEfficiency = epc.currentEnergyEfficiency;
            this.potentialEnergyEfficiency = epc.potentialEnergyEfficiency;
            this.propertyType = epc.propertyType;
            this.builtForm = epc.builtForm;
            this.inspectionDate = epc.inspectionDate;
            this.localAuthorityCode = epc.localAuthorityCode;
            this.constituency = epc.constituency;
            this.county = epc.county;
            this.epcDate = epc.epcDate ? new Date(epc.epcDate.getTime()) : undefined;
            this.transactionType = epc.transactionType;
            this.environmentImpactCurrent = epc.environmentImpactCurrent;
            this.environmentImpactPotential = epc.environmentImpactPotential;
            this.energyConsumptionCurrent = epc.energyConsumptionCurrent;
            this.energyConsumptionPotential = epc.energyConsumptionPotential;
            this.co2EmissionsCurrent = epc.co2EmissionsCurrent;
            this.co2EmissCurrPerFloorArea = epc.co2EmissCurrPerFloorArea;
            this.co2EmissionsPotential = epc.co2EmissionsPotential;
            this.lightingCostCurrent = epc.lightingCostCurrent;
            this.lightingCostPotential = epc.lightingCostPotential;
            this.heatingCostCurrent = epc.heatingCostCurrent;
            this.heatingCostPotential = epc.heatingCostPotential;
            this.hotWaterCostCurrent = epc.hotWaterCostCurrent;
            this.hotWaterCostPotential = epc.hotWaterCostPotential;
            this.totalFloorArea = epc.totalFloorArea;
            this.energyTariff = epc.energyTariff;
            this.isConnectedToMainsGas = epc.isConnectedToMainsGas;
            this.floorLevel = epc.floorLevel;
            this.flatTopStorey = epc.flatTopStorey;
            this.flatStoreyCount = epc.flatStoreyCount;
            this.mainHeatingControls = epc.mainHeatingControls;
            this.multiGlazeProportion = epc.multiGlazeProportion;
            this.glazedType = epc.glazedType;
            this.glazedArea = epc.glazedArea;
            this.extensionCount = epc.extensionCount;
            this.numberHabitableRooms = epc.numberHabitableRooms;
            this.numberHeatedRooms = epc.numberHeatedRooms;
            this.lowEnergyLighting = epc.lowEnergyLighting;
            this.numberOpenFireplaces = epc.numberOpenFireplaces;
            this.hotWaterDescription = epc.hotWaterDescription;
            this.hotWaterEnergyEff = epc.hotWaterEnergyEff;
            this.hotWaterEnvEff = epc.hotWaterEnvEff;
            this.floorDescription = epc.floorDescription;
            this.floorEnergyEff = epc.floorEnergyEff;
            this.floorEnvEff = epc.floorEnvEff;
            this.windowsDescription = epc.windowsDescription;
            this.windowsEnergyEff = epc.windowsEnergyEff;
            this.windowsEnvEff = epc.windowsEnvEff;
            this.wallsDescription = epc.wallsDescription;
            this.wallsEnergyEff = epc.wallsEnergyEff;
            this.wallsEnvEff = epc.wallsEnvEff;
            this.secondHeatDescription = epc.secondHeatDescription;
            this.sheatingEnergyEff = epc.sheatingEnergyEff;
            this.sheatingEnvEff = epc.sheatingEnvEff;
            this.roofDescription = epc.roofDescription;
            this.roofEnergyEff = epc.roofEnergyEff;
            this.roofEnvEff = epc.roofEnvEff;
            this.mainheatDescription = epc.mainheatDescription;
            this.mainheatEnergyEff = epc.mainheatEnergyEff;
            this.mainheatEnvEff = epc.mainheatEnvEff;
            this.mainheatcontDescription = epc.mainheatcontDescription;
            this.mainheatcEnergyEff = epc.mainheatcEnergyEff;
            this.mainheatcEnvEff = epc.mainheatcEnvEff;
            this.lightingDescription = epc.lightingDescription;
            this.lightingEnergyEff = epc.lightingEnergyEff;
            this.lightingEnvEff = epc.lightingEnvEff;
            this.mainFuel = epc.mainFuel;
            this.windTurbineCount = epc.windTurbineCount;
            this.heatLossCorridor = epc.heatLossCorridor;
            this.unheatedCorridorLength = epc.unheatedCorridorLength;
            this.floorHeight = epc.floorHeight;
            this.photoSupply = epc.photoSupply;
            this.solarWaterHeatingFlag = epc.solarWaterHeatingFlag;
            this.mechanicalVentilation = epc.mechanicalVentilation;
            this.address = epc.address;
            this.localAuthorityLabel = epc.localAuthorityLabel;
            this.constituencyLabel = epc.constituencyLabel;
            this.certificateHash = epc.certificateHash;
            this.constructionAgeBand = epc.constructionAgeBand;
        }
    }

    public getDisplayAddress(): string {
        const displayAddress1 = this.address1;
        const displayAddress2 = this.address2 ? ', ' + this.address2 : '';
        const displayAddress3 = this.address3 ? ', ' + this.address3 : '';
        return displayAddress1 + displayAddress2 + displayAddress3;
    }

    public getHouseNumber(): number {
        const houseNumberFromFirstLine = Epc.getIntegerFromStartOfString(this.address1);
        const houseNumberFromSecondLine = Epc.getIntegerFromStartOfString(this.address2);
        return houseNumberFromFirstLine || houseNumberFromSecondLine;
    }

    private static getIntegerFromStartOfString(input: string): number {
        const matchNumberAtStartOfString = /^[0-9]+/;
        const regexMatches = matchNumberAtStartOfString.exec(input);
        const numberAsString = regexMatches && regexMatches.length > 0 && regexMatches[0];
        const number = numberAsString ? parseInt(numberAsString) : null;
        return (number && !isNaN(number)) ? number : null;
    }

    private static getParsedFloorLevel(val: string): number {
        return (val.toLowerCase() === 'ground') ? 0 : Epc.getParsedIntegerOrNull(val);
    }

    private static getParsedIntegerOrNull(val: string): number {
        const parsedNumber = parseInt(val);
        return isNaN(parsedNumber) ? null : parsedNumber;
    }

    private static getParsedBooleanFromEpcResponseValue(val: string): boolean {
        if (val === 'Y') {
            return true;
        } else if (val === 'N') {
            return false;
        } else {
            return null;
        }
    }

    private static getParsedConstructionAgeBand(val?: string): HomeAge | null {
        switch (val ? val.replace("England and Wales: ", "").toLowerCase() : null) {
            case ("before 1900"): {
                return HomeAge.pre1900;
            }
            case ("1900-1929"): {
                return HomeAge.from1900to1929;
            }
            case ("1930-1949"): {
                return HomeAge.from1930to1949;
            }
            case ("1950-1966"): {
                return HomeAge.from1950to1966;
            }
            case ("1967-1975"): {
                return HomeAge.from1967to1975;
            }
            case ("1976-1982"): {
                return HomeAge.from1976to1982;
            }
            case ("1983-1990"): {
                return HomeAge.from1983to1990;
            }
            case ("1991-1995"): {
                return HomeAge.from1991to1995;
            }
            case ("1996-2002"): {
                return HomeAge.from1996to2002;
            }
            case ("2003-2006"): {
                return HomeAge.from2003to2006;
            }
            case ("2007-2011"): {
                return HomeAge.from2007to2011;
            }
            case ("2012 onwards"): {
                return HomeAge.from2012toPresent;
            }
            default:
                return null;
        }
    }
}
