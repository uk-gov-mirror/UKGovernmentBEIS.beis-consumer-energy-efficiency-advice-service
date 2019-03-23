import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";

export class EnergyEfficiencyRecommendations {

    constructor(public userRecommendations: EnergyEfficiencyRecommendation[] = [],
                public landlordRecommendations: EnergyEfficiencyRecommendation[] = []) {
    }

    public hasRecommendations() {
        return this.userRecommendations.length !== 0 || this.landlordRecommendations.length !== 0;
    }
}
