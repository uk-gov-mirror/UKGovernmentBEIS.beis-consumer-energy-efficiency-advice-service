import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {InstallerSearchComponent} from './installer-search.component';
import {ResponseData} from "../shared/response-data/response-data";
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {MeasureContent} from "../shared/energy-saving-measure-content-service/measure-content";

describe('InstallerSearchComponent', () => {
    let component: InstallerSearchComponent;
    let fixture: ComponentFixture<InstallerSearchComponent>;

    let measureCode;

    beforeEach(async(() => {
        measureCode = null;

        TestBed.configureTestingModule({
            declarations: [InstallerSearchComponent],
            imports: [FormsModule],
            providers: [{provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: ResponseData, useClass: MockResponseData},
                {provide: Router, useValue: {'navigate': function() {}}},
                {provide: EnergySavingMeasureContentService, useClass: MockMeasureContent}],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InstallerSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the value of postcode', () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const inputElement = fixture.debugElement.query(By.css('.postcode-input')).nativeElement;
            expect(inputElement.value).toEqual(component.postcode);
        });
    });

    it('should display the value of the measure code', () => {
        fixture.whenStable().then( () => {
            fixture.detectChanges();
            const inputElement = fixture.debugElement.query(By.css('.measure-name-input')).nativeElement;
            expect(inputElement.value).toEqual(component.measureName);
        });
    });

    class MockActivatedRoute {

        public params = Observable.of({
            "measure-code": "Test Measure Code",
        });
    }

    class MockResponseData {
        public postcode = "Test Postcode";
    }

    class MockMeasureContent {
        measures: Observable<MeasureContent[]>;

        public fetchMeasureDetails(): Observable<MeasureContent[]> {
            return Observable.of([{
                slug: null,
                acf: {
                    measure_code: "Test Measure Code",
                    headline: "Test Headline",
                    summary: null,
                    advantages: [{advantage: null}],
                    tags: null,
                    steps: null
                }
            }]);
        }
    }
});
