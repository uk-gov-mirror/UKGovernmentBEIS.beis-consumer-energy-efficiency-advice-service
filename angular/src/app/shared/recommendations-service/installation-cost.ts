export interface InstallationCost {
    estimatedInvestment?: number;
    installationCostRange?: Range;
}

interface Range {
    max: number;
    min: number;
}
