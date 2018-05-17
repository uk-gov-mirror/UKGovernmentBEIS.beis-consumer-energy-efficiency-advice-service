import {Component} from '@angular/core';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {Video} from '../../shared/large-video-card/video';
import { Article } from '../article-card/article';

@Component({
    selector: 'app-greener-home',
    templateUrl: './greener-home.component.html',
    styleUrls: ['./greener-home.component.scss']
})
export class GreenerHomeComponent {
    greenerHomeJourneyType: UserJourneyType = UserJourneyType.MakeHomeGreener;


    video: Video = {
        title: 'Choosing low energy light bulbs',
        imagePath: '/dist/assets/images/video-thumbnails/choosing-low-energy-lightbulbs.jpg',
        articlePath: '/pages/choosing-low-energy-lightbulbs'
    };

    articles: Article[] = [
        {
            title: 'What are the benefits of installing loft insulation?',
            summary: 'Fitting an extra layer of insulation in your loft is\
             a quick and easy way to cut your heating bills and make your home warmer.',
            iconClassName: 'icon-roofing',
            readMore: ' /measures/meta_loft_insulation'
        },
        {
            title: 'Solar electric panels',
            summary: 'Solar photovoltaic panels – or PV for short – produce \
            electricity when the sun shines on them. You can use this \
            electricity in the home to run appliances, and any that you \
            don’t use can be sold back to the grid.',
            iconClassName: 'icon-solar',
            readMore: '/measures/meta_solar_photovoltaic_panels'
        },
    ];
}
