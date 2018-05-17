import {Component} from '@angular/core';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {Video} from '../../shared/large-video-card/video';
import { Article } from '../article-card/article';

@Component({
    selector: 'app-warmer-home',
    templateUrl: './warmer-home.component.html',
    styleUrls: ['./warmer-home.component.scss']
})
export class WarmerHomeComponent {
    warmerHomeJourneyType: UserJourneyType = UserJourneyType.MakeHomeWarmer;

    video: Video = {
        title: 'Draught proofing your home',
        imagePath: '/dist/assets/images/video-thumbnails/draught-proofing-your-home.jpg',
        articlePath: '/pages/draught-proofing-your-home'
    };

    articles: Article[] = [
        {
            title: 'Upgrade window glazing',
            summary: 'If you have old or poor quality double\
             glazing, you could make your house warmer by\
             fitting new, higher performance windows.',
            iconClassName: 'icon-windows',
            readMore: '/measures/meta_glazing_replacement'
        },
        {
            title: 'Install new heating controls',
            summary: 'If you can\'t control when your heating comes\
             on, or what temperature it heats your home to, you should \
            consider upgrading your heating controls.',
            iconClassName: 'icon-heating',
            readMore: '/measures/meta_heating_controls_wet_system'
        },
    ];
}
