import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HouseStoreysQuestionComponent} from './house-storeys-question.component';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../shared/response-data/response-data';
import {FormsModule} from '@angular/forms';
import {NumberQuestionComponent} from '../../common-questions/number-question/number-question.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HouseStoreysQuestionComponent', () => {
    let component: HouseStoreysQuestionComponent;
    let fixture: ComponentFixture<HouseStoreysQuestionComponent>;

    const DEFAULT_NUMBER_OF_STOREYS: number = 2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HouseStoreysQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HouseStoreysQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should default number of storeys to 2', async(() => {
        fixture.whenStable().then(() => {
            const storeysInput = fixture.debugElement.query(By.css('input'));
            expect(storeysInput.nativeElement.value).toBe(DEFAULT_NUMBER_OF_STOREYS.toString());
        });
    }));

    it('should populate with original number of storeys in response data', async(() => {
        // given
        const originalNumberOfStoreys: number = 10;

        // when
        component.response = originalNumberOfStoreys;
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            const storeysInput = fixture.debugElement.query(By.css('input'));
            expect(storeysInput.nativeElement.value).toBe(originalNumberOfStoreys.toString());
        });
    }));

    it('should set the response given a valid number of storeys', () => {
        // given
        const expectedStoreys = 5;

        // when
        const storeysInput = fixture.debugElement.query(By.css('input'));
        storeysInput.nativeElement.value = expectedStoreys;
        storeysInput.nativeElement.dispatchEvent(new Event('input'));

        // then
        expect(component.response).toBe(expectedStoreys);
    });
});
