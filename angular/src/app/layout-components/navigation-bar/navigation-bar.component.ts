import {Component, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

import {NavigationSuboption} from "./navigation-suboption";
import {RecommendationsService} from "../../shared/recommendations-service/recommendations.service";

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
    homeSuboptions: NavigationSuboption[] = [
        {
            name: "Heating & Hot Water",
            url: "/your-home/heating&hot-water"
        },
        {
            name: "Windows & Doors",
            url: "/your-home/windows&doors"
        },
        {
            name: "Floors, Walls & Roofs",
            url: "/your-home/floors-walls&roofs"
        },
        {
            name: "Solar Energy",
            url: "/your-home/solar-energy"
        }
    ];
    rentedSuboptions: NavigationSuboption[] = [
        {
            name: "Information for Tenants",
            url: "/information-for-tenants"
        },
        {
            name: "Information for Landlords",
            url: "/information-for-landlords"
        },
    ];
    financeSuboptions: NavigationSuboption[] = [
        {
            name: "Support for Home Improvements",
            url: "/support-for-home-improvements"
        },
        {
            name: "Support for Renewable Heating",
            url: "/support-for-renewable-heating"
        },
        {
            name: "Support for Renewable Electricity",
            url: "/support-for-rewnewable-electricity"
        }
    ];
    showHomeMenu: boolean = false;
    showRentedMenu: boolean = false;
    showFinanceMenu: boolean = false;
    showYourPlan: boolean = false;

    @Input() shouldExpandNav: boolean;
    @Output() onHideMobileNav: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('homeMenu') homeMenu;
    @ViewChild('rentedMenu') rentedMenu;
    @ViewChild('financeMenu') financeMenu;

    private deregisterClickListener: () => void;

    constructor(private renderer: Renderer2,
                private router: Router,
                private recommendationsService: RecommendationsService) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart && this.shouldExpandNav) {
                this.hideMobileNav();
            }
            this.showYourPlan = this.recommendationsService.getRecommendationsInPlan().length > 0;
            // This needs to be regularly checked as it could change quite often.
            // Performing it on a routing change is a suitable time to do this.
        });
    }

    registerSingleClickListener(): void {
        if (this.deregisterClickListener) {
            this.deregisterClickListener();
        }
        this.deregisterClickListener = this.renderer.listen('window', 'click', event => this.handleClick(event));
    }

    handleClick(event): void {
        const clickedElement = event.target;
        const inHomeMenu = clickedElement && this.homeMenu.nativeElement.contains(clickedElement);
        const inRentedMenu = clickedElement && this.rentedMenu.nativeElement.contains(clickedElement);
        const inFinanceMenu = clickedElement && this.financeMenu.nativeElement.contains(clickedElement);
        if (!inHomeMenu && !inRentedMenu) {
            this.showHomeMenu = false;
            this.showRentedMenu = false;
        }
        if (!inHomeMenu && !inFinanceMenu) {
            this.showHomeMenu = false;
            this.showFinanceMenu = false;
        }
        if (!inRentedMenu && !inFinanceMenu) {
            this.showRentedMenu = false;
            this.showFinanceMenu = false;
        }
        if (!inRentedMenu && !inFinanceMenu && !inHomeMenu && this.deregisterClickListener) {
            this.deregisterClickListener();
        }
    }


    hideMobileNav() {
        this.onHideMobileNav.emit();
    }
}
