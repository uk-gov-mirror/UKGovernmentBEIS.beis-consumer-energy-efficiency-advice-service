import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";

import {FurtherQuestionsLinkComponent} from "./further-questions-link.component";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";

describe('FurtherQuestionsLinkComponent', () => {
    let component: FurtherQuestionsLinkComponent;
    let fixture: ComponentFixture<FurtherQuestionsLinkComponent>;

    const iconClassName = 'icon-class';
    const questionnaireName = 'questionnaire';
    const displayName = 'name';

    let completeQuestionnaires: string[];
    const mockQuestionnaireService = {
        isComplete: (name: string) => completeQuestionnaires.includes(name)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FurtherQuestionsLinkComponent],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [{provide: QuestionnaireService, useValue: mockQuestionnaireService}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        completeQuestionnaires = [];
        fixture = TestBed.createComponent(FurtherQuestionsLinkComponent);
        component = fixture.componentInstance;
        component.iconClassName = iconClassName;
        component.questionnaireName = questionnaireName;
        component.displayName = displayName;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain an icon with the correct class', () => {
        const iconElement = fixture.debugElement.query(By.css('.icon-container .questionnaire-icon')).nativeElement;
        expect(iconElement.className).toContain(iconClassName);
    });

    it('should show the correct display name', () => {
        const nameElement = fixture.debugElement.query(By.css('.name')).nativeElement;
        expect(nameElement.innerText).toEqual(displayName);
    });

    it('should link to the questionnaire', () => {
        const linkElement = fixture.debugElement.query(By.css('.further-questions-link')).nativeElement;
        expect(linkElement.href).toMatch(new RegExp(`/questionnaire/${questionnaireName}$`));
    });

    it('should show a tick against a complete questionnaire', () => {
        //given
        completeQuestionnaires = [questionnaireName];

        // when
        fixture.detectChanges();

        // then
        const tickElement = fixture.debugElement.query(By.css('.icon-container .icon-circle-tick'));
        expect(tickElement).not.toBeNull();
    });

    it('should not show a tick against an incomplete questionnaire', () => {
        //given
        completeQuestionnaires = [];

        // when
        fixture.detectChanges();

        // then
        const tickElement = fixture.debugElement.query(By.css('.icon-container .icon-circle-tick'));
        expect(tickElement).toBeNull();
    });
});
