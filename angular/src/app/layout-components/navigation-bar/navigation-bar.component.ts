import {Component, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";

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

    private deregisterClickListener: () => void;

    constructor(private renderer: Renderer2,
                private router: Router,
                private recommendationsService: RecommendationsService,
                private googleAnalyticsService: GoogleAnalyticsService) {
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
        if (!inHomeMenu) {
            this.showHomeMenu = false;
        }
        if (!inRentedMenu) {
            this.showRentedMenu = false;
        }
        if (!inRentedMenu && !inHomeMenu && this.deregisterClickListener) {
            this.deregisterClickListener();
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
