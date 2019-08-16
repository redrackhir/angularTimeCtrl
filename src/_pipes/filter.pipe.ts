import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], fieldToSearch: string, searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();

    return items.filter(it => {
      console.log ('filtering... ' + JSON.stringify(it) + ' with ' + searchText);
      return it[fieldToSearch].toString().toLowerCase().includes(searchText);
    });
}
}
