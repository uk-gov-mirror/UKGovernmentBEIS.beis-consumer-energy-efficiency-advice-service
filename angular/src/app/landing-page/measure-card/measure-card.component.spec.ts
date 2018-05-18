import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {InlineSVGModule} from 'ng-inline-svg';

import {MeasureCardComponent} from './measure-card.component';
import {MeasureContent} from "../../shared/energy-saving-measure-content-service/measure-content";

describe('MeasureCardComponent', () => {
    let component: MeasureCardComponent;
    let fixture: ComponentFixture<MeasureCardComponent>;

    const testMeasure: MeasureContent = {
        slug: 'slug',
        acf: {
            measure_code: '1',
            headline: 'Test Measure',
            summary: 'This is a test measure',
            what_it_is: null,
            is_it_right_for_me: null,
            advantages: [],
            statistic: 'Test Measure Statistic',
            tags: [],
            steps: [],
            installer_code: '100',
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MeasureCardComponent],
            imports: [
                InlineSVGModule,
                RouterTestingModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MeasureCardComponent);
        component = fixture.componentInstance;
        component.measure = testMeasure;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});
