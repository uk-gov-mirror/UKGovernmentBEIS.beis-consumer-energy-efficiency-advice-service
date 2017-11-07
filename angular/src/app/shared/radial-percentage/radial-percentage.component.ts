import {Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild} from "@angular/core";

@Component({
    selector: 'app-radial-percentage',
    templateUrl: './radial-percentage.component.html',
    styleUrls: ['./radial-percentage.component.scss']
})
export class RadialPercentageComponent implements OnInit, AfterViewInit {

    @Input() progress: number = 0;
    private static readonly initialCircleSize: number = 100;
    @ViewChild('radialPercentage') container;

    constructor(private host: ElementRef) {
    }

    ngOnInit() {
        this.forceProgressTransition();
    }

    ngAfterViewInit() {
        this.setScale();
    }

    forceProgressTransition() {
        const oldProgress = this.progress;
        this.progress = 0;
        setTimeout(() => this.progress = oldProgress);
    }

    setScale() {
        const actualSize = Math.min(this.host.nativeElement.offsetHeight, this.host.nativeElement.offsetWidth);
        const scaleFactor = actualSize / RadialPercentageComponent.initialCircleSize;
        this.container.nativeElement.style.transform = `scale(${scaleFactor})`;
    }
}
