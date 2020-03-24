import {Component, OnInit} from '@angular/core';
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private pageTitle: PageTitleService) { }

  ngOnInit() {
    this.pageTitle.set('Page not found');
  }
}
