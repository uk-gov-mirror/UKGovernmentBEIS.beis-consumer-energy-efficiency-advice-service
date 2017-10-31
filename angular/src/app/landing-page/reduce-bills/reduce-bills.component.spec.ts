import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ReduceBillsComponent} from "./reduce-bills.component";

describe('ReduceBillsComponent', () => {
    let component: ReduceBillsComponent;
    let fixture: ComponentFixture<ReduceBillsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ReduceBillsComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReduceBillsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
