import {Component, OnInit} from '@angular/core';
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

@Component({
  selector: 'app-page-not-created',
  templateUrl: './page-not-created.component.html',
  styleUrls: ['./page-not-created.component.scss']
})
export class PageNotCreatedComponent implements OnInit {

  constructor(private pageTitle: PageTitleService) { }

  ngOnInit() {
    this.pageTitle.set('Page not created');
  }
}
