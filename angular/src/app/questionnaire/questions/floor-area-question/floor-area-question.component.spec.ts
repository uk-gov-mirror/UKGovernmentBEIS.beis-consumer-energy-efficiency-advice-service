import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {FormsModule} from "@angular/forms"
import {ResponseData} from "../../../shared/response-data/response-data";
import {FloorAreaQuestionComponent} from "./floor-area-question.component";

describe('FloorAreaQuestionComponent', () => {
    let component: FloorAreaQuestionComponent;
    let fixture: ComponentFixture<FloorAreaQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FloorAreaQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(FloorAreaQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set floor area when inputting a value', async(() => {
        fixture.whenStable().then(() => {
            // given
            const expectedArea = 100;

            // when
            let input = fixture.debugElement.query(By.css('#floor-area-input'));
            input.nativeElement.value = expectedArea;
            input.nativeElement.dispatchEvent(new Event('input'));

            // then
            expect(responseData.floorArea).toBe(expectedArea);
            expect(responseData.floorAreaUnit).toBe(component.floorAreaUnits[0].value)
        })
    }));

    it('should set floor area to 0 and notify of completion when clicking "I don\'t know".', () => {
        // given

        // when
        let button = fixture.debugElement.query(By.css('#do-not-know-button'));
        button.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
        expect(responseData.floorArea).toBe(0);
    });

    it('should set floor area unit to square foot when clicking the unit', () => {
        // given

        // when
        fixture.whenStable().then(() => {
            let squareFootUnitButton = fixture.debugElement.query(By.css('.unit-option.square-foot'));
            squareFootUnitButton.nativeElement.click();

            // then
            expect(responseData.floorAreaUnit).toBe(component.floorAreaUnits[1].value);
        });
    });
});
