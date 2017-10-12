import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PostcodeComponent} from './postcode.component';
import {FormsModule} from "@angular/forms";

describe('PostcodeComponent', () => {
    let component: PostcodeComponent;
    let fixture: ComponentFixture<PostcodeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostcodeComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostcodeComponent);
        component = fixture.componentInstance;
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
});
