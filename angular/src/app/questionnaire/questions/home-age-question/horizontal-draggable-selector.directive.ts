import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[horizontalDraggableSelector]'
})
export class HorizontalDraggableSelectorDirective {

    private mouseOffsetFromSliderX: number = 0;
    private currentSliderCentreX: number = 0;

    private mouseMoveListener: () => void;
    private mouseUpListener: () => void;

    constructor(private el: ElementRef, private renderer: Renderer2) {
        el.nativeElement.style.position = 'absolute';
    }

    @Input('horizontalDraggableSelector') responseOptions: any[];
    @Input('initialOption') initialOption: any;
    @Output('onResponseSelected') responseEmitter: EventEmitter<any> = new EventEmitter<any>();

    @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
        event.preventDefault();
        this.mouseOffsetFromSliderX = event.pageX - this.currentSliderCentreX;
        this.mouseMoveListener = this.renderer.listen('document', 'mousemove', event => this.onMouseMove(event));
        this.mouseUpListener = this.renderer.listen('document', 'mouseup', event => this.onMouseUp(event));
    };

    ngOnInit() {
        window.setTimeout(() => {
            this.moveSliderToCentreOfOption(this.initialOption || this.responseOptions[0]);
        }, 0);
    }

    ngOnDestroy() {
        this.destroyEventListeners();
    }

    onMouseMove(event: MouseEvent) {
        event.preventDefault();
        const unboundedNewLocationX = event.pageX - this.mouseOffsetFromSliderX;
        const newLocationX = HorizontalDraggableSelectorDirective.boundBy(unboundedNewLocationX, 0, this.getTotalWidthOfSlideRangeInPixels());
        this.setSliderLocation(newLocationX);
    }

    setSliderLocation(newX: number): void {
        this.currentSliderCentreX = newX;
        const sliderWidth = this.el.nativeElement.clientWidth;
        const sliderLeftX = this.currentSliderCentreX - sliderWidth/2;
        this.el.nativeElement.style.left = sliderLeftX + 'px';
    }

    onMouseUp(event: MouseEvent) {
        this.destroyEventListeners();
        event.preventDefault();
        this.selectResponseFromSliderLocation(event.pageX - this.mouseOffsetFromSliderX);
    }

    destroyEventListeners(): void {
        this.mouseMoveListener && this.mouseMoveListener();
        this.mouseUpListener && this.mouseUpListener();
    }

    selectResponseFromSliderLocation(x: number): void {
        const selectedOption = this.getSelectedOptionFromSliderLocation(x);
        this.selectResponse(selectedOption);
    };

    selectResponse(option: any) {
        this.moveSliderToCentreOfOption(option);
        this.responseEmitter.emit(option);
    }

    getSelectedOptionFromSliderLocation(x: number): any {
        const rawIndex = Math.floor(x/this.getOptionWidthInPixels());
        const optionIndex = HorizontalDraggableSelectorDirective.boundBy(rawIndex, 0, this.getNumberOfResponseOptions() - 1);
        return this.responseOptions[optionIndex];
    }

    moveSliderToCentreOfOption(option: any): void {
        const optionIndex = this.responseOptions.indexOf(option) >= 0 ? this.responseOptions.indexOf(option) : 0;
        const optionWidth = this.getOptionWidthInPixels();
        const newX = optionIndex * optionWidth + optionWidth/2;
        this.setSliderLocation(newX);
    }

    getTotalWidthOfSlideRangeInPixels(): number {
        return this.el.nativeElement.parentElement.clientWidth;
    }

    getNumberOfResponseOptions(): number {
        return this.responseOptions.length;
    }

    getOptionWidthInPixels(): number {
        return this.getTotalWidthOfSlideRangeInPixels()/this.getNumberOfResponseOptions();
    }

    static boundBy(target: number, min: number, max: number): number {
        let boundedBelow = Math.max(target, min);
        return Math.min(boundedBelow, max);
    }
}