import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostcodeEpcQuestionComponent} from './postcode-epc-question.component';
import {FormsModule} from '@angular/forms';
import {ResponseData} from '../response-data';
import {PostcodeEpcQuestion} from './postcode-epc-question';

describe('PostcodeEpcQuestionComponent', () => {
    let component: PostcodeEpcQuestionComponent;
    let fixture: ComponentFixture<PostcodeEpcQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostcodeEpcQuestionComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostcodeEpcQuestionComponent);
        component = fixture.componentInstance;
        responseData = new ResponseData();
        component.question = new PostcodeEpcQuestion(responseData);
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should recognise a correct postcode as valid', () => {
        // given
        component.postcodeInput = 'SW1H 0ET';

        // when
        component.handlePostcodeEntered();

        // then
        expect(component.shouldDisplayValidationErrorMessage).toBeFalsy();
    });

    it('should recognise a correct postcode without space as valid', () => {
        // given
        component.postcodeInput = 'SW1H0ET';

        // when
        component.handlePostcodeEntered();

        // then
        expect(component.shouldDisplayValidationErrorMessage).toBeFalsy();
    });

    it('should recognise a lowercase postcode as valid', () => {
        // given
        component.postcodeInput = 'sw1h 0et';

        // when
        component.handlePostcodeEntered();

        // then
        expect(component.shouldDisplayValidationErrorMessage).toBeFalsy();
    });

    it('should recognise a correct shorter postcode as valid', () => {
        // given
        component.postcodeInput = 's1 0et';

        // when
        component.handlePostcodeEntered();

        // then
        expect(component.shouldDisplayValidationErrorMessage).toBeFalsy();
    });

    it('should recognise an incorrect postcode as invalid', () => {
        // given
        component.postcodeInput = 's1 0e';

        // when
        component.handlePostcodeEntered();

        // then
        expect(component.shouldDisplayValidationErrorMessage).toBeTruthy();
    });

    it('should recognise a postcode input with special characters as invalid', () => {
        // given
        component.postcodeInput = 'SW!H 0ET';

        // when
        component.handlePostcodeEntered();

        // then
        expect(component.shouldDisplayValidationErrorMessage).toBeTruthy();
    });

    it('should set the response when a valid postcode is entered', () => {
        // given
        const postcode = 'SW1H 0ET';
        component.postcodeInput = postcode;

        // when
        component.handlePostcodeEntered();

        // then
        expect(responseData.postCode).toBe(postcode);
    });

    it('should notify of completion when a valid postcode is entered', () => {
        // given
        component.postcodeInput = 'SW1H 0ET';

        // when
        component.handlePostcodeEntered();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});
