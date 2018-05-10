import { Component, EventEmitter, Input, Output} from '@angular/core';
import padStart from 'lodash-es/padStart';

@Component({
    selector: 'app-contents-table',
    templateUrl: './contents-table.component.html',
    styleUrls: ['./contents-table.component.scss']
})
export class ContentsTableComponent {
    @Input() headings: string[];
    @Output() onHeadingClicked: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    headingClicked(index: number) {
        this.onHeadingClicked.emit(index);
    }

    getFormattedNumberFromIndex(index: number): string {
        const stepNumber = index + 1;
        return padStart(stepNumber.toString(), 2, '0');
    }
}
