/**
 * The UserJourneyType enum tracks which "journey" (questionnaire) the user
 * is in the process of completing.
 * The journeys have overlapping sections, so this is needed to direct the
 * flow of the user through the app as the current URL is not sufficient.
 *
 * This is stored in ResponseData.userJourneyType.
 * It is set in the LandingPageComponent and the HomePageComponent  .
 */
export enum UserJourneyType {
    // "home-basics" journeys. See HomeBasicsQuestionnaire.questionsForJourneyType
    ReduceEnergyBills,
    MakeHomeWarmer,
    PlanHomeImprovements,
    MakeHomeGreener,
    // other journeys:
    Boiler,
    Grants,
    GrantEligibility,
    GreenHomesGrant
}

/**
 * Used for the heading text on the landing page component
 */
export function getJourneyDescription(userJourneyType: UserJourneyType): string {
    switch (userJourneyType) {
        case UserJourneyType.MakeHomeGreener:       { return 'Make your home greener'; }
        case UserJourneyType.PlanHomeImprovements:  { return 'Plan home improvements'; }
        case UserJourneyType.ReduceEnergyBills:     { return 'Reduce your energy bills'; }
        case UserJourneyType.MakeHomeWarmer:        { return 'Make your home warmer'; }
        default:                                    { return null; }
    }
}
