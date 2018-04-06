export enum TenancyType {
    AssuredTenancy,
    RegulatedTenancy,
    DomesticAgriculturalTenancy,
    Other
}

export function getTenancyTypeDescription(tenancyType: TenancyType): string {
    switch (tenancyType) {
        case TenancyType.AssuredTenancy:
            return 'Assured Tenancy (including Assured Shorthold)';
        case TenancyType.RegulatedTenancy:
            return 'Regulated Tenancy';
        case TenancyType.DomesticAgriculturalTenancy:
            return 'Domestic Agricultural Tenancy';
        case TenancyType.Other:
            return 'Other';
        default:
            return null;
    }
}
