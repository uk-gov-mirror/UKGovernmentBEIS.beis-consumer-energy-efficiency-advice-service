import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {HotWaterCylinderQuestionComponent} from './hot-water-cylinder-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';

describe('HotWaterCylinderQuestionComponent', () => {
    let component: HotWaterCylinderQuestionComponent;
    let fixture: ComponentFixture<HotWaterCylinderQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HotWaterCylinderQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HotWaterCylinderQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on one of the buttons', () => {
        // given

        // when
        const yes = fixture.debugElement.query(By.css('.yes-button'));
        yes.nativeElement.click();

        // then
        expect(component.response).toBe(true);
    });
});
