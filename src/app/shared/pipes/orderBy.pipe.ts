import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ 
    name: 'orderBy' 
})
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, atributos: string[], directions:number[]): any {

        return records.sort(function (a, b) {
            for (let i = 0; i < atributos.length; i++) {
                if (a[atributos[i]] < b[atributos[i]]) {
                    return -1*directions[i]
                }
                else if (a[atributos[i]] > b[atributos[i]]) {
                    return 1*directions[i];
                }
            }
            return 0;
        });

    };

}