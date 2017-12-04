import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {EnergySavingRecommendation} from "../../shared/recommendation-card/energy-saving-recommendation";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";

@Component({
    selector: 'app-boiler-measures-section',
    templateUrl: './boiler-measures-section.component.html',
    styleUrls: ['./boiler-measures-section.component.scss']
})
export class BoilerMeasuresSectionComponent {
    @Input() measures: EnergySavingRecommendation[];
    @Input() bodyText: string;

    constructor(private questionnaireService: QuestionnaireService,
                private router: Router) {
    }

    goToEnergyEfficiency() {
        const route = this.questionnaireService.isComplete('home-basics') ? '/js/energy-efficiency/results' : '/js/energy-efficiency/questionnaire/home-basics';
        this.router.navigate([route]);
    }
}
