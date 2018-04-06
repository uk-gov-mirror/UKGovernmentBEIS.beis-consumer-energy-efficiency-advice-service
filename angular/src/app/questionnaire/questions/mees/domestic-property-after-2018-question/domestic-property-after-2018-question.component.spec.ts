import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {DomesticPropertyAfter2018QuestionComponent} from './domestic-property-after-2018-question.component';

describe('DomesticPropertyAfter2018QuestionComponent', () => {
    let component: DomesticPropertyAfter2018QuestionComponent;
    let fixture: ComponentFixture<DomesticPropertyAfter2018QuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DomesticPropertyAfter2018QuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DomesticPropertyAfter2018QuestionComponent);
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
