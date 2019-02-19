import {IncomeThresholdResponse} from './income-threshold-response';

export type IncomeThresholdName = 'child-benefits';
export type IncomeThresholds = {[K in IncomeThresholdName]?: IncomeThreshold};

export class IncomeThreshold {
    public singleClaim: IncomeThresholdByChildren;
    public jointClaim: IncomeThresholdByChildren;

    constructor(incomeThresholdResponse: IncomeThresholdResponse) {
        this.singleClaim = {
            zeroChildren:       parseInt(incomeThresholdResponse.acf.single_claim_zero_children),
            oneChild:           parseInt(incomeThresholdResponse.acf.single_claim_one_child),
            twoChildren:        parseInt(incomeThresholdResponse.acf.single_claim_two_children),
            threeChildren:      parseInt(incomeThresholdResponse.acf.single_claim_three_children),
            fourPlusChildren:   parseInt(incomeThresholdResponse.acf.single_claim_four_plus_children),
        };
        this.jointClaim = {
            zeroChildren:       parseInt(incomeThresholdResponse.acf.joint_claim_zero_children),
            oneChild:           parseInt(incomeThresholdResponse.acf.joint_claim_one_child),
            twoChildren:        parseInt(incomeThresholdResponse.acf.joint_claim_two_children),
            threeChildren:      parseInt(incomeThresholdResponse.acf.joint_claim_three_children),
            fourPlusChildren:   parseInt(incomeThresholdResponse.acf.joint_claim_four_plus_children),
        };
    }
}

export interface IncomeThresholdByChildren {
    zeroChildren: number;
    oneChild: number;
    twoChildren: number;
    threeChildren: number;
    fourPlusChildren: number;
}

export function incomeThresholdsFromResponses(incomeThresholdResponses: IncomeThresholdResponse[]): IncomeThresholds {
    const incomeThresholds = {};
    incomeThresholdResponses.forEach((response: IncomeThresholdResponse) => {
        incomeThresholds[response.slug] = new IncomeThreshold(response);
    });
    return incomeThresholds;
}
