import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class PageTitleService {
    constructor(private titleService: Title) {
    }

    public set(title: string) {
        if (title) {
            this.titleService.setTitle(`${title} — Simple Energy Advice`);
        } else {
            this.titleService.setTitle('Simple Energy Advice');
        }
    }
}
