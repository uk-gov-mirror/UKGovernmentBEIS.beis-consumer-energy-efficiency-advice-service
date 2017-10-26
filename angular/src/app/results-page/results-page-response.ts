import {EnergyCalculationResponse} from '../common/energy-calculation-api-service/response/energy-calculation-response';
import {LocalAuthorityResponse} from './local-authority-service/local-authority-response';

export class ResultsPageResponse {
    constructor(
        public energyCalculation: EnergyCalculationResponse,
        public localAuthority: LocalAuthorityResponse
    ) {}
}