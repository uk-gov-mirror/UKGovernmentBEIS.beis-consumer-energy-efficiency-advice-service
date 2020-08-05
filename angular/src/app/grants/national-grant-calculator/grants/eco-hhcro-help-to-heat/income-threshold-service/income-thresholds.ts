import {IncomeThresholdResponse} from './income-threshold-response';

export type IncomeThresholdName = 'child-benefits';
export type IncomeThresholds = {[K in IncomeThresholdName]?: IncomeThreshold};

export class IncomeThreshold {
    public singleClaim: IncomeThresholdByChildren;
    public jointClaim: IncomeThresholdByChildren;

    constructor(incomeThresholdResponse: IncomeThresholdResponse) {
        this.singleClaim = new IncomeThresholdByChildren(
            parseInt(incomeThresholdResponse.acf.single_claim_zero_children),
            parseInt(incomeThresholdResponse.acf.single_claim_one_child),
            parseInt(incomeThresholdResponse.acf.single_claim_two_children),
            parseInt(incomeThresholdResponse.acf.single_claim_three_children),
            parseInt(incomeThresholdResponse.acf.single_claim_four_plus_children)
        );
        this.jointClaim = new IncomeThresholdByChildren(
            parseInt(incomeThresholdResponse.acf.joint_claim_zero_children),
            parseInt(incomeThresholdResponse.acf.joint_claim_one_child),
            parseInt(incomeThresholdResponse.acf.joint_claim_two_children),
            parseInt(incomeThresholdResponse.acf.joint_claim_three_children),
            parseInt(incomeThresholdResponse.acf.joint_claim_four_plus_children)
        );
    }

    public getIncomeThresholdByChildren(numberOfAdults: number) {
        return numberOfAdults === 1
            ? this.singleClaim
            : this.jointClaim;
    }
}

export class IncomeThresholdByChildren {
    constructor(
        private zeroChildren: number,
        private oneChild: number,
        private twoChildren: number,
        private threeChildren: number,
        private fourPlusChildren: number
    ) {}

    public getIncomeThresholdValue(numberOfChildren: number): number {
        switch (numberOfChildren) {
            case 0: {
                return this.zeroChildren;
            }
            case 1: {
                return this.oneChild;
            }
            case 2: {
                return this.twoChildren;
            }
            case 3: {
                return this.threeChildren;
            }
            default: {
                return this.fourPlusChildren;
            }
        }
    }
}

export function incomeThresholdsFromResponses(incomeThresholdResponses: IncomeThresholdResponse[]): IncomeThresholds {
    const incomeThresholds = {};
    incomeThresholdResponses.forEach((response: IncomeThresholdResponse) => {
        incomeThresholds[response.slug] = new IncomeThreshold(response);
    });
    return incomeThresholds;
}
