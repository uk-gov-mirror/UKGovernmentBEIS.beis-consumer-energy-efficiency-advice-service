import {Component, OnInit} from "@angular/core";
import {UserJourneyType} from "../shared/response-data/user-journey-type";
import {ResponseData} from "../shared/response-data/response-data";
import {Router} from "@angular/router";
import {QuestionnaireService} from "../questionnaire/questionnaire.service";
import {PageService} from "../page/page.service";
import {Page} from "../page/page";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    demoPage: Page;

    constructor(private responseData: ResponseData,
                private questionnaireService: QuestionnaireService,
                private pageService: PageService,
                private router: Router) {
    }

    ngOnInit() {
        // TODO: Remove demo code
        this.pageService.getPage('draughtproof-all-windows-and-doors')
            .subscribe(page => this.demoPage = page)
    }

    onEnergyCalculatorButtonClick() {
        this.responseData.userJourneyType = UserJourneyType.Calculator;
        const route = this.questionnaireService.isComplete('home-basics') ? '/js/energy-efficiency/results' : '/js/energy-efficiency/questionnaire/home-basics';
        this.router.navigate([route]);
    }

    onBoilerButtonClick() {
        this.responseData.userJourneyType = UserJourneyType.Boiler;
        this.router.navigate(['/js/boiler']);
    }

    onGrantsButtonClick() {
        this.responseData.userJourneyType = UserJourneyType.Grants;
        this.router.navigate(['/js/grants']);
    }
}