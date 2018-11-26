import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {EpcRating} from '../../../shared/postcode-epc-service/model/epc-rating';
import {getHomeTypeDescription, getHomeTypeFromEpc, HomeType} from '../home-type-question/home-type';
import {EpcConfirmation} from './epc-confirmation';
import {FuelType, getFuelTypeDescription, getFuelTypeFromEpc} from '../fuel-type-question/fuel-type';
import {
    ElectricityTariff,
    getElectricityTariffDescription,
    getElectricityTariffFromEpc
} from '../electricity-tariff-question/electricity-tariff';
import {Epc} from "../../../shared/postcode-epc-service/model/epc";

interface EpcMetadata {
    averageEnergyCost: number;
    colorCircleClassName: string;
    adjective: string;
}

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
    homeTypeDescription: string;
    numberHabitableRooms: number;
    localAuthorityDescription: string;
    fuelType: FuelType;
    fuelTypeDescription: string;
    electricityTariff: ElectricityTariff;
    electricityTariffDescription: string;
    savingsPerYear: number;
    epcFormattedDate: string;

    private static readonly EPC_METADATA: { [epcRating: number]: EpcMetadata } = {
        [EpcRating.A]: {averageEnergyCost: 700, colorCircleClassName: 'green', adjective: 'very good'},
        [EpcRating.B]: {averageEnergyCost: 700, colorCircleClassName: 'green', adjective: 'better than average'},
        [EpcRating.C]: {averageEnergyCost: 1000, colorCircleClassName: 'green', adjective: 'better than average'},
        [EpcRating.D]: {averageEnergyCost: 1400, colorCircleClassName: 'amber', adjective: 'around average'},
        [EpcRating.E]: {averageEnergyCost: 1650, colorCircleClassName: 'amber', adjective: 'below average'},
        [EpcRating.F]: {averageEnergyCost: 2200, colorCircleClassName: 'red', adjective: 'below average'},
        [EpcRating.G]: {averageEnergyCost: 2850, colorCircleClassName: 'red', adjective: 'poor'}
    };

    static getEpcRatingRelativeDescription(epcRating: EpcRating): string {
        return `This means the efficiency of your home is ${ConfirmEpcQuestionComponent.EPC_METADATA[epcRating].adjective}`;
    }

    get responseForAnalytics(): string {
        return this.responseData.confirmEpc ? 'EPC data confirmed' : 'EPC data rejected';
    }

    ngOnInit() {
        this.getDetailsFromResponseData();
    }

    getEpcMetadata(epcRating: EpcRating): EpcMetadata {
        return ConfirmEpcQuestionComponent.EPC_METADATA[epcRating];
    }

    get response(): EpcConfirmation {
        const epcConfirmation = {
            confirmed: this.responseData.confirmEpc,
            fuelType: this.responseData.fuelType,
            electricityTariff: this.responseData.electricityTariff
        };
        return epcConfirmation.confirmed === undefined ? undefined : epcConfirmation;
    }

    set response(val: EpcConfirmation) {
        this.responseData.confirmEpc = val.confirmed;
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

        this.homeType = getHomeTypeFromEpc(epc);
        this.homeTypeDescription = getHomeTypeDescription(this.homeType);

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

    private static getFormattedDateFromEpc(epc: Epc): string {
        const epcDate = moment(epc.epcDate);
        return epcDate.format('MMM YYYY');
    }
}
