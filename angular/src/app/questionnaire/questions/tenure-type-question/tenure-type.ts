// Keep in sync with PdfRecommendationParams.java
export enum TenureType {
    OwnerOccupancy,
    PrivateTenancy,
    SocialTenancy
}

export function isTenant(tenureType: TenureType | undefined) {
    return [TenureType.PrivateTenancy, TenureType.SocialTenancy].includes(tenureType);
}
