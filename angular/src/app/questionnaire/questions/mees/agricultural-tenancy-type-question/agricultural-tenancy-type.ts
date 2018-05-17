export enum AgriculturalTenancyType {
    AssuredTenancy,
    ProtectedOccupancy,
    StatutoryTenancy,
    Other,
}

export function getAgriculturalTenancyTypeTitle(type: AgriculturalTenancyType): string {
    switch (type) {
        case AgriculturalTenancyType.AssuredTenancy:
            return 'Assured agricultural occupancy';
        case AgriculturalTenancyType.ProtectedOccupancy:
            return 'Protected occupancy';
        case AgriculturalTenancyType.StatutoryTenancy:
            return 'Statutory tenancy';
        case AgriculturalTenancyType.Other:
            return 'Other';
        default:
            return null;
    }
}

export function getAgriculturalTenancyTypeDescription(type: AgriculturalTenancyType): string {
    switch (type) {
        case AgriculturalTenancyType.AssuredTenancy:
            return 'Housing Act 1988, section 24';
        case AgriculturalTenancyType.ProtectedOccupancy:
            return 'Rent (Agriculture) Act 1976, section 3(6)';
        case AgriculturalTenancyType.StatutoryTenancy:
            return 'Rent (Agriculture) Act 1976, section 4(6)';
        default:
            return null;
    }
}
