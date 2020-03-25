import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {InlineSVGModule} from 'ng-inline-svg';
import {RouterTestingModule} from '@angular/router/testing';

import {SimpleSavingsComponent} from './simple-savings.component';
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {SpinnerAndErrorContainerComponent} from "../shared/spinner-and-error-container/spinner-and-error-container.component";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

describe('SimpleSavingsComponent', () => {
    let component: SimpleSavingsComponent;
    let fixture: ComponentFixture<SimpleSavingsComponent>;

    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleSavingsComponent, SpinnerAndErrorContainerComponent],
            imports: [
                InlineSVGModule,
                RouterTestingModule
            ],
            providers: [
                {provide: EnergySavingMeasureContentService, useValue: {
                    'fetchMeasureDetails': (() => Observable.of([]))
                }},
                {provide: PageTitleService, useValue: pageTitleStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleSavingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
