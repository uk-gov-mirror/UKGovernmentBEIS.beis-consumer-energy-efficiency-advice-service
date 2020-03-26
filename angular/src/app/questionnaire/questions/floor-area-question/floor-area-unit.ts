export enum FloorAreaUnit {
    SquareMetre,
    SquareFoot
}

export function getBasicUnitDisplay(floorAreaUnit: FloorAreaUnit): string {
    switch (floorAreaUnit) {
        case FloorAreaUnit.SquareMetre:    { return 'square metres'; }
        case FloorAreaUnit.SquareFoot:     { return 'square feet'; }
    }
}
