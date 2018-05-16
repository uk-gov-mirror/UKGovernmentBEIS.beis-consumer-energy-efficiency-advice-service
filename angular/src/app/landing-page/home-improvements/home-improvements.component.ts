import {Component} from '@angular/core';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {Video} from '../../shared/large-video-card/video';
import { Article } from '../article-card/article';

@Component({
    selector: 'app-home-improvements',
    templateUrl: './home-improvements.component.html',
    styleUrls: ['./home-improvements.component.scss']
})
export class HomeImprovementsComponent {
    homeImprovementsJourneyType: UserJourneyType = UserJourneyType.PlanHomeImprovements;

    video: Video = {
        title: 'Insulating your loft',
        imagePath: '/dist/assets/images/video-thumbnails/insulating-your-loft.jpg',
        articlePath: '/pages/insulating-your-loft'
    };

    articles: Article[] = [
        {
            title: 'What are the benefits of installing loft insulation?',
            summary: 'Fitting an extra layer of insulation in your\
             loft is a quick and easy way to cut your heating bills and\
             make your home warmer.',
            iconClassName: 'icon-roofing',
            readMore: '/measures/meta_loft_insulation'
        },
        {
            title: 'Upgrade window glazing',
            summary: 'If you have old or poor quality double glazing,\
             you could make your house warmer by fitting new, higher performance windows.',
            iconClassName: 'icon-walls',
            readMore: '/measures/meta_glazing_replacement'
        },
    ];
}
