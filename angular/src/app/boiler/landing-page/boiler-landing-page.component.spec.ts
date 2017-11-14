import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoilerLandingPageComponent } from "./boiler-landing-page.component";
import {CarouselComponent} from "./carousel/carousel.component";
import {CarouselItemComponent} from "./carousel/carousel-item/carousel-item.component";
import {TimesPipe} from "../../shared/times/times.pipe";

describe('BoilerLandingPageComponent', () => {
    let component: BoilerLandingPageComponent;
    let fixture: ComponentFixture<BoilerLandingPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BoilerLandingPageComponent, CarouselComponent, CarouselItemComponent, TimesPipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerLandingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
