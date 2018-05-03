export enum LettingDomesticPropertyStage {
    BeforeApril2018,
    AfterApril2018,
    InProcess,
    InPlanning
}

export function getLettingDomesticPropertyStageDescription(type: LettingDomesticPropertyStage): string {
    switch (type) {
        case LettingDomesticPropertyStage.BeforeApril2018:
            return 'Currently letting a property on a tenancy entered into before 1 April 2018';
        case LettingDomesticPropertyStage.AfterApril2018:
            return 'Currently letting a property on a tenancy entered into after 1 April 2018';
        case LettingDomesticPropertyStage.InProcess:
            return 'I\'m in the process of entering a tenancy for a domestic property';
        case LettingDomesticPropertyStage.InPlanning:
            return 'I\'m planning on letting a domestic property';
        default:
            return null;
    }
}
