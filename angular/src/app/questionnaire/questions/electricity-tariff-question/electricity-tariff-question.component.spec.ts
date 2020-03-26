import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ElectricityTariffQuestionComponent} from './electricity-tariff-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {ElectricityTariff} from './electricity-tariff';
import {MultipleChoiceQuestionComponent} from "../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('ElectricityTariffQuestionComponent', () => {
    let fixture: ComponentFixture<ElectricityTariffQuestionComponent>;
    let component: ElectricityTariffQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ElectricityTariffQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ElectricityTariffQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a tariff type', () => {
        // given

        // when
        const standard = fixture.debugElement.query(By.css('.standard-button'));
        standard.nativeElement.click();

        // then
        expect(component.response).toBe(ElectricityTariff.Standard);
    });
});
