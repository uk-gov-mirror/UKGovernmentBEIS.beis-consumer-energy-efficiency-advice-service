import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: 'app-number-question',
    templateUrl: './number-question.component.html',
    styleUrls: ['./number-question.component.scss']
})
export class NumberQuestionComponent {
    isInvalid: boolean;
    private _quantity: number;

    @Input() itemsName: string;

    @Input()
    set quantity(value: number) {
        if (value !== undefined) {
            this._quantity = value;
        }
    }
    get quantity(): number {
        return this._quantity;
    }
    @Output() quantityChange = new EventEmitter<number>();

    increaseQuantity(amount: number): void {
        this.quantity += amount;
        this.updateQuantity();
    }

    updateQuantity() {
        if (this.quantityIsValid()) {
            this.isInvalid = false;
            this.quantityChange.emit(this.quantity);
        } else {
            this.isInvalid = true;
            this.quantityChange.emit(undefined);
        }
    }

    private quantityIsValid() {
        const isInRange = this.quantity >= 1 && this.quantity <= 20;
        const isAnInteger = this.quantity % 1 === 0;
        return isInRange && isAnInteger;
    }
}
