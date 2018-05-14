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
