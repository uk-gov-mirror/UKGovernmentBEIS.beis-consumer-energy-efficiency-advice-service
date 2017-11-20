import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FormsModule} from "@angular/forms"
import {ResponseData} from "../../../shared/response-data/response-data";
import {TumbleDryQuestionComponent} from "./tumble-dry-question.component";

describe('TumbleDryQuestionComponent', () => {
    let component: TumbleDryQuestionComponent;
    let fixture: ComponentFixture<TumbleDryQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TumbleDryQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(TumbleDryQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when inputting a value', async(() => {
        fixture.whenStable().then(() => {
            // given
            const expectedPercentage = 50;

            // when
            let input = fixture.debugElement.query(By.css('#tumble-dry-input'));
            input.nativeElement.value = expectedPercentage;
            input.nativeElement.dispatchEvent(new Event('input'));

            // then
            expect(responseData.tumbleDryPercentage).toBe(expectedPercentage);
        })
    }));

    it('should set value to 0 and notify of completion when clicking "No tumble dryer".', () => {
        // given

        // when
        let button = fixture.debugElement.query(By.css('#no-tumble-dryer-button'));
        button.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
        expect(responseData.tumbleDryPercentage).toBe(0);
    });
});
