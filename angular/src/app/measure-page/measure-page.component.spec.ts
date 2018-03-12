import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MeasurePageComponent } from './measure-page.component';
import 'rxjs/add/operator/toPromise';
import {By} from '@angular/platform-browser';
import {SpinnerAndErrorContainerComponent} from '../shared/spinner-and-error-container/spinner-and-error-container.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Pipe, PipeTransform} from '@angular/core';
import {WordpressMeasuresService} from '../shared/wordpress-measures-service/wordpress-measures.service';

describe('MeasurePageComponent', () => {
    let component: MeasurePageComponent;
    let fixture: ComponentFixture<MeasurePageComponent>;
    let injector: TestBed;
    let router: Router;

    const expectedMeasure = {
        title: 'title',
        summary: 'summary',
        advantages: [],
        steps: []
    };
    const measuresServiceStub = {
        getMeasure: () => Observable.of(expectedMeasure)
    };

    const testSlug = 'test-measure';

    @Pipe({
        name: 'safe'
    })
    class MockSafePipe implements PipeTransform {
        transform(html) {
            return html;
        }
    }

    class MockActivatedRoute {
        public snapshot = {
            paramMap: {get: MockActivatedRoute.paramMapGet}
        };

        public paramMap = Observable.of({
            get: MockActivatedRoute.paramMapGet
        });

        private static paramMapGet(key) {
            if (key === 'slug') {
                return testSlug;
            } else {
                throw new Error('Unexpected parameter name');
            }
        }
    }

    beforeEach(async(() => {
        spyOn(measuresServiceStub, 'getMeasure').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                MeasurePageComponent,
                SpinnerAndErrorContainerComponent,
                MockSafePipe
            ],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: WordpressMeasuresService, useValue: measuresServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        fixture = TestBed.createComponent(MeasurePageComponent);
        router = TestBed.get(Router);
        spyOn(router, 'navigate');
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the MeasuresService with the route param', () => {
        // when
        fixture.detectChanges();

        // then
        expect(measuresServiceStub.getMeasure).toHaveBeenCalledWith(testSlug);
    });

    it('should display the measure content with data from the MeasuresService', async(() => {
        // when
        fixture.detectChanges();

        // then
        fixture.whenStable()
            .then(() => {
                const measureTitle = fixture.debugElement.query(By.css('.measure-page .title'));
                expect(measureTitle.nativeElement.textContent).toBe(expectedMeasure.title);
            });
    }));

    it('should redirect to the home page if the measure data is not found', async(() => {
        // given
        const injectedMeasuresService = injector.get(WordpressMeasuresService);
        injectedMeasuresService.getMeasure = () => Observable.of(null);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable()
            .then(() => {
                expect(router.navigate).toHaveBeenCalledWith(['/']);
            });
    }));
});
