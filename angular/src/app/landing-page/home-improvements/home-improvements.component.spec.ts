import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {HomeImprovementsComponent} from "./home-improvements.component";

describe('HomeImprovementsComponent', () => {
    let component: HomeImprovementsComponent;
    let fixture: ComponentFixture<HomeImprovementsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeImprovementsComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeImprovementsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
