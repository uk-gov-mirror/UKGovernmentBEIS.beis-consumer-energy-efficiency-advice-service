import {Component, Input} from "@angular/core";
import {Grant} from "../../grants/model/grant";

@Component({
    selector: 'app-grant-card',
    templateUrl: './grant-card.component.html',
    styleUrls: ['./grant-card.component.scss']
})
export class GrantCardComponent {
    @Input() grant: Grant;
}
