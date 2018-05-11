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
        title: 'Save energy around the home',
        imagePath: '/dist/assets/images/home-page/background.jpg',
        articlePath: '/pages/energy-company-obligation'
    };

    articles: Article[] = [
        {
            title: 'What are the benefits of installing loft insulation?',
            summary: 'Loft insulation is well worth considering because if there is little or no \
                existing insulation considerable savings can be made.',
            iconClassName: 'icon-lightbulb'
        },
        {
            title: 'What can I do if I don\'t have cavity walls or a loft?',
            summary: 'There is plenty you can do to improve the insulation in your home if you \
            don\'t have cavity walls or a loft space.',
            iconClassName: 'icon-switch'
        },
    ];
}
