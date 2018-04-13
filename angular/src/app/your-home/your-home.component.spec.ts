import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {InlineSVGModule} from 'ng-inline-svg';
import {RouterTestingModule} from '@angular/router/testing';

import {YourHomeComponent} from './your-home.component';
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {SpinnerAndErrorContainerComponent} from "../shared/spinner-and-error-container/spinner-and-error-container.component";

describe('YourHomeComponent', () => {
    let component: YourHomeComponent;
    let fixture: ComponentFixture<YourHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YourHomeComponent, SpinnerAndErrorContainerComponent,],
            imports: [
                InlineSVGModule,
                RouterTestingModule
            ],
            providers: [
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: Router, useValue: {'navigate': function() {}}},
                {provide: EnergySavingMeasureContentService, useValue: {
                    'fetchMeasureDetails': (() => Observable.of([]))
                }},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YourHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    class MockActivatedRoute {
        public snapshot = {
            paramMap: {get: MockActivatedRoute.paramMapGet}
        };

        public paramMap = Observable.of({
            get: MockActivatedRoute.paramMapGet
        });

        private static paramMapGet(key) {
            if (key === 'tag') {
                return 'test-tag';
            } else {
                throw new Error('Unexpected parameter name: ' + key);
            }
        }
    }
});
