import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ceil'
})
export class CeilPipe implements PipeTransform {
    transform(html) {
        const number: number = parseFloat(html);
        return !isNaN(number) ? Math.ceil(number) : null;
    }
}
