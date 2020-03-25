import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {AgriculturalTenancyTypeQuestionComponent} from './agricultural-tenancy-type-question.component';
import {AgriculturalTenancyType} from './agricultural-tenancy-type';

describe('AgriculturalTenancyTypeQuestionComponent', () => {
    let component: AgriculturalTenancyTypeQuestionComponent;
    let fixture: ComponentFixture<AgriculturalTenancyTypeQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AgriculturalTenancyTypeQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AgriculturalTenancyTypeQuestionComponent);
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
        expect(component.response).toBe(AgriculturalTenancyType.AssuredTenancy);
    });
});
