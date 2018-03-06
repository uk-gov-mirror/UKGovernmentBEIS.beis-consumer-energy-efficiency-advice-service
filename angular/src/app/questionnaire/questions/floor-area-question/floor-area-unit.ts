export enum FloorAreaUnit {
    SquareMetre,
    SquareFoot
}

export function getBasicUnitDisplay(floorAreaUnit: FloorAreaUnit): string {
    switch (floorAreaUnit) {
        case FloorAreaUnit.SquareMetre:    { return 'm'; }
        case FloorAreaUnit.SquareFoot:     { return 'ft'; }
    }
}
