import {async, ComponentFixture, TestBed} from "@angular/core/testing"

import {CarouselComponent} from "./carousel.component"
import {CarouselItemComponent} from "./carousel-item/carousel-item.component";
import {TimesPipe} from "../../../shared/times/times.pipe";

describe('CarouselComponent', () => {
    let component: CarouselComponent;
    let fixture: ComponentFixture<CarouselComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CarouselComponent, CarouselItemComponent, TimesPipe
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CarouselComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
