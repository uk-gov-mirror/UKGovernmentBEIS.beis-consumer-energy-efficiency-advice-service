import { Component, Input } from '@angular/core';
import {NavigationSuboption} from "../navigation-suboption";

@Component({
  selector: 'app-nav-bar-suboption',
  templateUrl: './nav-bar-suboption.component.html',
  styleUrls: ['./nav-bar-suboption.component.scss']
})
export class NavBarSuboptionComponent {

  @Input() suboptions: NavigationSuboption[];

}
