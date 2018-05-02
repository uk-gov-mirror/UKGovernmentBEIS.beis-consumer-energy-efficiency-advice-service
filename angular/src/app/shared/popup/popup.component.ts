import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * This component has accessibility issues; please don't use it except
 * for debug / or "to do" markers.
 */
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
