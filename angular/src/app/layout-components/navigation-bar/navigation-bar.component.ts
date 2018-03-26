import {Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';

import {Suboption} from "./Suboptions Class";

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
    suboptionAbout: Suboption[] = [
        {
            name: "Mission statement",
            url: "/mission-statement"
        },
        {
            name: "FAQ",
            url: "/FAQ"
        },
        {
            name: "Help section",
            url: "/help-section"
        },
        {
            name: "Contact",
            url: "/contact"
        }
    ];
    suboptionHome: Suboption[] = [
        {
            name: "Heating & Hot Water",
            url: "/Heating&Hot-Water"
        },
        {
            name: "Insulation & Glazing",
            url: "/Insulation&Glazing"
        },
        {
            name: "Renewable Energy",
            url: "/Renewable-Energy"
        }
    ];
    suboptionRights: Suboption[] = [
        {
            name: "Tenants",
            url: "/Tenants"
        },
        {
            name: "Landlords",
            url: "/Landlords"
        }
    ];
    showAboutMenu: boolean = false;
    showHomeMenu: boolean = false;
    showRightsMenu: boolean = false;


    @Input() shouldExpandNav: boolean;
    @Output() onHideMobileNav: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('aboutMenu') aboutMenu;
    @ViewChild('homeMenu') homeMenu;
    @ViewChild('rightsMenu') rightsMenu;

    private deregisterClickListener: () => void;

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
    }

    clickOffNavBar(): void {
        if (this.deregisterClickListener) {
            this.deregisterClickListener();
        }
        this.deregisterClickListener = this.renderer.listen('window', 'click', event => this.handleClick(event));
    }

    handleClick(event): void {
        const clickedElement = event.target;
        const inAboutMenu = clickedElement && this.aboutMenu.nativeElement.contains(clickedElement);
        const inHomeMenu = clickedElement && this.homeMenu.nativeElement.contains(clickedElement);
        const inRightsMenu = clickedElement && this.rightsMenu.nativeElement.contains(clickedElement);
        if (!inAboutMenu && !inHomeMenu) {this.showAboutMenu = this.showHomeMenu = false; }
        if (!inAboutMenu && !inRightsMenu) {this.showAboutMenu = this.showRightsMenu = false; }
        if (!inHomeMenu && !inRightsMenu) {this.showHomeMenu = this.showRightsMenu = false; }
    }

    toggleAboutMenu() {
        this.showAboutMenu = !this.showAboutMenu;
    }

    toggleHomeMenu() {
        this.showHomeMenu = !this.showHomeMenu;
    }

    toggleRightsMenu() {
        this.showRightsMenu = !this.showRightsMenu;
    }

    hideMobileNav() {
        this.onHideMobileNav.emit();
    }
}
