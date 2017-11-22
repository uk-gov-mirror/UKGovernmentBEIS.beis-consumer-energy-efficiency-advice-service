import {Component, Input} from "@angular/core";
import {BoilerType} from "../../boiler-types-service/boiler-type";

@Component({
  selector: 'app-boiler-option-card',
  templateUrl: './boiler-option-card.component.html',
  styleUrls: ['./boiler-option-card.component.scss']
})
export class BoilerOptionCardComponent {
  @Input() boiler: BoilerType;
}
