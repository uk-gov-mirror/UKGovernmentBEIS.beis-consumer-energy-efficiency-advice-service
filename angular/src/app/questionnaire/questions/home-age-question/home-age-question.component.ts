import {QuestionBaseComponent, QuestionComponent} from '../question.component';
import {HomeAge, HomeAgeUtil} from './home-age';
import {HostListener, Renderer2, ViewChild} from '@angular/core';

interface HomeAgeOption {
    name: string,
    value: HomeAge
}

@QuestionComponent({
    selector: 'app-home-age-question',
    templateUrl: './home-age-question.component.html',
    styleUrls: ['./home-age-question.component.scss']
})
export class HomeAgeQuestionComponent extends QuestionBaseComponent<HomeAge> {

    private homeAges: HomeAge[] = Object.values(HomeAge)
        .filter(homeAge => !isNaN(homeAge));

    private homeAgeOptions: HomeAgeOption[] = this.homeAges
        .map(homeAge => {
            return {
                name: HomeAgeUtil.getDisplayName(homeAge),
                value: homeAge
            };
        });

    private mouseOffsetFromSliderX: number = 0;
    private currentSliderCentreX: number = 0;

    private deregisterMouseMoveListener: () => void;
    private deregisterMouseUpListener: () => void;

    @ViewChild('slider') slider;
    @ViewChild('timeline') timeline;
    @ViewChild('option') option;

    constructor(private renderer: Renderer2) {
        super();
    }

    ngOnInit() {
        setTimeout(() => {
            this.moveSliderToCentreOfOption(this.response || this.homeAges[0]);
        });
    }

    ngOnDestroy() {
        this.deregisterEventListeners();
    }

    selectResponse(homeAge: HomeAge) {
        this.moveSliderToCentreOfOption(homeAge);
        this.response = homeAge;
    }

    @HostListener('window:resize', ['$event']) onResizeWindow(event) {
        if (event.currentTarget.innerWidth > this.getTotalWidthOfSlideRangeInPixels()) {
            this.moveSliderToCentreOfOption(this.response);
        }
    }

    @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
        event.preventDefault();
        this.mouseOffsetFromSliderX = event.pageX - this.currentSliderCentreX;
        this.deregisterMouseMoveListener = this.renderer.listen('document', 'mousemove', event => this.onMouseMove(event));
        this.deregisterMouseUpListener = this.renderer.listen('document', 'mouseup', event => this.onMouseUp(event));
    };

    onMouseMove(event: MouseEvent) {
        event.preventDefault();
        const unboundedNewLocationX = event.pageX - this.mouseOffsetFromSliderX;
        const newLocationX = HomeAgeQuestionComponent.boundBy(unboundedNewLocationX, 0, this.getTotalWidthOfSlideRangeInPixels());
        this.setSliderLocation(newLocationX);
    }

    setSliderLocation(newX: number): void {
        this.currentSliderCentreX = newX;
        const sliderWidth = this.slider.nativeElement.clientWidth;
        const sliderLeftX = this.currentSliderCentreX - sliderWidth/2;
        this.slider.nativeElement.style.left = sliderLeftX + 'px';
    }

    onMouseUp(event: MouseEvent) {
        this.deregisterEventListeners();
        event.preventDefault();
        this.selectResponseFromSliderLocation(event.pageX - this.mouseOffsetFromSliderX);
    }

    deregisterEventListeners(): void {
        this.deregisterMouseMoveListener && this.deregisterMouseMoveListener();
        this.deregisterMouseUpListener && this.deregisterMouseUpListener();
    }

    selectResponseFromSliderLocation(x: number): void {
        const selectedOption = this.getSelectedOptionFromSliderLocation(x);
        this.selectResponse(selectedOption);
    };

    getSelectedOptionFromSliderLocation(x: number): HomeAge {
        const rawIndex = Math.floor(x/this.getOptionWidthInPixels());
        const optionIndex = HomeAgeQuestionComponent.boundBy(rawIndex, 0, this.getNumberOfResponseOptions() - 1);
        return this.homeAges[optionIndex];
    }
    getTotalWidthOfSlideRangeInPixels(): number {
        return this.timeline.nativeElement.scrollWidth;
    }

    getNumberOfResponseOptions(): number {
        return this.homeAges.length;
    }

    getOptionWidthInPixels(): number {
        return this.option.nativeElement.scrollWidth;
    }

    static boundBy(target: number, min: number, max: number): number {
        let boundedBelow = Math.max(target, min);
        return Math.min(boundedBelow, max);
    }

    moveSliderToCentreOfOption(homeAge: HomeAge): void {
        const optionIndex = this.homeAges.indexOf(homeAge) >= 0 ? this.homeAges.indexOf(homeAge) : 0;
        const optionWidth = this.getOptionWidthInPixels();
        const newX = optionIndex * optionWidth + optionWidth/2;
        this.setSliderLocation(newX);
    }
}