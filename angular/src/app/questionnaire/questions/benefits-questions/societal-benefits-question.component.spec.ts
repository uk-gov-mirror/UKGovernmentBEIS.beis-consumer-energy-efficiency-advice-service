import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResponseData} from '../../../shared/response-data/response-data';
import {By} from '@angular/platform-browser';
import {SocietalBenefitsQuestionComponent} from "./societal-benefits-question.component";

describe('SocietalBenefitsQuestionComponent', () => {
    let component: SocietalBenefitsQuestionComponent;
    let fixture: ComponentFixture<SocietalBenefitsQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SocietalBenefitsQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(SocietalBenefitsQuestionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with answer in response data', async(() => {
        // given
        responseData.receiveSocietalBenefits = true;

        // when
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#yes-option'));
            expect(yesOption.classes.selected).toBeTruthy();
        });
    }));

    it('should set the response', () => {
        // when
        const yesOption = fixture.debugElement.query(By.css('#yes-option')).nativeElement;
        yesOption.click();

        // then
        expect(responseData.receiveSocietalBenefits).toBeTruthy();
    });
});
