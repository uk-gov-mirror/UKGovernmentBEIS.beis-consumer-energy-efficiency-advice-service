import {Component, OnInit} from '@angular/core';
import {UserJourneyType} from '../shared/response-data/user-journey-type';
import {ResponseData} from '../shared/response-data/response-data';
import {Router} from '@angular/router';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {WordpressPage} from '../shared/wordpress-pages-service/wordpress-page';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    latestNews: WordpressPage[];

    constructor(private responseData: ResponseData,
                private questionnaireService: QuestionnaireService,
                private pageService: WordpressPagesService,
                private router: Router) {
    }

    ngOnInit() {
        this.pageService.getLatestPages()
            .subscribe(pages => this.latestNews = pages);
    }

    onEnergyCalculatorButtonClick() {
        this.responseData.userJourneyType = UserJourneyType.Calculator;
        const route = this.questionnaireService.isComplete('home-basics')
            ? '/js/energy-efficiency/results'
            : '/js/energy-efficiency/questionnaire/home-basics';
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
