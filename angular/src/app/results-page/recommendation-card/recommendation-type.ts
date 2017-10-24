import * as _ from 'lodash';

export enum RecommendationType {
    LoftInsulation,
    FlatRoofInsulation,
    RoomInRoofInsulation,
    CavityWallInsulation,
    CavityFillAndSolidWallInsulation,
    PartyWallInsulation,
    WallInsulationBrickAgeBandA_D,
    WallInsulationOther,
    FloorInsulationSuspendedFloor,
    FloorInsulationSolidFloor,
    DraughtproofAllWindowsAndDoors,
    EnergyEfficientLuminaires,
    HotWaterCylinderInsulation,
    HotWaterCylinderThermostat,
    HeatingControlsWetSystem,
    HeatingControlsWarmAirSystem,
    ReplacementCondensingBoiler,
    CondensingGasBoilerNoFuelSwitch,
    CondensingGasBoilerFuelSwitch,
    FlueGasHeatRecoveryDeviceWithBoiler,
    CondensingOilBoiler,
    WoodLogsBoiler,
    WoodPelletsBoiler,
    FanAssistedStorageHeaters,
    HighHeatRetentionStorageHeaters,
    GasFiredWarmAirHeating,
    AirSourceHeatPump,
    MicroCHP,
    GroundSourceHeatPump,
    CirculationPump,
    SolarWaterHeating,
    HeatRecoverySystemForMixerShowers,
    StorageWasterWaterHeatRecovery,
    LowEDoubleGlazing,
    TripleGlazedWindows,
    GlazingReplacement,
    SecondaryGlazingToSingleGlazedWindows,
    HighPerformanceExternalDoors,
    SolarPhotovoltaicPanels,
    WindTurbineOnMast
}

export function getRecommendationTypeFromCode(code: string): RecommendationType {
    const matchingTypes: RecommendationType[] = _.values(RecommendationType)
        .map(recommendationType => parseInt(recommendationType))
        .filter(recommendationType => !isNaN(recommendationType))
        .filter(recommendationType => getRecommendationTypeDetails(recommendationType).code === code);
    return _.head(matchingTypes);
}

export function getIconClassName(recommendationType: RecommendationType): string {
    const recommendationTypeDetails = getRecommendationTypeDetails(recommendationType);
    return recommendationTypeDetails && recommendationTypeDetails.iconClassName;
}

export function getDescription(recommendationType: RecommendationType): string {
    const recommendationTypeDetails = getRecommendationTypeDetails(recommendationType);
    return recommendationTypeDetails && recommendationTypeDetails.description;
}

function getRecommendationTypeDetails(recommendationType: RecommendationType): RecommendationTypeDetails {
    switch(recommendationType) {
        case RecommendationType.LoftInsulation:                         { return new RecommendationTypeDetails('A',  'icon-roofing',  'Loft insulation'); }
        case RecommendationType.FlatRoofInsulation:                     { return new RecommendationTypeDetails('A2', 'icon-roofing',  'Flat roof insulation'); }
        case RecommendationType.RoomInRoofInsulation:                   { return new RecommendationTypeDetails('A3', 'icon-roofing',  'Room-in-roof insulation'); }
        case RecommendationType.CavityWallInsulation:                   { return new RecommendationTypeDetails('B',  'icon-walls',    'Cavity wall insulation'); }
        case RecommendationType.CavityFillAndSolidWallInsulation:       { return new RecommendationTypeDetails('Q2', 'icon-walls',    'Cavity fill and solid wall insulation'); }
        case RecommendationType.PartyWallInsulation:                    { return new RecommendationTypeDetails('B4', 'icon-walls',    'Party wall insulation'); }
        case RecommendationType.WallInsulationBrickAgeBandA_D:          { return new RecommendationTypeDetails('Q',  'icon-walls',    'Wall insulation brick age band A-D'); }
        case RecommendationType.WallInsulationOther:                    { return new RecommendationTypeDetails('Q1', 'icon-walls',    'Wall insulation other'); }
        case RecommendationType.FloorInsulationSuspendedFloor:          { return new RecommendationTypeDetails('W1', 'icon-flooring', 'Floor insulation suspended floor'); }
        case RecommendationType.FloorInsulationSolidFloor:              { return new RecommendationTypeDetails('W2', 'icon-flooring', 'Floor insulation solid floor'); }
        case RecommendationType.DraughtproofAllWindowsAndDoors:         { return new RecommendationTypeDetails('D',  'icon-windows',  'Draughtproof all windows and doors'); }
        case RecommendationType.EnergyEfficientLuminaires:              { return new RecommendationTypeDetails('E2', 'icon-home',     'Energy efficient luminaires'); }
        case RecommendationType.HotWaterCylinderInsulation:             { return new RecommendationTypeDetails('C',  'icon-heating',  'Hot water cylinder insulation'); }
        case RecommendationType.HotWaterCylinderThermostat:             { return new RecommendationTypeDetails('F',  'icon-heating',  'Hot water cylinder thermostat'); }
        case RecommendationType.HeatingControlsWetSystem:               { return new RecommendationTypeDetails('G',  'icon-heating',  'Heating controls wet system'); }
        case RecommendationType.HeatingControlsWarmAirSystem:           { return new RecommendationTypeDetails('H',  'icon-heating',  'Heating controls warm air system'); }
        case RecommendationType.ReplacementCondensingBoiler:            { return new RecommendationTypeDetails('I',  'icon-heating',  'Replacement condensing boiler'); }
        case RecommendationType.CondensingGasBoilerNoFuelSwitch:        { return new RecommendationTypeDetails('S',  'icon-heating',  'Condensing gas boiler (no fuel switch)'); }
        case RecommendationType.CondensingGasBoilerFuelSwitch:          { return new RecommendationTypeDetails('T',  'icon-heating',  'Condensing gas boiler (fuel switch)'); }
        case RecommendationType.FlueGasHeatRecoveryDeviceWithBoiler:    { return new RecommendationTypeDetails('T2', 'icon-heating',  'Flue gas heat recovery device in conjunction with boiler'); }
        case RecommendationType.CondensingOilBoiler:                    { return new RecommendationTypeDetails('R',  'icon-heating',  'Condensing oil boiler'); }
        case RecommendationType.WoodLogsBoiler:                         { return new RecommendationTypeDetails('J',  'icon-heating',  'Wood logs boiler'); }
        case RecommendationType.WoodPelletsBoiler:                      { return new RecommendationTypeDetails('K',  'icon-heating',  'Wood pellets boiler'); }
        case RecommendationType.FanAssistedStorageHeaters:              { return new RecommendationTypeDetails('L',  'icon-heating',  'Fan assisted storage heaters'); }
        case RecommendationType.HighHeatRetentionStorageHeaters:        { return new RecommendationTypeDetails('L2', 'icon-heating',  'High heat retention storage heaters'); }
        case RecommendationType.GasFiredWarmAirHeating:                 { return new RecommendationTypeDetails('M',  'icon-heating',  'Gas fired warm air heating'); }
        case RecommendationType.AirSourceHeatPump:                      { return new RecommendationTypeDetails('Z1', 'icon-heating',  'Air source heat pump'); }
        case RecommendationType.MicroCHP:                               { return new RecommendationTypeDetails('Z3', 'icon-heating',  'Micro CHP'); }
        case RecommendationType.GroundSourceHeatPump:                   { return new RecommendationTypeDetails('Z4', 'icon-heating',  'Ground source heat pump'); }
        case RecommendationType.CirculationPump:                        { return new RecommendationTypeDetails('EP', 'icon-heating',  'Circulation pump'); }
        case RecommendationType.SolarWaterHeating:                      { return new RecommendationTypeDetails('N',  'icon-heating',  'Solar water heating'); }
        case RecommendationType.HeatRecoverySystemForMixerShowers:      { return new RecommendationTypeDetails('Y',  'icon-heating',  'Heat recovery system for mixer showers'); }
        case RecommendationType.StorageWasterWaterHeatRecovery:         { return new RecommendationTypeDetails('Y2', 'icon-heating',  'Storage waster water heat recovery'); }
        case RecommendationType.LowEDoubleGlazing:                      { return new RecommendationTypeDetails('O',  'icon-windows',  'Replace single-glazed windows with low E double glazing'); }
        case RecommendationType.TripleGlazedWindows:                    { return new RecommendationTypeDetails('O2', 'icon-windows',  'Triple glazed windows'); }
        case RecommendationType.GlazingReplacement:                     { return new RecommendationTypeDetails('O3', 'icon-windows',  'Glazing replacement'); }
        case RecommendationType.SecondaryGlazingToSingleGlazedWindows:  { return new RecommendationTypeDetails('P',  'icon-windows',  'Secondary glazing to single glazed windows'); }
        case RecommendationType.HighPerformanceExternalDoors:           { return new RecommendationTypeDetails('X',  'icon-doors',    'High performance external doors'); }
        case RecommendationType.SolarPhotovoltaicPanels:                { return new RecommendationTypeDetails('U',  'icon-home',     'Solar photovoltaic panels'); }
        case RecommendationType.WindTurbineOnMast:                      { return new RecommendationTypeDetails('V2', 'icon-home',     'Wind turbine on mast'); }
        default:                                                        { return null; }
    }
}

class RecommendationTypeDetails {
    constructor(
        public code: string,
        public iconClassName: string,
        public description: string
    ) { }
}