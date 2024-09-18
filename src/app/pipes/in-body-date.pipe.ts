import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'inBodyDate'
})
export class InBodyDatePipe implements PipeTransform {

    transform(value: string, args?: any): any {
        const year = value.substring(0, 4);
        const month = value.substring(4, 6);
        const day = value.substring(6, 8);

        return `${month}/${day}/${year}`;
    }

}
