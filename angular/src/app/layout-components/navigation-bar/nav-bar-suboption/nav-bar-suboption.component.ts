import { Component, OnInit, Input } from '@angular/core';
import {Suboption} from "../Suboptions Class";

@Component({
  selector: 'app-nav-bar-suboption',
  templateUrl: './nav-bar-suboption.component.html',
  styleUrls: ['./nav-bar-suboption.component.scss']
})
export class NavBarSuboptionComponent implements OnInit {

  @Input() suboptionInput: Suboption[];

  constructor() { }

  ngOnInit() {
  }

}
