import {Component, Input} from '@angular/core';
import {Video} from './video';

@Component({
    selector: 'app-large-video-card',
    templateUrl: './large-video-card.component.html',
    styleUrls: ['./large-video-card.component.scss']
})
export class LargeVideoCardComponent {
    @Input() video: Video;
}
