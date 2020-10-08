import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {InstallerSearchComponent} from './installer-search.component';
import {ResponseData} from "../shared/response-data/response-data";
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {MeasureContent} from "../shared/energy-saving-measure-content-service/measure-content";
import {SpinnerAndErrorContainerComponent} from '../shared/spinner-and-error-container/spinner-and-error-container.component';
import {InstallerSearchService} from "../shared/installer-search-service/installer-search.service";
import {PageTitleService} from "../shared/page-title-service/page-title.service";
import {CeilPipe} from "../shared/ceil/ceil.pipe";
import {InstallerCardComponent} from "./installer-card/installer-card.component";
import {InstallerMapComponent} from "./installer-map/installer-map.component";
import {LinkButtonComponent} from "../shared/link-button/link-button.component";
import {InlineSVGModule} from 'ng-inline-svg';

describe('InstallerSearchComponent', () => {
    let component: InstallerSearchComponent;
    let fixture: ComponentFixture<InstallerSearchComponent>;

    let measureCode;

    const expectedInstallers = [];

    const installerServiceStub = {
        getMeasure: () => Observable.of(expectedInstallers)
    };

    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        measureCode = null;

        TestBed.configureTestingModule({
            declarations: [
                InstallerSearchComponent,
                InstallerCardComponent,
                InstallerMapComponent,
                SpinnerAndErrorContainerComponent,
                CeilPipe,
                LinkButtonComponent
            ],
            imports: [
                FormsModule,
                InlineSVGModule
            ],
            providers: [{provide: ActivatedRoute, useValue: new MockActivatedRoute()},
                {provide: ResponseData, useClass: MockResponseData},
                {provide: Router, useValue: {'navigate': function() {}}},
                {provide: EnergySavingMeasureContentService, useClass: MockMeasureContent},
                {provide: InstallerSearchService, useValue: installerServiceStub},
                {provide: PageTitleService, useValue: pageTitleStub}],
        });
    }));

    const setupFixture = async () => {
        await TestBed.compileComponents();
        fixture = TestBed.createComponent(InstallerSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    };

    it('should create', async () => {
        await setupFixture();

        expect(component).toBeTruthy();
    });

    it('should display the value of postcode', async () => {
        await setupFixture();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const inputElement = fixture.debugElement.query(By.css('.postcode-input')).nativeElement;
            expect(inputElement.value).toEqual(component.formPostcode);
        });
    });

    it('should have the correct measure selected by default', async () => {
        await setupFixture();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const inputElement = fixture.debugElement.query(By.css('.select-measure')).nativeElement;
            const selectedOption = inputElement.options[inputElement.selectedIndex];
            expect(selectedOption.text).toEqual('Test Headline');
        });
    });

    it('should override measure codes if required', async () => {
        TestBed.overrideProvider(ActivatedRoute, {
            useValue: new MockActivatedRoute("Q1")
        });
        await setupFixture();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const inputElement = fixture.debugElement.query(By.css('.select-measure')).nativeElement;
            const selectedOption = inputElement.options[inputElement.selectedIndex];
            expect(inputElement.options.length).toEqual(2);
            expect(inputElement.options[0].label).toEqual('Test Headline');
            expect(inputElement.options[1].label).toEqual('Test Replacement Headline');
            expect(selectedOption.text).toEqual('Test Replacement Headline');
        });
    });

    class MockActivatedRoute {
        public params;

        constructor (measureCodeParam?: string) {
            this.params = Observable.of({
                "measure-code": measureCodeParam || "Test Measure Code",
            });
        }
    }

    class MockResponseData {
        public postcode = "Test Postcode";
    }

    class MockMeasureContent {
        measures: Observable<MeasureContent[]>;

        public fetchMeasureDetails(): Observable<MeasureContent[]> {
            return Observable.of([
                {
                    slug: null,
                    acf: {
                        measure_code: "Test Measure Code",
                        headline: "Test Headline",
                        summary: null,
                        what_it_is: null,
                        is_it_right_for_me: null,
                        advantages: [{advantage: null}],
                        statistic: "Test Statistic",
                        tags: null,
                        steps: null,
                        trustmark_trade_codes: []
                    }
                },
                {
                    slug: null,
                    acf: {
                        measure_code: "Q1",
                        headline: "Test Ignored Headline",
                        summary: null,
                        what_it_is: null,
                        is_it_right_for_me: null,
                        advantages: [{advantage: null}],
                        statistic: "Test Statistic",
                        tags: null,
                        steps: null,
                        trustmark_trade_codes: []
                    }
                },
                {
                    slug: null,
                    acf: {
                        measure_code: "Q2",
                        headline: "Test Replacement Headline",
                        summary: null,
                        what_it_is: null,
                        is_it_right_for_me: null,
                        advantages: [{advantage: null}],
                        statistic: "Test Statistic",
                        tags: null,
                        steps: null,
                        trustmark_trade_codes: []
                    }
                }
            ]);
        }
    }
});
