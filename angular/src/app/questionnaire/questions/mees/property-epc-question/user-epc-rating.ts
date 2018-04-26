export enum UserEpcRating {
    AtLeastE,
    BelowE,
    NoRating,
    DontKnow,
}

export function getUserEpcRatingDescription(rating: UserEpcRating): string {
    switch (rating) {
        case UserEpcRating.AtLeastE:
            return 'A - E';
        case UserEpcRating.BelowE:
            return 'F or G';
        case UserEpcRating.NoRating:
            return 'No EPC rating';
        case UserEpcRating.DontKnow:
            return 'Look it up';
        default:
            return null;
    }
}
