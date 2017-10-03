import {Component, OnInit} from '@angular/core';
import {PostcodeEpcService} from "./postcode-epc.service";

@Component({
  selector: 'app-postcode-epc',
  templateUrl: './postcode-epc.component.html',
  styleUrls: ['./postcode-epc.component.scss'],
  providers: [PostcodeEpcService]
})
export class PostcodeEpcComponent implements OnInit {
  postcode: string;
  number: number;

  result: Object;

  constructor(private postcodeEpcService: PostcodeEpcService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.postcodeEpcService.getEpcData(this.postcode, this.number)
      .map(result => this.toArray(result.rows[0]))
      .subscribe(result => this.result = result)
  }

  private toArray(object: Object) {
    let keyArr: any[] = Object.keys(object),
      dataArr = [];

    // loop through the object,
    // pushing values to the return array
    keyArr.forEach((key: any) => {
      dataArr.push({key: key, value: object[key]});
    });

    // return the resulting array
    return dataArr;
  }
}
