import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {ErrorBannerComponent} from './error-banner.component';
import {GlobalErrorHandler} from "../shared/global-error-handler";
import {ErrorHandler} from '@angular/core';

describe('ErrorBannerComponent', () => {
    let component: ErrorBannerComponent;
    let fixture: ComponentFixture<ErrorBannerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorBannerComponent],
            imports: [InlineSVGModule],
            providers: [
                {provide: ErrorHandler, useClass: GlobalErrorHandler},
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorBannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
