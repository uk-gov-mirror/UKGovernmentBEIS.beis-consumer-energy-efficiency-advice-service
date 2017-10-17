import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: 'app-number-question',
    templateUrl: './number-question.component.html',
    styleUrls: ['./number-question.component.scss']
})
export class NumberQuestionComponent implements OnInit {
    isInvalid: boolean;

    @Input() itemsName: string;
    @Input() heading: string;

    @Input() quantity: number;
    @Output() quantityChange = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

    increaseQuantity(amount: number): void {
        this.quantity += amount;
        this.updateQuantity();
    }

    private updateQuantity() {
        if (this.quantity < 1) {
            this.isInvalid = true;
        } else {
            this.isInvalid = false;
            this.quantityChange.emit(this.quantity);
        }
    }
}
