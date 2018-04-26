import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule}   from '@angular/forms';

import { AdminPageComponent } from './admin-page.component';
import {UserStateService} from "../shared/user-state-service/user-state-service";
import {SpinnerAndErrorContainerComponent} from "../shared/spinner-and-error-container/spinner-and-error-container.component";

describe('AdminPageComponent', () => {
    let component: AdminPageComponent;
    let fixture: ComponentFixture<AdminPageComponent>;

    const userStateServiceStub = {
        joinSession: () => {}
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
                {provide: UserStateService, useValue: userStateServiceStub}
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
