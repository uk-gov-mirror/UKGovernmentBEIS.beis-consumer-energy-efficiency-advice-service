import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FlatStoreysQuestionComponent} from './flat-storeys-question.component';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../shared/response-data/response-data';
import {FormsModule} from '@angular/forms';
import {NumberQuestionComponent} from '../../common-questions/number-question/number-question.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FlatStoreysQuestionComponent', () => {
    let component: FlatStoreysQuestionComponent;
    let fixture: ComponentFixture<FlatStoreysQuestionComponent>;

    const DEFAULT_NUMBER_OF_STOREYS: number = 1;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlatStoreysQuestionComponent, NumberQuestionComponent],
            imports: [FormsModule, InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlatStoreysQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should default number of storeys of the flat to 1', async(() => {
        fixture.whenStable().then(() => {
            const flatStoreysInput = fixture.debugElement.query(By.css('.flat-storeys input'));
            expect(flatStoreysInput.nativeElement.value).toBe(DEFAULT_NUMBER_OF_STOREYS.toString());
        });
    }));

    it('should default number of storeys of the whole building to 1', async(() => {
        fixture.whenStable().then(() => {
            const buildingStoreysInput = fixture.debugElement.query(By.css('.building-storeys input'));
            expect(buildingStoreysInput.nativeElement.value).toBe(DEFAULT_NUMBER_OF_STOREYS.toString());
        });
    }));

    it('should populate with original number of storeys in response data', async(() => {
        // given
        const originalNumberOfStoreys: number = 10;

        // when
        component.numberOfStoreysInFlat = originalNumberOfStoreys;
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            const storeysInput = fixture.debugElement.query(By.css('.flat-storeys input'));
            expect(storeysInput.nativeElement.value).toBe(originalNumberOfStoreys.toString());
        });
    }));

    it('should set the response given a valid number of storeys of the flat', () => {
        // given
        const expectedFlatStoreys = 5;
        const flatStoreysInput = fixture.debugElement.query(By.css('.flat-storeys input'));
        const buildingStoreysInput = fixture.debugElement.query(By.css('.building-storeys input'));
        buildingStoreysInput.nativeElement.value = 10;
        buildingStoreysInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // when
        flatStoreysInput.nativeElement.value = expectedFlatStoreys;
        flatStoreysInput.nativeElement.dispatchEvent(new Event('input'));

        expect(component.numberOfStoreysInFlat).toBe(expectedFlatStoreys);
    });

    it('should not set the response if the number of storeys of the flat if it is more than 10', () => {
        // given
        const flatStoreys = 15;
        const buildingStoreys = 20;
        const flatStoreysInput = fixture.debugElement.query(By.css('.flat-storeys input'));
        const buildingStoreysInput = fixture.debugElement.query(By.css('.building-storeys input'));
        buildingStoreysInput.nativeElement.value = buildingStoreys;
        buildingStoreysInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // when
        flatStoreysInput.nativeElement.value = flatStoreys;
        flatStoreysInput.nativeElement.dispatchEvent(new Event('input'));

        expect(component.numberOfStoreysInFlat).toBe(undefined);
    });

    it('should not set the response if the number of storeys of the flat if it is more than the number of storeys of the building', () => {
        // given
        const flatStoreys = 10;
        const buildingStoreys = 5;
        const flatStoreysInput = fixture.debugElement.query(By.css('.flat-storeys input'));
        const buildingStoreysInput = fixture.debugElement.query(By.css('.building-storeys input'));
        buildingStoreysInput.nativeElement.value = buildingStoreys;
        buildingStoreysInput.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // when
        flatStoreysInput.nativeElement.value = flatStoreys;
        flatStoreysInput.nativeElement.dispatchEvent(new Event('input'));

        expect(component.numberOfStoreysInFlat).toBe(undefined);
    });
});
