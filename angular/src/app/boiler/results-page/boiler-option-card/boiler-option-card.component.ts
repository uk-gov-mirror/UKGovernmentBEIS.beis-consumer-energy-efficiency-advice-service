import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: 'app-boiler-option-card',
  templateUrl: './boiler-option-card.component.html',
  styleUrls: ['./boiler-option-card.component.scss']
})
export class BoilerOptionCardComponent implements OnInit {

  @Input() longDescription: boolean;

  constructor() { }

  ngOnInit() {
  }

}
