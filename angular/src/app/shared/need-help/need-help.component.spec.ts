import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NeedHelpComponent} from './need-help.component';
import {By} from '@angular/platform-browser';
import {UserStateService} from "../user-state-service/user-state-service";

describe('NeedHelpComponent', () => {
    let component: NeedHelpComponent;
    let fixture: ComponentFixture<NeedHelpComponent>;

    const userStateServiceStub = {
        getSessionReference: () => "some reference"
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NeedHelpComponent ],
            providers: [{provide: UserStateService, useValue: userStateServiceStub}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NeedHelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should expand and then collapse when clicked on', () => {
        // given
        const needHelpButton = fixture.debugElement.query(By.css('.need-help')).nativeElement;

        // when
        needHelpButton.click();
        fixture.detectChanges();

        // then
        expect(fixture.debugElement.query(By.css('.contents'))).not.toBeNull();

        // when
        needHelpButton.click();
        fixture.detectChanges();

        // then
        expect(fixture.debugElement.query(By.css('.contents'))).toBeNull();
    });
});
