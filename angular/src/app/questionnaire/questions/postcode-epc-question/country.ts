export enum Country {
    England,
    Scotland,
    Wales,
    NorthernIreland
}

export function parseCountry(country: string): Country {
    switch (country) {
        case 'England':
            return Country.England;
        case 'Scotland':
            return Country.Scotland;
        case 'Wales':
            return Country.Wales;
        case 'Northern Ireland':
            return Country.NorthernIreland;
        default:
            return undefined;
    }
}
