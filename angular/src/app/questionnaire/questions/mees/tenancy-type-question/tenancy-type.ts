export enum TenancyType {
    AssuredTenancy = 1,
    RegulatedTenancy = 2,
    AgriculturalTenancy = 3,
    Other = 4
}

export function getTenancyTypeDescription(tenancyType: TenancyType): string {
    switch (tenancyType) {
        case TenancyType.AssuredTenancy:
            return 'Assured Tenancy';
        case TenancyType.RegulatedTenancy:
            return 'Regulated Tenancy';
        case TenancyType.AgriculturalTenancy:
            return 'Agricultural Tenancy';
        case TenancyType.Other:
            return 'Other';
        default:
            return null;
    }
}
