import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByWeek'
})

export class FilterByWeekPipe implements PipeTransform {
  transform(items: any[], fieldToSearch: string, searchValue: number): any[] {
    if (!items) { return []; }
    // tslint:disable-next-line: triple-equals
    if (searchValue == 0) { return items; }

    return items.filter(it => {
      // this.debug ('filtering... ' + JSON.stringify(it) + ' with ' + searchValue);
      // tslint:disable-next-line: triple-equals
      return it[fieldToSearch] == searchValue;
    });
}

}
