import { Component, ViewChild, OnInit, OnDestroy, AfterViewChecked } from "@angular/core";

@Component({
    selector: 'app-need-help',
    templateUrl: './need-help.component.html',
    styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('needHelp') container;
    visible: boolean = false;
    expanded: boolean = false;

    ngOnInit() {
        document.addEventListener('scroll', this.adjustForFooter, true);
        window.addEventListener('resize', this.adjustForFooter, true);
    }

    ngAfterViewChecked() {
        this.adjustForFooter();
        setTimeout(() => this.visible = true);
    }

    ngOnDestroy() {
        document.removeEventListener('scroll', this.adjustForFooter, true);
        window.removeEventListener('resize', this.adjustForFooter, true);
    }

    private adjustForFooter = () => {
        const footer = document.querySelector('#page-footer');
        if (!!footer && footer.getBoundingClientRect().top < window.innerHeight) {
            const footerVisibleHeight = window.innerHeight - footer.getBoundingClientRect().top;
            this.container.nativeElement.style['margin-bottom'] = `${footerVisibleHeight}px`;
        } else {
            this.container.nativeElement.style['margin-bottom'] = '0';
        }
    }
}
