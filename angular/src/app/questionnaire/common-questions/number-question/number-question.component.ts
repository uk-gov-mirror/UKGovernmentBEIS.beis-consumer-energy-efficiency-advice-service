import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-number-question',
    templateUrl: './number-question.component.html',
    styleUrls: ['./number-question.component.scss']
})
export class NumberQuestionComponent {
    isInvalid: boolean;
    textBoxFocused: boolean;
    private _quantity: number;

    @Input() itemsName: string;
    @Input() minQuantity?: number;
    @Input() maxQuantity?: number;
    @Input() step?: number = 1;
    @Input() prefix?: string;

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
        let potentialQuantity = this.quantity + amount;
        if (!this.isValidForMinimum(potentialQuantity)) {
            potentialQuantity = this.minQuantity;
        }
        if (!this.isValidForMaximum(potentialQuantity)) {
            potentialQuantity = this.maxQuantity;
        }
        this.quantity = potentialQuantity;
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

    isValidForMinimum(amount: number) {
        return this.minQuantity === undefined || amount >= this.minQuantity;
    }

    isValidForMaximum(amount: number) {
        return this.maxQuantity === undefined || amount <= this.maxQuantity;
    }

    private quantityIsValid() {
        const isNumber = typeof this.quantity === 'number';
        const isInRange = this.isValidForMinimum(this.quantity) && this.isValidForMaximum(this.quantity);
        const isAnInteger = this.quantity % 1 === 0;
        return isNumber && isInRange && isAnInteger;
    }
}
