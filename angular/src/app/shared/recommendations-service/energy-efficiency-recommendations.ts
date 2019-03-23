import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";
import concat from 'lodash-es/concat';

export class EnergyEfficiencyRecommendations {

    constructor(public userRecommendations: EnergyEfficiencyRecommendation[] = [],
                public landlordRecommendations: EnergyEfficiencyRecommendation[] = []) {
    }

    public hasRecommendations(): boolean {
        return this.userRecommendations.length !== 0 || this.landlordRecommendations.length !== 0;
    }

    public getAll(): EnergyEfficiencyRecommendation[] {
        return concat(this.userRecommendations, this.landlordRecommendations);
    }
}
