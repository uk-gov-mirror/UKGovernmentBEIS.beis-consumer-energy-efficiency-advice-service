import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {LargeVideoCardComponent} from "./large-video-card.component";

describe('LargeVideoCardComponent', () => {
    let component: LargeVideoCardComponent;
    let fixture: ComponentFixture<LargeVideoCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LargeVideoCardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LargeVideoCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
