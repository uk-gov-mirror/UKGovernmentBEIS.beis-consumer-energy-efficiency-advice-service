import {Component, EventEmitter, Input, Output, Renderer2, ViewChild, OnDestroy} from '@angular/core';
import {NavigationStart, Router, NavigationEnd} from "@angular/router";

import {NavigationSuboption} from "./navigation-suboption";
import {RecommendationsService} from "../../shared/recommendations-service/recommendations.service";
import {GoogleAnalyticsService} from "../../shared/analytics/google-analytics.service";
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnDestroy {
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
    recommendationsInPlanSubscription: Subscription;
    routerSubscription: Subscription;

    @Input() shouldExpandNav: boolean;
    @Output() onHideMobileNav: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('homeMenu') homeMenu;
    @ViewChild('rentedMenu') rentedMenu;

    constructor(private renderer: Renderer2,
                private router: Router,
                private recommendationsService: RecommendationsService,
                private googleAnalyticsService: GoogleAnalyticsService) {

        this.recommendationsInPlanSubscription = this.recommendationsService.hasRecommendationsInPlan$
            .subscribe((event) => { this.showYourPlan = event; });

        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart && this.shouldExpandNav) {
                this.hideMobileNav();
            }
        });

        // This component listens to all click and keyup events, and never de-registers
        // for simplicity as it persists for the life of the SPA
        this.renderer.listen('window', 'keyup', event => this.handleKeyup(event));
        this.renderer.listen('window', 'click', event => this.handleClick(event));
    }

    ngOnDestroy(): void {
        this.recommendationsInPlanSubscription.unsubscribe();
        this.routerSubscription.unsubscribe();
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
