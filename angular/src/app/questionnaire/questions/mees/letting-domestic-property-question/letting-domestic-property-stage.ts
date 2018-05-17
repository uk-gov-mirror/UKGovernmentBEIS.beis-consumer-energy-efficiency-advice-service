export enum LettingDomesticPropertyStage {
    Currently,
    Soon,
}

export function getLettingDomesticPropertyStageDescription(type: LettingDomesticPropertyStage): string {
    switch (type) {
        case LettingDomesticPropertyStage.Currently:
            return 'Currently letting a property';
        case LettingDomesticPropertyStage.Soon:
            return 'Planning on letting a property';
        default:
            return null;
    }
}
