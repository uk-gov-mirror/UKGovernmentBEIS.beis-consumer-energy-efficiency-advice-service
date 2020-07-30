export interface InstallerResponse {
    paginator: InstallerPaginator;
    errorMessage: string;
    data: Installer[];
}

export interface InstallerPaginator {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}

export interface Installer {
    id: number;
    trustMarkLicenseNumber: number;
    registeredName: string;
    publicBranchUrl: string;
    description: string;
    logoUrl: string;
    webAddress: string;
    address1: string;
    address2: string;
    town: string;
    county: string;
    country: string;
    longitude: number;
    latitude: number;
    distance: number;
    distanceInMiles: number;
    phoneNumber: string;
    email: string;
}
