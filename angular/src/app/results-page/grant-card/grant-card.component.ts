import {Component, Input} from "@angular/core";
import {GrantResponse} from "../local-authority-service/local-authority-response";

@Component({
    selector: 'app-grant-card',
    templateUrl: './grant-card.component.html',
    styleUrls: ['./grant-card.component.scss']
})
export class GrantCardComponent {
    @Input() grant: GrantResponse;
}
