import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {TenancyTypeQuestionComponent} from './tenancy-type-question.component';
import {TenancyType} from './tenancy-type';

describe('TenancyTypeQuestionComponent', () => {
    let component: TenancyTypeQuestionComponent;
    let fixture: ComponentFixture<TenancyTypeQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TenancyTypeQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TenancyTypeQuestionComponent);
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
        const assured = fixture.debugElement.query(By.css('.assured-tenancy'));
        assured.nativeElement.click();

        // then
        expect(component.response).toBe(TenancyType.AssuredTenancy);
    });
});
