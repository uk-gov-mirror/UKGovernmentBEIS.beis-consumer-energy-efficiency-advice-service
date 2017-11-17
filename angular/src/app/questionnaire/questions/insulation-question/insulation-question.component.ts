import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";
import {InsulationType} from "./insulation-type";
import {GlazingType} from "./glazing-type";

interface InsulationTypeOption {
    name: string;
    value: InsulationType;
}

@Component({
    selector: 'app-insulation-question',
    templateUrl: './insulation-question.component.html',
    styleUrls: ['./insulation-question.scss'],
    animations: [slideInOutAnimation]
})
export class InsulationQuestionComponent extends QuestionBaseComponent implements OnInit {
    insulationTypes: InsulationTypeOption[] = [
        {name: 'I don\'t know', value: InsulationType.DontKnow},
    ];

    ngOnInit() {
        this.roofInsulation = InsulationType.DontKnow;
        this.wallInsulation = InsulationType.DontKnow;
        this.floorInsulation = InsulationType.DontKnow;
        this.glazingType = GlazingType.DontKnow;
    }

    get roofInsulation(): InsulationType {
        return this.responseData.roofInsulationType;
    }

    set roofInsulation(val: InsulationType) {
        this.responseData.roofInsulationType = val;
    }

    get wallInsulation(): InsulationType {
        return this.responseData.wallInsulationType;
    }

    set wallInsulation(val: InsulationType) {
        this.responseData.wallInsulationType = val;
    }

    get floorInsulation(): InsulationType {
        return this.responseData.floorInsulationType;
    }

    set floorInsulation(val: InsulationType) {
        this.responseData.floorInsulationType = val;
    }

    get glazingType(): GlazingType {
        return this.responseData.glazingType;
    }

    set glazingType(val: GlazingType) {
        this.responseData.glazingType = val;
    }
}