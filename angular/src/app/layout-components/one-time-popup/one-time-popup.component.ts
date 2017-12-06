import { Component, OnInit } from '@angular/core';
import {CookieService} from "ng2-cookies";

@Component({
  selector: 'app-one-time-popup',
  templateUrl: './one-time-popup.component.html',
  styleUrls: ['./one-time-popup.component.scss']
})
export class OneTimePopupComponent implements OnInit {

  private static readonly ALPHA_ALERT_COOKIE_NAME = 'beis-dceas_alpha-alert-provided';

  isDisplayed: boolean = false;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    // TODO: remove this alert which applies to Alpha only
    if(!this.cookieService.check(OneTimePopupComponent.ALPHA_ALERT_COOKIE_NAME)) {
      this.isDisplayed = true;
      this.cookieService.set(OneTimePopupComponent.ALPHA_ALERT_COOKIE_NAME, 'true');
    }
  }

  handleOkPressed() {
    this.isDisplayed = false;
  }
}
