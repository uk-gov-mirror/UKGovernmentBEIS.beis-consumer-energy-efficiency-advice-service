import {Component, DoCheck, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-sticky-row-wrapper',
    templateUrl: './sticky-row-wrapper.component.html',
    styleUrls: ['./sticky-row-wrapper.component.scss']
})
export class StickyRowWrapperComponent implements OnInit, DoCheck {

    @ViewChild('stickyRow') stickyRow;
    @ViewChild('stickyRowSpacer') stickyRowSpacer;

    isFixedPosition: boolean = true;
    stickyRowHeightPixels: number;

    private static isVerticalPositionOnScreen(position: number): boolean {
        return position >= 0 && position <= window.innerHeight;
    }

    ngOnInit() {
        this.updateRowPosition();
    }

    ngDoCheck() {
        this.updateRowPosition();
    }

    @HostListener('window:scroll', [])
    updateRowPosition(): void {
        this.stickyRowHeightPixels = this.stickyRow.nativeElement.clientHeight;
        const stickyRowTopPosition = this.stickyRowSpacer.nativeElement.getBoundingClientRect().top;
        const stickyRowBottomPosition = this.stickyRowSpacer.nativeElement.getBoundingClientRect().bottom;
        const isStickyRowFullyOnScreen = StickyRowWrapperComponent.isVerticalPositionOnScreen(stickyRowTopPosition) &&
                StickyRowWrapperComponent.isVerticalPositionOnScreen(stickyRowBottomPosition);
        this.isFixedPosition = !isStickyRowFullyOnScreen;
    }
}
