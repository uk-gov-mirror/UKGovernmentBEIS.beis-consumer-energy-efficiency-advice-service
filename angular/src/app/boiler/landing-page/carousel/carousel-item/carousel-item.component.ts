import { Component, Input } from "@angular/core";
import padStart from 'lodash-es/padStart';

@Component({
    selector: 'app-carousel-item',
    templateUrl: './carousel-item.component.html',
    styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent {
    @Input() number: number;
    @Input() summary: string;
    @Input() details: string;

    padded(num: number): string {
        return padStart(num.toString(10), 2, '0');
    }
}
