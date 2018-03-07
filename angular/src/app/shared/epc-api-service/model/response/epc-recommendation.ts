import {EpcRecommendationResponse} from './epc-recommendation-response';
import includes from 'lodash-es/includes';

export class EpcRecommendation {
    public lmkKey: string;
    public improvementItem: string;
    public improvementSummaryText: string;
    public improvementDescrText: string;
    public improvementId: string;
    public improvementIdText: string;

    constructor(response: EpcRecommendationResponse) {
        this.lmkKey = response.LMK_KEY;
        this.improvementItem = response.IMPROVEMENT_ITEM;
        this.improvementSummaryText = response.IMPROVEMENT_SUMMARY_TEXT;
        this.improvementDescrText = response.IMPROVEMENT_DESCR_TEXT;
        this.improvementId = response.IMPROVEMENT_ID;
        this.improvementIdText = response.IMPROVEMENT_ID_TEXT;
    }

    isBoilerReplacement() {
        return this.improvementIdText && includes(this.improvementIdText.toLowerCase(), 'replace boiler');
    }
}
