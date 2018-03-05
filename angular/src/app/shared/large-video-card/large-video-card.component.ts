import {Component, Input} from "@angular/core";
import {Video} from "./video";

@Component({
    selector: 'app-large-video-card',
    templateUrl: './large-video-card.component.html',
    styleUrls: ['./large-video-card.component.scss']
})
export class LargeVideoCardComponent {
    displaySynopsis: boolean = false;

    @Input() video: Video;

    openSynopsis(): void {
        this.displaySynopsis = true;
    }

    closeSynopsis(): void {
        this.displaySynopsis = false;
    }
}
