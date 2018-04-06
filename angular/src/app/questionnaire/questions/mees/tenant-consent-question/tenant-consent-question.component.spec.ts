import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {TenantConsentQuestionComponent} from './tenant-consent-question.component';

describe('TenantConsentQuestionComponent', () => {
    let component: TenantConsentQuestionComponent;
    let fixture: ComponentFixture<TenantConsentQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TenantConsentQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TenantConsentQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on one of the buttons', () => {
        // given

        // when
        const yes = fixture.debugElement.query(By.css('.yes-button'));
        yes.nativeElement.click();

        // then
        expect(component.response).toBe(true);
    });

    it('should notify of completion when clicking on one of the buttons', () => {
        // given

        // when
        const no = fixture.debugElement.query(By.css('.no-button'));
        no.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
