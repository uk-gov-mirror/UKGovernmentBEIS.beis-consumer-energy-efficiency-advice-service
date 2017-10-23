import * as _ from 'lodash';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {HomeAge, HomeAgeUtil} from './home-age';
import {HostListener, Renderer2, ViewChild, Component, OnInit, OnDestroy} from '@angular/core';
import {ResponseData} from "../../../common/response-data/response-data";

interface HomeAgeOption {
    name: string,
    value: HomeAge
}

@Component({
    selector: 'app-home-age-question',
    templateUrl: './home-age-question.component.html',
    styleUrls: ['./home-age-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class HomeAgeQuestionComponent extends QuestionBaseComponent<HomeAge> implements OnInit, OnDestroy {

    private homeAges: HomeAge[] = _.keys(HomeAge)
        .map(x => parseInt(x))
        .filter(homeAge => !isNaN(homeAge));

    homeAgeOptions: HomeAgeOption[] = this.homeAges
        .map(homeAge => {
            return {
                name: HomeAgeUtil.getDisplayName(homeAge),
                value: homeAge
            };
        });
    sliderLeftPosition: number = 0;
    isSliderSelected: boolean = false;

    private mouseOffsetFromSliderX: number = 0;
    private currentSliderCentreX: number = 0;

    private deregisterMouseMoveListener: () => void;
    private deregisterMouseUpListener: () => void;

    @ViewChild('slider') slider;
    @ViewChild('timeline') timeline;
    @ViewChild('option') option;

    constructor(responseData: ResponseData, private renderer: Renderer2) {
        super(responseData);
    }

    ngOnInit() {
        this.response = this.response || this.homeAges[0];
        setTimeout(() => {
            this.moveSliderToCentreOfOption(this.response);
        });
    }

    ngOnDestroy() {
        this.deregisterEventListeners();
    }

    get response(): HomeAge {
        return this.responseData.homeAge;
    }

    set response(val: HomeAge) {
        this.responseData.homeAge = val;
    }

    selectResponse(homeAge: HomeAge) {
        this.moveSliderToCentreOfOption(homeAge);
        this.response = homeAge;
    }

    @HostListener('window:resize', ['$event']) onResizeWindow(event) {
        this.moveSliderToCentreOfOption(this.response);
    }

    @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
        event.preventDefault();
        if (event.target === this.slider.nativeElement) {
            this.isSliderSelected = true;
            this.mouseOffsetFromSliderX = event.pageX - this.currentSliderCentreX;
            this.deregisterMouseMoveListener = this.renderer.listen('document', 'mousemove', event => this.onMouseMove(event));
            this.deregisterMouseUpListener = this.renderer.listen('document', 'mouseup', event => this.onMouseUp(event));
        }
    };

    moveSliderToCentreOfOption(homeAge: HomeAge): void {
        const optionIndex = this.homeAges.indexOf(homeAge) >= 0 ? this.homeAges.indexOf(homeAge) : 0;
        const optionWidth = this.getOptionWidthInPixels();
        const newX = optionIndex * optionWidth + optionWidth/2;
        this.setSliderLocation(newX);
    }

    setSliderLocation(newX: number): void {
        this.currentSliderCentreX = newX;
        const sliderWidth = this.slider.nativeElement.clientWidth;
        this.sliderLeftPosition = this.currentSliderCentreX - sliderWidth/2;
    }

    onMouseMove(event: MouseEvent) {
        event.preventDefault();
        const unboundedNewLocationX = event.pageX - this.mouseOffsetFromSliderX;
        const newLocationX = HomeAgeQuestionComponent.boundBy(unboundedNewLocationX, 0, this.getTotalWidthOfSlideRangeInPixels());
        this.setSliderLocation(newLocationX);
    }

    onMouseUp(event: MouseEvent) {
        this.isSliderSelected = false;
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
        const boundedBelow = Math.max(target, min);
        return Math.min(boundedBelow, max);
    }
}