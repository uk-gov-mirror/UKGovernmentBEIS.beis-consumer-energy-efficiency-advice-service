import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {EpcRating} from '../../../shared/postcode-epc-service/model/epc-rating';
import {getHomeTypeFromEpc, HomeType} from '../home-type-question/home-type';
import {EpcConfirmation} from './epc-confirmation';
import {FuelType, getFuelTypeDescription, getFuelTypeFromEpc} from '../fuel-type-question/fuel-type';
import {
    ElectricityTariff,
    getElectricityTariffDescription,
    getElectricityTariffFromEpc
} from '../electricity-tariff-question/electricity-tariff';
import {Epc} from "../../../shared/postcode-epc-service/model/epc";
import {BuiltFormAnswer, getBuiltFormFromEpc} from "../built-form-question/built-form-answer";
import {getHomePropertyDescription} from "../../../shared/home-property-description-helper/home-property-description-helper";

@Component({
    selector: 'app-confirm-epc',
    templateUrl: './confirm-epc-question.component.html',
    styleUrls: ['./confirm-epc-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ConfirmEpcQuestionComponent extends QuestionBaseComponent implements OnInit {

    EpcRating = EpcRating;

    isEpcAvailable: boolean;
    epcRating: EpcRating;
    epcRatingRelativeDescription: string;
    homeType: HomeType;
    builtForm: BuiltFormAnswer;
    homeTypeDescription: string;
    numberHabitableRooms: number;
    localAuthorityDescription: string;
    fuelType: FuelType;
    fuelTypeDescription: string;
    electricityTariff: ElectricityTariff;
    electricityTariffDescription: string;
    savingsPerYear: number;
    epcFormattedDate: string | null;

    private static readonly EPC_DESCRIPTIONS: { [epcRating: number]: string } = {
        [EpcRating.A]: 'very good',
        [EpcRating.B]: 'better than average',
        [EpcRating.C]: 'better than average',
        [EpcRating.D]: 'around average',
        [EpcRating.E]: 'below average',
        [EpcRating.F]: 'below average',
        [EpcRating.G]: 'poor'
    };

    static getEpcRatingRelativeDescription(epcRating: EpcRating): string {
        const letter = EpcRating[epcRating];
        const description = ConfirmEpcQuestionComponent.EPC_DESCRIPTIONS[epcRating];
        return `Your home was given an energy rating of ${letter}, which is ${description}.`;
    }

    get responseForAnalytics(): string {
        return this.responseData.confirmEpc ? 'EPC data confirmed' : 'EPC data rejected';
    }

    ngOnInit() {
        this.getDetailsFromResponseData();
    }

    get response(): EpcConfirmation {
        const epcConfirmation = {
            confirmed: this.responseData.confirmEpc,
            homeType: this.responseData.homeType,
            fuelType: this.responseData.fuelType,
            electricityTariff: this.responseData.electricityTariff
        };
        return epcConfirmation.confirmed === undefined ? undefined : epcConfirmation;
    }

    set response(val: EpcConfirmation) {
        this.responseData.confirmEpc = val.confirmed;
        this.responseData.homeType = val.homeType;
        this.responseData.fuelType = val.fuelType;
        this.responseData.electricityTariff = val.electricityTariff;
    }

    getDetailsFromResponseData() {
        const epc = this.responseData.epc;
        if (!epc) {
            this.isEpcAvailable = false;
            return;
        }
        this.isEpcAvailable = true;

        this.epcRating = epc.currentEnergyRating;
        this.epcRatingRelativeDescription = ConfirmEpcQuestionComponent.getEpcRatingRelativeDescription(this.epcRating);

        this.homeType = (this.response && this.response.homeType) || getHomeTypeFromEpc(epc);
        this.builtForm = getBuiltFormFromEpc(epc);
        this.homeTypeDescription = getHomePropertyDescription(this.homeType, this.builtForm);

        this.fuelType = (this.response && this.response.fuelType) || getFuelTypeFromEpc(epc);
        this.fuelTypeDescription = getFuelTypeDescription(this.fuelType);

        this.electricityTariff = (this.response && this.response.electricityTariff) || getElectricityTariffFromEpc(epc);
        this.electricityTariffDescription = getElectricityTariffDescription(this.electricityTariff);

        this.numberHabitableRooms = epc.numberHabitableRooms;
        this.localAuthorityDescription = epc.localAuthorityLabel;

        this.savingsPerYear = ConfirmEpcQuestionComponent.getSavingsPerYearFromEpc(epc);
        this.epcFormattedDate = ConfirmEpcQuestionComponent.getFormattedDateFromEpc(epc);
    }

    confirmEpcDetails() {
        this.response = {
            confirmed: true,
            homeType: this.homeType,
            fuelType: this.fuelType,
            electricityTariff: this.electricityTariff
        };
        this.complete.emit();
    }

    private static getSavingsPerYearFromEpc(epc: Epc): number {
        let heatingSaving = 0;
        let hotWaterSaving = 0;
        let lightingSaving = 0;
        if (parseInt(epc.heatingCostCurrent) && parseInt(epc.heatingCostPotential)) {
            heatingSaving = parseInt(epc.heatingCostCurrent) - parseInt(epc.heatingCostPotential);
        }
        if (parseInt(epc.hotWaterCostCurrent) && parseInt(epc.hotWaterCostPotential)) {
            hotWaterSaving = parseInt(epc.hotWaterCostCurrent) - parseInt(epc.hotWaterCostPotential);
        }
        if (parseInt(epc.lightingCostCurrent) && parseInt(epc.lightingCostPotential)) {
            lightingSaving = parseInt(epc.lightingCostCurrent) - parseInt(epc.lightingCostPotential);
        }
        const totalSavings = heatingSaving + hotWaterSaving + lightingSaving;
        return Math.round(totalSavings / 10) * 10; // Round the result to the nearest 10
    }

    private static getFormattedDateFromEpc(epc: Epc): string | null {
        return epc.epcDate ? moment(epc.epcDate).format('MMMM YYYY') : null;
    }
}
