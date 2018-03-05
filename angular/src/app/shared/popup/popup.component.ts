import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
    @Input() text: string;
    @Output() onOkPressed: EventEmitter<null> = new EventEmitter<null>();

    handleOkPressed(): void {
        this.onOkPressed.emit();
    }
}
