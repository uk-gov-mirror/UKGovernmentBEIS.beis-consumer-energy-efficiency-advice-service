import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";

@Component({
    selector: 'app-need-help',
    templateUrl: './need-help.component.html',
    styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit, OnDestroy, AfterViewInit {
    visible: boolean = false;
    expanded: boolean = false;
    margin: number = 0;

    ngOnInit() {
        document.addEventListener('scroll', this.adjustForFooter, true);
        window.addEventListener('resize', this.adjustForFooter, true);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.adjustForFooter();
            this.visible = true;
        });
    }

    ngOnDestroy() {
        document.removeEventListener('scroll', this.adjustForFooter, true);
        window.removeEventListener('resize', this.adjustForFooter, true);
    }

    adjustForFooter = () => {
        const footer = document.querySelector('#page-footer');
        if (!!footer && footer.getBoundingClientRect().top < window.innerHeight) {
            this.margin = window.innerHeight - footer.getBoundingClientRect().top;
        } else {
            this.margin = 0;
        }
    };
}
