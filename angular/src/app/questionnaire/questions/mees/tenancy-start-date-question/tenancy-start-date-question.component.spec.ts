import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {TenancyStartDateQuestionComponent} from './tenancy-start-date-question.component';
import {TenancyStartDate} from './tenancy-start-date';

describe('TenancyStartDateQuestionComponent', () => {
    let component: TenancyStartDateQuestionComponent;
    let fixture: ComponentFixture<TenancyStartDateQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TenancyStartDateQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TenancyStartDateQuestionComponent);
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
        const yes = fixture.debugElement.query(By.css('.before-2018'));
        yes.nativeElement.click();

        // then
        expect(component.response).toBe(TenancyStartDate.BeforeApril2018);
    });

    it('should notify of completion when clicking on one of the buttons', () => {
        // given

        // when
        const no = fixture.debugElement.query(By.css('.after-2018'));
        no.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
