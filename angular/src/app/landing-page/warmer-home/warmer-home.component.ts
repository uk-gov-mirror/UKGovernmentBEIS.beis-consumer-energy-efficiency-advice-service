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
            title: 'What are the benefits of installing loft insulation?',
            summary: 'Loft insulation is well worth considering because if there is little or no \
                existing insulation considerable savings can be made.',
            iconClassName: 'icon-roofing'
        },
        {
            title: 'What can I do if I don\'t have cavity walls or a loft?',
            summary: 'There is plenty you can do to improve the insulation in your home if you \
            don\'t have cavity walls or a loft space.',
            iconClassName: 'icon-walls'
        },
    ];
}
