import {Component, OnInit} from "@angular/core";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {EpcRating} from "../../../shared/postcode-epc-service/model/epc-rating";
import {getHomeTypeDescription, getHomeTypeFromEpc, HomeType} from "../home-type-question/home-type";
import {EpcConfirmation} from "./epc-confirmation";
import {FuelType, getFuelTypeDescription, getFuelTypeFromEpc} from "../fuel-type-question/fuel-type";
import {
    ElectricityTariff,
    getElectricityTariffDescription,
    getElectricityTariffFromEpc
} from "../electricity-tariff-question/electricity-tariff";

@Component({
    selector: 'confirm-epc',
    templateUrl: './confirm-epc-question.component.html',
    styleUrls: ['./confirm-epc-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class ConfirmEpcQuestionComponent extends QuestionBaseComponent implements OnInit {

    private static readonly AVERAGE_EPC_RATING: EpcRating = EpcRating.D;

    private static readonly AVERAGE_ENERGY_COSTS: { [epcRating: number]: number } = {
        [EpcRating.A]: 700,
        [EpcRating.B]: 700,
        [EpcRating.C]: 1000,
        [EpcRating.D]: 1400,
        [EpcRating.E]: 1650,
        [EpcRating.F]: 2200,
        [EpcRating.G]: 2850
    };

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

    get responseForAnalytics(): string {
        return this.responseData.confirmEpc ? 'EPC data confirmed' : 'EPC data rejected';
    };

    ngOnInit() {
        this.getDetailsFromResponseData();
    }

    get averageEpcRating(): EpcRating {
        return ConfirmEpcQuestionComponent.AVERAGE_EPC_RATING;
    }

    get epcRatingWorseThanAverage(): boolean {
        return this.epcRating > ConfirmEpcQuestionComponent.AVERAGE_EPC_RATING;
    }

    getAverageEnergyCost(epcRating: EpcRating): number {
        return ConfirmEpcQuestionComponent.AVERAGE_ENERGY_COSTS[epcRating];
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
        this.homeTypeDescription = getHomeTypeDescription(this.homeType);

        this.fuelType = (this.response && this.response.fuelType) || getFuelTypeFromEpc(epc);
        this.fuelTypeDescription = getFuelTypeDescription(this.fuelType);

        this.electricityTariff = (this.response && this.response.electricityTariff) || getElectricityTariffFromEpc(epc);
        this.electricityTariffDescription = getElectricityTariffDescription(this.electricityTariff);

        this.numberHabitableRooms = epc.numberHabitableRooms;
        this.localAuthorityDescription = epc.localAuthorityLabel;
    }

    confirmEpcDetails() {
        // TODO: Think about what to do on confirmation/rejection of EPC
        // For now we just autopopulate future questions based on data in the EPC, and we do this whether the user
        // confirms or rejects the data.
        this.response = {
            confirmed: true,
            homeType: this.homeType,
            fuelType: this.fuelType,
            electricityTariff: this.electricityTariff
        };
        this.complete.emit();
    }

    rejectEpcDetails() {
        this.confirmEpcDetails();
    }

    static getEpcRatingRelativeDescription(epcRating: EpcRating): string {
        if (epcRating === ConfirmEpcQuestionComponent.AVERAGE_EPC_RATING) {
            return 'This means your home\'s efficiency is about average.'
        }
        const comparatorAdjective = epcRating < ConfirmEpcQuestionComponent.AVERAGE_EPC_RATING ? 'high' : 'low';
        return `This means your home is relatively ${ comparatorAdjective } efficiency.`
    }
}
