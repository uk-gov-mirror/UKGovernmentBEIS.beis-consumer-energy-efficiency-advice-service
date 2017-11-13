import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FormsModule} from "@angular/forms";
import {ResponseData} from "../../../shared/response-data/response-data";
import {By} from "@angular/platform-browser";
import {BenefitsQuestionComponent} from "./benefits-question.component";
import {Benefits} from "./benefits";
import keys from "lodash-es/keys";

describe('BenefitsQuestionComponent', () => {
    let component: BenefitsQuestionComponent;
    let fixture: ComponentFixture<BenefitsQuestionComponent>;

    const originalBenefits: Benefits = Benefits.IncomeSupport | Benefits.TaxCredits;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BenefitsQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BenefitsQuestionComponent);
        component = fixture.componentInstance;
        component.response = originalBenefits;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with original benefits in response data checked', async(() => {
        const possibleBenefits = keys(Benefits)
            .map(x => parseInt(x))
            .filter(benefit => benefit);

        fixture.whenStable().then(() =>
            possibleBenefits.forEach(benefit => {
                const checkbox = fixture.debugElement.query(By.css(`#benefits-checkbox-${Benefits[benefit]}`)).nativeElement;
                expect(checkbox.checked).toBe(!!(originalBenefits & benefit));
            })
        );
    }));
});
