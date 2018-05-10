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
        synopsis: `
            A list of top tips on how to save money just by doing very simple (and free) things around the home, including:
            <ul>
                <li>Turning down your thermostat</li>
                <li>Switching off electronic equipment on standby</li>
                <li>Saving energy in the kitchen (washing up bowl, kettle, washing machine)</li>
                <li>Spending less time in the shower</li>
                <li>Turn off lights</li>
                <li>Choosing efficient light bulbs</li>
                <li>Switching energy supplier</li>
            </ul>
            Video will include images, film or animations of all the things you can do to save money.
        `
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
