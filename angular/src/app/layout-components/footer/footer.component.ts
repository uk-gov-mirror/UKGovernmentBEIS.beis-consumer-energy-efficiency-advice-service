import {Component} from '@angular/core';
import Config from '../../config';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    phoneNumber: string = Config().phoneNumber;

    getPhoneNumberForLink() {
        return this.phoneNumber.replace(/\s/g, '');
    }
}
