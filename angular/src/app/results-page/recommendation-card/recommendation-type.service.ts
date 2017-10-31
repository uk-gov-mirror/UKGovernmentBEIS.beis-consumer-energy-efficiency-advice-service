export abstract class RecommendationTypeService {
    public static recommendationTypes: { [recommendationTypeCode: string]: RecommendationType } = {
        A:  {iconClassName: 'icon-roofing', description: 'Loft insulation'},
        A2: {iconClassName: 'icon-roofing', description: 'Flat roof insulation'},
        A3: {iconClassName: 'icon-roofing', description: 'Room-in-roof insulation'},
        B:  {iconClassName: 'icon-walls',   description: 'Cavity wall insulation'},
        Q2: {iconClassName: 'icon-walls',   description: 'Cavity fill and solid wall insulation'},
        B4: {iconClassName: 'icon-walls',   description: 'Party wall insulation'},
        Q:  {iconClassName: 'icon-walls',   description: 'Wall insulation brick age band A-D'},
        Q1: {iconClassName: 'icon-walls',   description: 'Wall insulation other'},
        W1: {iconClassName: 'icon-walls',   description: 'Floor insulation suspended floor'},
        W2: {iconClassName: 'icon-walls',   description: 'Floor insulation solid floor'},
        D:  {iconClassName: 'icon-windows', description: 'Draughtproof all windows and doors'},
        E2: {iconClassName: 'icon-home',    description: 'Energy efficient luminaires'},
        C:  {iconClassName: 'icon-heating', description: 'Hot water cylinder insulation'},
        F:  {iconClassName: 'icon-heating', description: 'Hot water cylinder thermostat'},
        G:  {iconClassName: 'icon-heating', description: 'Heating controls (wet system)'},
        H:  {iconClassName: 'icon-heating', description: 'Heating controls (warm air system)'},
        I:  {iconClassName: 'icon-heating', description: 'Replacement condensing boiler'},
        S:  {iconClassName: 'icon-heating', description: 'Condensing gas boiler (no fuel switch)'},
        T:  {iconClassName: 'icon-heating', description: 'Condensing gas boiler (fuel switch)'},
        T2: {iconClassName: 'icon-heating', description: 'Flue gas heat recovery device in conjunction with boiler'},
        R:  {iconClassName: 'icon-heating', description: 'Condensing oil boiler'},
        J:  {iconClassName: 'icon-heating', description: 'Wood logs boiler'},
        K:  {iconClassName: 'icon-heating', description: 'Wood pellets boiler'},
        L:  {iconClassName: 'icon-heating', description: 'Fan assisted storage heaters'},
        L2: {iconClassName: 'icon-heating', description: 'High heat retention storage heaters'},
        M:  {iconClassName: 'icon-heating', description: 'Gas-fired warm air heating'},
        Z1: {iconClassName: 'icon-heating', description: 'Air source heat pump'},
        Z3: {iconClassName: 'icon-heating', description: 'Micro CHP'},
        Z4: {iconClassName: 'icon-heating', description: 'Ground source heat pump'},
        EP: {iconClassName: 'icon-heating', description: 'Circulation pump'},
        N:  {iconClassName: 'icon-heating', description: 'Solar water heating'},
        Y:  {iconClassName: 'icon-heating', description: 'Heat recovery system for mixer showers'},
        Y2: {iconClassName: 'icon-heating', description: 'Storage waster water heat recovery'},
        O:  {iconClassName: 'icon-windows', description: 'Replace single-glazed windows with low E double glazing'},
        O2: {iconClassName: 'icon-windows', description: 'Triple glazed windows'},
        O3: {iconClassName: 'icon-windows', description: 'Glazing replacement'},
        P:  {iconClassName: 'icon-windows', description: 'Secondary glazing to single glazed windows'},
        X:  {iconClassName: 'icon-doors',   description: 'High performance external doors'},
        U:  {iconClassName: 'icon-home',    description: 'Solar photovoltaic panels'},
        V2: {iconClassName: 'icon-home',    description: 'Wind turbine on mast'}
    };
}

export interface RecommendationType {
    iconClassName: string;
    description: string;
}