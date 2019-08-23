import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})

export class FilterByNamePipe implements PipeTransform {
  transform(items: any[], fieldToSearch: string, searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();

    return items.filter(it => {
      // this.debug ('filtering... ' + JSON.stringify(it) + ' with ' + searchText);
      return it[fieldToSearch].toString().toLowerCase().includes(searchText);
    });
}
}
