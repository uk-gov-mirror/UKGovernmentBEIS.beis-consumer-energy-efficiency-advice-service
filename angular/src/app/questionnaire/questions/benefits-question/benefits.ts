// Enum flags to mark which benefits a user receives
export enum Benefits {
    None = 0,
    ESA = 1,
    JobseekersAllowance = 1 << 1,
    IncomeSupport = 1 << 2,
    PensionGuaranteeCredit = 1 << 3,
    TaxCredits = 1 << 4,
    UniversalCredit = 1 << 5
}
