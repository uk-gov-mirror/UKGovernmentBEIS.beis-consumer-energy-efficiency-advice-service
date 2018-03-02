import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-large-video-card',
    templateUrl: './large-video-card.component.html',
    styleUrls: ['./large-video-card.component.scss']
})
export class LargeVideoCardComponent {
    @Input() title: string;
    @Input() synopsis: string;
}
