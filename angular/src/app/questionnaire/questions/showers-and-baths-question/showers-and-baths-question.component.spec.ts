import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ShowersAndBathsQuestionComponent} from "./showers-and-baths-question.component";
import {NumberQuestionComponent} from "../../common-questions/number-question/number-question.component";
import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {TimesPipe} from "../../../shared/times/times.pipe";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ShowersAndBathsQuestionComponent', () => {
    let component: ShowersAndBathsQuestionComponent;
    let fixture: ComponentFixture<ShowersAndBathsQuestionComponent>;

    const originalNumberOfShowers: number = 3;
    const originalNumberOfBaths: number = 5;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowersAndBathsQuestionComponent, NumberQuestionComponent, TimesPipe],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowersAndBathsQuestionComponent);
        component = fixture.componentInstance;
        component.showers = originalNumberOfShowers;
        component.baths = originalNumberOfBaths;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of showers in response data', async(() => {
        fixture.whenStable().then(() => {
            let showersInput = fixture.debugElement.query(By.css('input#showers'));
            expect(showersInput.nativeElement.value).toBe(originalNumberOfShowers.toString());
        });
    }));

    it('should set the response given a valid number of showers', () => {
        // given
        const expectedShowers = 5;

        // when
        let showersInput = fixture.debugElement.query(By.css('input#showers'));
        showersInput.nativeElement.value = expectedShowers;
        showersInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.showers).toBe(expectedShowers);
    });

    it('should populate with original number of baths in response data', async(() => {
        fixture.whenStable().then(() => {
            let bathsInput = fixture.debugElement.query(By.css('input#baths'));
            expect(bathsInput.nativeElement.value).toBe(originalNumberOfBaths.toString());
        });
    }));

    it('should set the response given a valid number of baths', () => {
        // given
        const expectedBaths = 11;

        // when
        let bathsInput = fixture.debugElement.query(By.css('input#baths'));
        bathsInput.nativeElement.value = expectedBaths;
        bathsInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.baths).toBe(expectedBaths);
    });
});
