export enum LettingDomesticPropertyStage {
    BeforeApril2018,
    AfterApril2018,
    InProcess,
}

export function getLettingDomesticPropertyStageDescription(type: LettingDomesticPropertyStage): string {
    switch (type) {
        case LettingDomesticPropertyStage.BeforeApril2018:
            return 'Currently letting a property on a tenancy entered into before 1 April 2018';
        case LettingDomesticPropertyStage.AfterApril2018:
            return 'Currently letting a property on a tenancy entered into after 1 April 2018';
        case LettingDomesticPropertyStage.InProcess:
            return 'I will soon be letting a domestic property';
        default:
            return null;
    }
}
