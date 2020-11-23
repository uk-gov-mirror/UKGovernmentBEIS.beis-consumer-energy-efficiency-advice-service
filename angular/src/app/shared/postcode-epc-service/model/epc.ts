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
    public flatStoreyCount: string; // the number of storeys in the apartment block, not the number of storeys in the flat
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

    constructor(
        lmkKey: string,
        address1: string,
        address2: string,
        address3: string,
        postcode: string,
        buildingReferenceNumber: string,
        currentEnergyRating: EpcRating,
        potentialEnergyRating: string,
        currentEnergyEfficiency: string,
        potentialEnergyEfficiency: string,
        propertyType: string,
        builtForm: string,
        inspectionDate: string,
        localAuthorityCode: string,
        constituency: string,
        county: string,
        epcDate: Date | undefined,
        transactionType: string,
        environmentImpactCurrent: string,
        environmentImpactPotential: string,
        energyConsumptionCurrent: string,
        energyConsumptionPotential: string,
        co2EmissionsCurrent: string,
        co2EmissCurrPerFloorArea: string,
        co2EmissionsPotential: string,
        lightingCostCurrent: string,
        lightingCostPotential: string,
        heatingCostCurrent: string,
        heatingCostPotential: string,
        hotWaterCostCurrent: string,
        hotWaterCostPotential: string,
        totalFloorArea: string,
        energyTariff: string,
        isConnectedToMainsGas: boolean,
        floorLevel: number,
        flatTopStorey: boolean,
        flatStoreyCount: string,
        mainHeatingControls: string,
        multiGlazeProportion: string,
        glazedType: string,
        glazedArea: string,
        extensionCount: string,
        numberHabitableRooms: number,
        numberHeatedRooms: string,
        lowEnergyLighting: string,
        numberOpenFireplaces: string,
        hotWaterDescription: string,
        hotWaterEnergyEff: string,
        hotWaterEnvEff: string,
        floorDescription: string,
        floorEnergyEff: string,
        floorEnvEff: string,
        windowsDescription: string,
        windowsEnergyEff: string,
        windowsEnvEff: string,
        wallsDescription: string,
        wallsEnergyEff: string,
        wallsEnvEff: string,
        secondHeatDescription: string,
        sheatingEnergyEff: string,
        sheatingEnvEff: string,
        roofDescription: string,
        roofEnergyEff: string,
        roofEnvEff: string,
        mainheatDescription: string,
        mainheatEnergyEff: string,
        mainheatEnvEff: string,
        mainheatcontDescription: string,
        mainheatcEnergyEff: string,
        mainheatcEnvEff: string,
        lightingDescription: string,
        lightingEnergyEff: string,
        lightingEnvEff: string,
        mainFuel: string,
        windTurbineCount: string,
        heatLossCorridor: string,
        unheatedCorridorLength: string,
        floorHeight: string,
        photoSupply: string,
        solarWaterHeatingFlag: string,
        mechanicalVentilation: string,
        address: string,
        localAuthorityLabel: string,
        constituencyLabel: string,
        certificateHash: string,
        constructionAgeBand: HomeAge | null
    ) {
        this.lmkKey = lmkKey;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.postcode = postcode;
        this.buildingReferenceNumber = buildingReferenceNumber;
        this.currentEnergyRating = currentEnergyRating;
        this.potentialEnergyRating = potentialEnergyRating;
        this.currentEnergyEfficiency = currentEnergyEfficiency;
        this.potentialEnergyEfficiency = potentialEnergyEfficiency;
        this.propertyType = propertyType;
        this.builtForm = builtForm;
        this.inspectionDate = inspectionDate;
        this.localAuthorityCode = localAuthorityCode;
        this.constituency = constituency;
        this.county = county;
        this.epcDate = epcDate;
        this.transactionType = transactionType;
        this.environmentImpactCurrent = environmentImpactCurrent;
        this.environmentImpactPotential = environmentImpactPotential;
        this.energyConsumptionCurrent = energyConsumptionCurrent;
        this.energyConsumptionPotential = energyConsumptionPotential;
        this.co2EmissionsCurrent = co2EmissionsCurrent;
        this.co2EmissCurrPerFloorArea = co2EmissCurrPerFloorArea;
        this.co2EmissionsPotential = co2EmissionsPotential;
        this.lightingCostCurrent = lightingCostCurrent;
        this.lightingCostPotential = lightingCostPotential;
        this.heatingCostCurrent = heatingCostCurrent;
        this.heatingCostPotential = heatingCostPotential;
        this.hotWaterCostCurrent = hotWaterCostCurrent;
        this.hotWaterCostPotential = hotWaterCostPotential;
        this.totalFloorArea = totalFloorArea;
        this.energyTariff = energyTariff;
        this.isConnectedToMainsGas = isConnectedToMainsGas;
        this.floorLevel = floorLevel;
        this.flatTopStorey = flatTopStorey;
        this.flatStoreyCount = flatStoreyCount;
        this.mainHeatingControls = mainHeatingControls;
        this.multiGlazeProportion = multiGlazeProportion;
        this.glazedType = glazedType;
        this.glazedArea = glazedArea;
        this.extensionCount = extensionCount;
        this.numberHabitableRooms = numberHabitableRooms;
        this.numberHeatedRooms = numberHeatedRooms;
        this.lowEnergyLighting = lowEnergyLighting;
        this.numberOpenFireplaces = numberOpenFireplaces;
        this.hotWaterDescription = hotWaterDescription;
        this.hotWaterEnergyEff = hotWaterEnergyEff;
        this.hotWaterEnvEff = hotWaterEnvEff;
        this.floorDescription = floorDescription;
        this.floorEnergyEff = floorEnergyEff;
        this.floorEnvEff = floorEnvEff;
        this.windowsDescription = windowsDescription;
        this.windowsEnergyEff = windowsEnergyEff;
        this.windowsEnvEff = windowsEnvEff;
        this.wallsDescription = wallsDescription;
        this.wallsEnergyEff = wallsEnergyEff;
        this.wallsEnvEff = wallsEnvEff;
        this.secondHeatDescription = secondHeatDescription;
        this.sheatingEnergyEff = sheatingEnergyEff;
        this.sheatingEnvEff = sheatingEnvEff;
        this.roofDescription = roofDescription;
        this.roofEnergyEff = roofEnergyEff;
        this.roofEnvEff = roofEnvEff;
        this.mainheatDescription = mainheatDescription;
        this.mainheatEnergyEff = mainheatEnergyEff;
        this.mainheatEnvEff = mainheatEnvEff;
        this.mainheatcontDescription = mainheatcontDescription;
        this.mainheatcEnergyEff = mainheatcEnergyEff;
        this.mainheatcEnvEff = mainheatcEnvEff;
        this.lightingDescription = lightingDescription;
        this.lightingEnergyEff = lightingEnergyEff;
        this.lightingEnvEff = lightingEnvEff;
        this.mainFuel = mainFuel;
        this.windTurbineCount = windTurbineCount;
        this.heatLossCorridor = heatLossCorridor;
        this.unheatedCorridorLength = unheatedCorridorLength;
        this.floorHeight = floorHeight;
        this.photoSupply = photoSupply;
        this.solarWaterHeatingFlag = solarWaterHeatingFlag;
        this.mechanicalVentilation = mechanicalVentilation;
        this.address = address;
        this.localAuthorityLabel = localAuthorityLabel;
        this.constituencyLabel = constituencyLabel;
        this.certificateHash = certificateHash;
        this.constructionAgeBand = constructionAgeBand;
    }

    public static fromEpcResponse(epcResponse: EpcResponse): Epc {
        // NB The data quality is mixed. Any field that
        // we use should be escaped/parsed appropriately and we
        // should be able to deal with a missing or bad field.
        return new Epc(
            epcResponse['lmk-key'],
            epcResponse['address1'],
            epcResponse['address2'],
            epcResponse['address3'],
            epcResponse['postcode'],
            epcResponse['building-reference-number'],
            EpcRating[epcResponse['current-energy-rating']],
            epcResponse['potential-energy-rating'],
            epcResponse['current-energy-efficiency'],
            epcResponse['potential-energy-efficiency'],
            epcResponse['property-type'].toLowerCase(),
            epcResponse['built-form'].toLowerCase(),
            epcResponse['inspection-date'],
            epcResponse['local-authority'],
            epcResponse['constituency'],
            epcResponse['county'],
            new Date(epcResponse['lodgement-date']),
            epcResponse['transaction-type'],
            epcResponse['environment-impact-current'],
            epcResponse['environment-impact-potential'],
            epcResponse['energy-consumption-current'],
            epcResponse['energy-consumption-potential'],
            epcResponse['co2-emissions-current'],
            epcResponse['co2-emiss-curr-per-floor-area'],
            epcResponse['co2-emissions-potential'],
            epcResponse['lighting-cost-current'],
            epcResponse['lighting-cost-potential'],
            epcResponse['heating-cost-current'],
            epcResponse['heating-cost-potential'],
            epcResponse['hot-water-cost-current'],
            epcResponse['hot-water-cost-potential'],
            epcResponse['total-floor-area'],
            epcResponse['energy-tariff'],
            Epc.getParsedBooleanFromEpcResponseValue(epcResponse['mains-gas-flag']),
            Epc.getParsedFloorLevel(epcResponse['floor-level']),
            Epc.getParsedBooleanFromEpcResponseValue(epcResponse['flat-top-storey']),
            epcResponse['flat-storey-count'],
            epcResponse['main-heating-controls'],
            epcResponse['multi-glaze-proportion'],
            epcResponse['glazed-type'],
            epcResponse['glazed-area'],
            epcResponse['extension-count'],
            Epc.getParsedIntegerOrNull(epcResponse['number-habitable-rooms']),
            epcResponse['number-heated-rooms'],
            epcResponse['low-energy-lighting'],
            epcResponse['number-open-fireplaces'],
            epcResponse['hotwater-description'].toLowerCase(),
            epcResponse['hot-water-energy-eff'],
            epcResponse['hot-water-env-eff'],
            epcResponse['floor-description'],
            epcResponse['floor-energy-eff'],
            epcResponse['floor-env-eff'],
            epcResponse['windows-description'],
            epcResponse['windows-energy-eff'],
            epcResponse['windows-env-eff'],
            epcResponse['walls-description'],
            epcResponse['walls-energy-eff'],
            epcResponse['walls-env-eff'],
            epcResponse['secondheat-description'],
            epcResponse['sheating-energy-eff'],
            epcResponse['sheating-env-eff'],
            epcResponse['roof-description'],
            epcResponse['roof-energy-eff'],
            epcResponse['roof-env-eff'],
            (epcResponse['mainheat-description'] === Epc.MAIN_HEAT_DESCRIPTION_EMPTY_RESPONSE) ?
                null : epcResponse['mainheat-description'].toLowerCase(),
            epcResponse['mainheat-energy-eff'],
            epcResponse['mainheat-env-eff'],
            epcResponse['mainheatcont-description'],
            epcResponse['mainheatc-energy-eff'],
            epcResponse['mainheatc-env-eff'],
            epcResponse['lighting-description'],
            epcResponse['lighting-energy-eff'],
            epcResponse['lighting-env-eff'],
            epcResponse['main-fuel'].toLowerCase(),
            epcResponse['wind-turbine-count'],
            epcResponse['heat-loss-corridoor'],
            epcResponse['unheated-corridor-length'],
            epcResponse['floor-height'],
            epcResponse['photo-supply'],
            epcResponse['solar-water-heating-flag'],
            epcResponse['mechanical-ventilation'],
            epcResponse['address'],
            epcResponse['local-authority-label'],
            epcResponse['constituency-label'],
            epcResponse['certificate-hash'],
            Epc.getParsedConstructionAgeBand(epcResponse['construction-age-band']),
        );
    }

    public static clone(epc: Epc): Epc {
        return new Epc(
            epc.lmkKey,
            epc.address1,
            epc.address2,
            epc.address3,
            epc.postcode,
            epc.buildingReferenceNumber,
            epc.currentEnergyRating,
            epc.potentialEnergyRating,
            epc.currentEnergyEfficiency,
            epc.potentialEnergyEfficiency,
            epc.propertyType,
            epc.builtForm,
            epc.inspectionDate,
            epc.localAuthorityCode,
            epc.constituency,
            epc.county,
            epc.epcDate,
            epc.transactionType,
            epc.environmentImpactCurrent,
            epc.environmentImpactPotential,
            epc.energyConsumptionCurrent,
            epc.energyConsumptionPotential,
            epc.co2EmissionsCurrent,
            epc.co2EmissCurrPerFloorArea,
            epc.co2EmissionsPotential,
            epc.lightingCostCurrent,
            epc.lightingCostPotential,
            epc.heatingCostCurrent,
            epc.heatingCostPotential,
            epc.hotWaterCostCurrent,
            epc.hotWaterCostPotential,
            epc.totalFloorArea,
            epc.energyTariff,
            epc.isConnectedToMainsGas,
            epc.floorLevel,
            epc.flatTopStorey,
            epc.flatStoreyCount,
            epc.mainHeatingControls,
            epc.multiGlazeProportion,
            epc.glazedType,
            epc.glazedArea,
            epc.extensionCount,
            epc.numberHabitableRooms,
            epc.numberHeatedRooms,
            epc.lowEnergyLighting,
            epc.numberOpenFireplaces,
            epc.hotWaterDescription,
            epc.hotWaterEnergyEff,
            epc.hotWaterEnvEff,
            epc.floorDescription,
            epc.floorEnergyEff,
            epc.floorEnvEff,
            epc.windowsDescription,
            epc.windowsEnergyEff,
            epc.windowsEnvEff,
            epc.wallsDescription,
            epc.wallsEnergyEff,
            epc.wallsEnvEff,
            epc.secondHeatDescription,
            epc.sheatingEnergyEff,
            epc.sheatingEnvEff,
            epc.roofDescription,
            epc.roofEnergyEff,
            epc.roofEnvEff,
            epc.mainheatDescription,
            epc.mainheatEnergyEff,
            epc.mainheatEnvEff,
            epc.mainheatcontDescription,
            epc.mainheatcEnergyEff,
            epc.mainheatcEnvEff,
            epc.lightingDescription,
            epc.lightingEnergyEff,
            epc.lightingEnvEff,
            epc.mainFuel,
            epc.windTurbineCount,
            epc.heatLossCorridor,
            epc.unheatedCorridorLength,
            epc.floorHeight,
            epc.photoSupply,
            epc.solarWaterHeatingFlag,
            epc.mechanicalVentilation,
            epc.address,
            epc.localAuthorityLabel,
            epc.constituencyLabel,
            epc.certificateHash,
            epc.constructionAgeBand
        );
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
            case ("2007 onwards"): {
                return HomeAge.from2007toPresent;
            }
            default:
                return null;
        }
    }
}
