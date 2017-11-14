import {Component, EventEmitter, Input, Output} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {GrantsQuestionnaireComponent} from "./grants-questionnaire.component";

describe('GrantsQuestionnaireComponent', () => {
    let component: GrantsQuestionnaireComponent;
    let fixture: ComponentFixture<GrantsQuestionnaireComponent>;
    let mockQuestionnaireElement;
    let mockQuestionnaireComponent: MockQuestionnaireComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                GrantsQuestionnaireComponent,
                MockQuestionnaireComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GrantsQuestionnaireComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockQuestionnaireElement = fixture.debugElement.query(By.directive(MockQuestionnaireComponent));
        mockQuestionnaireComponent = mockQuestionnaireElement.injector.get(MockQuestionnaireComponent) as MockQuestionnaireComponent;
    });

    it('should be constructed', () => {
        expect(component).toBeTruthy();
    });

    it('should load the correct questionnaire', () => {
        // then
        expect(mockQuestionnaireComponent.questionnaireName).toBe('grants');
    });
});

@Component({
    selector: 'app-questionnaire',
    template: '<p>Mock Questionnaire Component</p>'
})
class MockQuestionnaireComponent {
    @Input() public questionnaireName: string;
    @Output() public onQuestionnaireComplete: EventEmitter<void> = new EventEmitter<void>();
}