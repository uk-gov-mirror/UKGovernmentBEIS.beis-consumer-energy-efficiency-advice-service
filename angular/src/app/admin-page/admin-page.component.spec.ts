import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule}   from '@angular/forms';

import { AdminPageComponent } from './admin-page.component';
import {UserStateService} from "../shared/user-state-service/user-state-service";
import {SpinnerAndErrorContainerComponent} from "../shared/spinner-and-error-container/spinner-and-error-container.component";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

describe('AdminPageComponent', () => {
    let component: AdminPageComponent;
    let fixture: ComponentFixture<AdminPageComponent>;

    const userStateServiceStub = {
        joinSession: () => {}
    };

    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AdminPageComponent,
                SpinnerAndErrorContainerComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                {provide: UserStateService, useValue: userStateServiceStub},
                {provide: PageTitleService, useValue: pageTitleStub}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
