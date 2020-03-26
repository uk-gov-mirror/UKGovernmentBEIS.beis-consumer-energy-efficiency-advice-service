import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {WaterTankQuestionComponent} from './water-tank-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {WaterTankSpace} from './water-tank-space';
import {MultipleChoiceQuestionComponent} from "../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('WaterTankQuestionComponent', () => {
    let component: WaterTankQuestionComponent;
    let fixture: ComponentFixture<WaterTankQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaterTankQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaterTankQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on an option', () => {
        // given
        const noSpace = fixture.debugElement.queryAll(By.css('.space-option')).find(el => el.nativeElement.innerText === 'No space');

        // when
        noSpace.nativeElement.click();

        // then
        expect(component.response).toBe(WaterTankSpace.None);
    });
});
