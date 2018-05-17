import {Component} from '@angular/core';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {Video} from '../../shared/large-video-card/video';
import { Article } from '../article-card/article';

@Component({
    selector: 'app-reduce-bills',
    templateUrl: './reduce-bills.component.html',
    styleUrls: ['./reduce-bills.component.scss']
})
export class ReduceBillsComponent {
    reduceBillsJourneyType: UserJourneyType = UserJourneyType.ReduceEnergyBills;

    video: Video = {
        title: 'Simple ways to save energy',
        imagePath: '/dist/assets/images/video-thumbnails/simple-ways-to-save-energy.jpg',
        articlePath: '/pages/simple-ways-to-save-energy'
    };

    articles: Article[] = [
        {
            title: 'What are the benefits of installing loft insulation?',
            summary: 'Fitting an extra layer of insulation in your loft is a quick \
             and easy way to cut your heating bills and make your home warmer.',
            iconClassName: 'icon-roofing',
            readMore: '/measures/meta_loft_insulation'
        },
        {
            title: 'Reduce tumble dryer usage',
            summary: 'Tumble dryers use a fair amount of electricity to heat \
             the air they use, as well as to run the fan and motor. If you can dry \
             clothes outside you can cut your electricity use over the year.',
            iconClassName: 'icon-simple-savings',
            readMore: '/measures/reduce-tumble-dryer-use'
        },
    ];
}
