import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {WarmerHomeComponent} from "./warmer-home.component";

describe('WarmerHomeComponent', () => {
    let component: WarmerHomeComponent;
    let fixture: ComponentFixture<WarmerHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WarmerHomeComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WarmerHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
