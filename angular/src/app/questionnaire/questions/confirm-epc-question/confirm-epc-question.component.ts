import {Component} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from '../question.component';
import {Epc} from '../postcode-epc-question/model/epc';
import {ResponseData} from '../response-data';
import {EpcRating} from '../postcode-epc-question/model/epc-rating';

@Component({
    selector: 'confirm-epc',
    templateUrl: './confirm-epc-question.component.html',
    styleUrls: ['./confirm-epc-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ConfirmEpcQuestionComponent extends QuestionBaseComponent<void> {

    static readonly AVERAGE_EPC_RATING = 'D';

    isEpcAvailable: boolean;
    epcRating: string;
    epcRatingRelativeDescription: string;
    propertyType: string;
    floorLevelDescription: string;
    numberHabitableRooms: number;
    mainHeatDescription: string;
    localAuthorityDescription: string;

    constructor(private responseData: ResponseData) {
        super();
    }

    ngOnInit() {
        this.getDetailsFromResponseData();
    }

    getDetailsFromResponseData() {
        const epc = this.responseData.epc;
        if (!epc) {
            this.isEpcAvailable = false;
            return;
        }
        this.isEpcAvailable = true;
        this.epcRating = EpcRating[epc.currentEnergyRating];
        this.epcRatingRelativeDescription = ConfirmEpcQuestionComponent.getEpcRatingRelativeDescription(this.epcRating);
        this.propertyType = epc.propertyType.toLowerCase();
        this.floorLevelDescription = ConfirmEpcQuestionComponent.getFloorLevelDescription(epc.floorLevel);
        this.numberHabitableRooms = epc.numberHabitableRooms;
        this.mainHeatDescription = epc.mainHeatDescription;
        this.localAuthorityDescription = epc.localAuthorityLabel;
    }

    getAverageEpcRating(): string {
        return ConfirmEpcQuestionComponent.AVERAGE_EPC_RATING;
    }

    static getEpcRatingRelativeDescription(epcRating: string): string {
        const comparatorAdjective = epcRating < ConfirmEpcQuestionComponent.AVERAGE_EPC_RATING ? 'high' : 'low';
        return 'This means your home is relatively ' + comparatorAdjective + ' efficiency.'
    }

    static getFloorLevelDescription(floorLevel: number): string {
        if (floorLevel === 0) {
            return 'ground';
        } else if (!floorLevel) {
            return null;
        } else {
            return ConfirmEpcQuestionComponent.getOrdinal(floorLevel);
        }
    }

    static getOrdinal(n: number): string {
        const ordinalSuffixes: string[] = ["th","st","nd","rd"];
        const lastTwoDigits: number = n % 100;
        if (lastTwoDigits < 4) {
            return n + ordinalSuffixes[lastTwoDigits];
        } else if (lastTwoDigits < 20) {
            return n + ordinalSuffixes[0];
        } else {
            return n + ordinalSuffixes[lastTwoDigits % 10];
        }
    }
}
