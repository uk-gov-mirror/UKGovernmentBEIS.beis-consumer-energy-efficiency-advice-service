export enum TenancyStartDate {
    BeforeApril2018,
    AfterApril2018,
}

export function getDomesticTenancyStartDateDescription(type: TenancyStartDate): string {
    switch (type) {
        case TenancyStartDate.BeforeApril2018:
            return 'Before 1 April 2018';
        case TenancyStartDate.AfterApril2018:
            return 'On or after 1 April 2018';
        default:
            return null;
    }
}
