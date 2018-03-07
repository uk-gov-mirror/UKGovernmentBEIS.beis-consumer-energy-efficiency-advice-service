export interface IncomeThresholdResponse {
    slug: string;
    acf: {
        single_claim_zero_children: string;
        single_claim_one_child: string;
        single_claim_two_children: string;
        single_claim_three_children: string;
        single_claim_four_plus_children: string;
        joint_claim_zero_children: string;
        joint_claim_one_child: string;
        joint_claim_two_children: string;
        joint_claim_three_children: string;
        joint_claim_four_plus_children: string;
    };
}
