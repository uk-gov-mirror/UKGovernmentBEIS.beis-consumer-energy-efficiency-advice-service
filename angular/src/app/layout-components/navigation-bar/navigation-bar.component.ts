import {Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

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
    showVar1: boolean = false;
    showVar2: boolean = false;
    showVar3: boolean = false;


    @Input() shouldExpandNav: boolean;
    @Output() onHideMobileNav: EventEmitter<null> = new EventEmitter<null>();

    constructor() {
        document.addEventListener("click", this.offClick);
    }

    ngOnInit() {
    }
    offClick() {
        this.showVar1 = false;
        this.showVar2 = false;
        this.showVar3 = false;
    }

    toggleSuboption1() {
        this.showVar1 = !this.showVar1;
    }

    toggleSuboption2() {
        this.showVar2 = !this.showVar2;
    }

    toggleSuboption3() {
        this.showVar3 = !this.showVar3;
    }

    hideSuboptions() {
        this.showVar1 = false;
        this.showVar2 = false;
        this.showVar3 = false;
    }

    hideMobileNav() {
        this.onHideMobileNav.emit();
        this.showVar1 = false;
        this.showVar2 = false;
        this.showVar3 = false;
    }
}
