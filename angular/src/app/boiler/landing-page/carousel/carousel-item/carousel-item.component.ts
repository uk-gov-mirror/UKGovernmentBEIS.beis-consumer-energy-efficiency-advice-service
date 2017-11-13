import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-carousel-item',
    templateUrl: './carousel-item.component.html',
    styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent {
    @Input() number: number;
    @Input() summary: string;
    @Input() details: string;
}
