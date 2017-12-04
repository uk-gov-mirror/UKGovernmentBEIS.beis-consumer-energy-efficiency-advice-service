import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {LivingRoomTemperatureQuestionComponent} from "./living-room-temperature-question.component";
import {NumberQuestionComponent} from "../../common-questions/number-question/number-question.component";
import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LivingRoomTemperatureQuestionComponent', () => {
    let component: LivingRoomTemperatureQuestionComponent;
    let fixture: ComponentFixture<LivingRoomTemperatureQuestionComponent>;

    const originalTemperature: number = 15;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LivingRoomTemperatureQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LivingRoomTemperatureQuestionComponent);
        component = fixture.componentInstance;
        component.response = originalTemperature;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original temperature in response data', async(() => {
        fixture.whenStable().then(() => {
            let temperatureInput = fixture.debugElement.query(By.css('input'));
            expect(temperatureInput.nativeElement.value).toBe(originalTemperature.toString());
        });
    }));

    it('should set the response given a valid temperature', () => {
        // given
        const expectedTemperature = 18;

        // when
        let temperatureInput = fixture.debugElement.query(By.css('input'));
        temperatureInput.nativeElement.value = expectedTemperature;
        temperatureInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.response).toBe(expectedTemperature);
    });
});
