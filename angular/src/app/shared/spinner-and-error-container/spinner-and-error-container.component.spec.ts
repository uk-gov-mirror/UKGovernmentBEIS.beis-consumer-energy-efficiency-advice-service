import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {SpinnerAndErrorContainerComponent} from "./spinner-and-error-container.component";

describe('SpinnerAndErrorContainerComponent', () => {
    let component: SpinnerAndErrorContainerComponent;
    let fixture: ComponentFixture<SpinnerAndErrorContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpinnerAndErrorContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpinnerAndErrorContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the error container when loading and error', () => {
        // given
        component.loading = true;
        component.error = true;

        // when
        fixture.detectChanges();

        // then
        expect(getLoadingContainer()).toBeFalsy();
        expect(getErrorContainer()).toBeTruthy();
    });

    it('should display the error container when !loading and error', () => {
        // given
        component.loading = false;
        component.error = true;

        // when
        fixture.detectChanges();

        // then
        expect(getLoadingContainer()).toBeFalsy();
        expect(getErrorContainer()).toBeTruthy();
    });

    it('should display the loading container when loading and !error', () => {
        // given
        component.loading = true;
        component.error = false;

        // when
        fixture.detectChanges();

        // then
        expect(getLoadingContainer()).toBeTruthy();
        expect(getErrorContainer()).toBeFalsy();
    });

    it('should display neither container when !loading and !error', () => {
        // given
        component.loading = false;
        component.error = false;

        // when
        fixture.detectChanges();

        // then
        expect(getLoadingContainer()).toBeFalsy();
        expect(getErrorContainer()).toBeFalsy();
    });

    const getLoadingContainer = () => fixture.debugElement.query(By.css('.page-loading-container'));
    const getErrorContainer = () => fixture.debugElement.query(By.css('.page-error-container'));
});
