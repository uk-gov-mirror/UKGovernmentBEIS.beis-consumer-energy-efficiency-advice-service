import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {ShowerTypeOption, ShowerTypeQuestionComponent} from "./shower-type-question.component";

describe('ShowerTypeQuestionComponent', () => {
    let component: ShowerTypeQuestionComponent;
    let fixture: ComponentFixture<ShowerTypeQuestionComponent>;

    let originalShowerType: ShowerTypeOption;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowerTypeQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowerTypeQuestionComponent);
        component = fixture.componentInstance;

        originalShowerType = component.showerTypes[3];
        component.response = originalShowerType.value;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original number of baths in response data', async(() => {
        fixture.whenStable().then(() => {
            let selectedOption = fixture.debugElement.query(By.css('select option:checked'));
            expect(selectedOption.nativeElement.text).toBe(originalShowerType.name);
        });
    }));

    it('should set the response when new shower type selected', async(() => {
        // given
        let expectedShowerType = component.showerTypes[0];

        // when
        fixture.whenStable().then(() => {
            let showerTypeSelect = fixture.debugElement.query(By.css('select'))
            // Angular syntax for custom ngValue
            showerTypeSelect.nativeElement.value = "1: 0";
            showerTypeSelect.nativeElement.dispatchEvent(new Event('change'));

            // then
            expect(component.response).toBe(expectedShowerType.value);
        });
    }));
});
