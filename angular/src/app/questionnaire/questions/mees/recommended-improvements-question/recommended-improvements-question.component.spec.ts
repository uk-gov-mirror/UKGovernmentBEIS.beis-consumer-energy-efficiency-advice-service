import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {RecommendedImprovementsQuestionComponent} from './recommended-improvements-question.component';

describe('RecommendedImprovementsQuestionComponent', () => {
    let component: RecommendedImprovementsQuestionComponent;
    let fixture: ComponentFixture<RecommendedImprovementsQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecommendedImprovementsQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendedImprovementsQuestionComponent);
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