export enum UserJourneyType {
    Calculator,
    ReduceEnergyBills,
    MakeHomeWarmer,
    PlanHomeImprovements,
    MakeHomeGreener,
    Boiler,
    Grants
}

export function getJourneyDescription(userJourneyType: UserJourneyType): string {
    switch (userJourneyType) {
        case UserJourneyType.MakeHomeGreener:       { return 'Make your home greener'; }
        case UserJourneyType.PlanHomeImprovements:  { return 'Plan home improvements'; }
        case UserJourneyType.ReduceEnergyBills:     { return 'Reduce your energy bills'; }
        case UserJourneyType.MakeHomeWarmer:        { return 'Make your home warmer'; }
        default:                                    { return null; }
    }
}