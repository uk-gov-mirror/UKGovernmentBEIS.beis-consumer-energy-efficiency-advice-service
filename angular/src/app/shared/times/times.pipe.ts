import {Pipe, PipeTransform} from '@angular/core';
import range from 'lodash-es/range';

@Pipe({
    name: 'times'
})
export class TimesPipe implements PipeTransform {
    transform(value: number): number[] {
        return value > 0 ? range(value) : [];
    }
}
