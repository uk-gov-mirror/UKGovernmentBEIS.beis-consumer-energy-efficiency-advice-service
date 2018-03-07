import {Component} from '@angular/core';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {Video} from '../../shared/large-video-card/video';
import {StaticMeasure} from '../static-measure-card/static-measure';
import { Article } from '../article-card/article';

@Component({
    selector: 'app-home-improvements',
    templateUrl: './home-improvements.component.html',
    styleUrls: ['./home-improvements.component.scss']
})
export class HomeImprovementsComponent {
    homeImprovementsJourneyType: UserJourneyType = UserJourneyType.PlanHomeImprovements;

    staticMeasures: StaticMeasure[] = [
        {
            iconClassName: 'icon-lightbulb',
            basicInfoValue: '15%',
            basicInfoHeadline: 'of your electricity bill is accounted for by lighting',
            measureHeadline: 'Energy efficient lighting',
            measureSummary: 'You can cut your lighting bill and energy use by changing which bulbs you use and how you use them',
            averageSavings: 75
        },
        {
            iconClassName: 'icon-switch',
            basicInfoValue: '40%',
            basicInfoHeadline: 'of people could save money by switching energy suppliers',
            measureHeadline: 'Switching energy supplier',
            measureSummary: 'Comparing energy tariffs and deals regularly can help you make sure you’re getting the best gas or \
                electricity tariff for your usage and the best service offer.',
            averageSavings: 30
        }
    ];

    video: Video = {
        title: 'Draught-proofing',
        synopsis: `
            A guided tour round a typical home, showing where draughts are likely to be, including:
            <ul>
                <li>
                    Around doors and windows
                </li>
                <li>
                    Letterboxes and keyholes
                </li>
                <li>
                    Around the floor edge
                </li>
                <li>
                    Loft hatch
                </li>
                <li>
                    Gaps around pipes etc.
                </li>
            </ul>
        The video will also cover ventilation that should not be sealed.`
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
