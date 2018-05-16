export enum AgriculturalTenancyType {
    AssuredTenancy,
    ProtectedOccupancy,
    StatutoryTenancy,
    Other,
}

export function getAgriculturalTenancyTypeDescription(type: AgriculturalTenancyType): string {
    switch (type) {
        case AgriculturalTenancyType.AssuredTenancy:
            return 'Assured agricultural occupancy for the purposes of section 24 of the Housing Act 1988';
        case AgriculturalTenancyType.ProtectedOccupancy:
            return 'Protected occupancy for the purposes of section 3(6) of the Rent (Agriculture) Act 1976';
        case AgriculturalTenancyType.StatutoryTenancy:
            return 'A statutory tenancy for the purposes of section 4(6) of the Rent (Agriculture) Act 1976';
        case AgriculturalTenancyType.Other:
            return 'Other';
        default:
            return null;
    }
}
