export enum LettingDomesticPropertyStage {
    Currently,
    Soon,
}

export function getLettingDomesticPropertyStageDescription(type: LettingDomesticPropertyStage): string {
    switch (type) {
        case LettingDomesticPropertyStage.Currently:
            return 'Currently letting a domestic property';
        case LettingDomesticPropertyStage.Soon:
            return 'Planning on letting a domestic property';
        default:
            return null;
    }
}
