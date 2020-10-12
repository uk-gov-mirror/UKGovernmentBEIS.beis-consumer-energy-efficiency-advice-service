import {Component, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {NavigationStart, Router, NavigationEnd} from "@angular/router";

import {NavigationSuboption} from "./navigation-suboption";
import {RecommendationsService} from "../../shared/recommendations-service/recommendations.service";
import {GoogleAnalyticsService} from "../../shared/analytics/google-analytics.service";

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
    homeSuboptions: NavigationSuboption[] = [
        {
            name: "Heating & Hot Water",
            url: "/your-home/heating-and-hot-water"
        },
        {
            name: "Windows & Doors",
            url: "/your-home/windows-and-doors"
        },
        {
            name: "Floors, Walls & Roofs",
            url: "/your-home/floors-walls-and-roofs"
        },
        {
            name: "Solar Energy",
            url: "/your-home/solar-energy"
        },
        {
            name: "Smart Meters",
            url: "/pages/smart-meters"
        },
        {
            name: "Understanding Your EPC",
            url: "/pages/what-can-i-learn-from-my-epc"
        }
    ];
    rentedSuboptions: NavigationSuboption[] = [
        {
            name: "Information for Tenants",
            url: "/pages/home-improvements-for-tenants"
        },
        {
            name: "Information for Landlords",
            url: "/pages/information-for-landlords"
        },
    ];

    showHomeMenu: boolean = false;
    showRentedMenu: boolean = false;
    showYourPlan: boolean = false;

    @Input() shouldExpandNav: boolean;
    @Output() onHideMobileNav: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('homeMenu') homeMenu;
    @ViewChild('rentedMenu') rentedMenu;

    constructor(private renderer: Renderer2,
                private router: Router,
                private recommendationsService: RecommendationsService,
                private googleAnalyticsService: GoogleAnalyticsService) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart && this.shouldExpandNav) {
                this.hideMobileNav();
            }
            // This needs to be regularly checked as it could change quite often.
            // Performing it on a routing change is a suitable time to do this.
            this.showYourPlan = this.recommendationsService.getRecommendationsInPlan().length > 0;

            // Existing recommendations are cleared when a questionnaire component is loaded.
            // This happens after the NavigationEnd event and so we need to set this property as false
            // explicitly when navigating to a questionnaire page.
            if (event instanceof NavigationEnd) {
                if (event.url.includes("questionnaire")) {
                    this.showYourPlan = false;
                }
            }
        });
        // This component listens to all click and keyup events, and never de-registers
        // for simplicity as it persists for the life of the SPA
        this.renderer.listen('window', 'keyup', event => this.handleKeyup(event));
        this.renderer.listen('window', 'click', event => this.handleClick(event));
    }

    handleKeyup(event): void {
        this.showHomeMenu = (this.homeMenu.nativeElement.contains(event.target) || this.homeMenu.nativeElement === event.target);
        this.showRentedMenu = (this.rentedMenu.nativeElement.contains(event.target) || this.rentedMenu.nativeElement === event.target);
    }

    handleClick(event): void {
        const clickedElement = event.target;
        const inHomeMenu = clickedElement && this.homeMenu.nativeElement.contains(clickedElement);
        const inRentedMenu = clickedElement && this.rentedMenu.nativeElement.contains(clickedElement);
        if (!inHomeMenu) {
            this.showHomeMenu = false;
        }
        if (!inRentedMenu) {
            this.showRentedMenu = false;
        }
    }

    hideMobileNav() {
        this.onHideMobileNav.emit();
    }

    navLinkClicked(name: string) {
        this.sendEventToAnalytics('nav-link_clicked', name);
    }

    sendEventToAnalytics(eventName: string, eventLabel: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'nav-bar', eventLabel);
    }
}
