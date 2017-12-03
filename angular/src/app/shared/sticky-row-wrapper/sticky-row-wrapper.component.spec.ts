import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {StickyRowWrapperComponent} from "./sticky-row-wrapper.component";

describe('StickyRowWrapperComponent', () => {
    let fixture: ComponentFixture<StickyRowWrapperComponent>;
    let component: StickyRowWrapperComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StickyRowWrapperComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StickyRowWrapperComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});