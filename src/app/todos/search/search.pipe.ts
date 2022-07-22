import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lmSearch'
})
export class SearchPipe implements PipeTransform {


  transform(list: string[], search?: any): string[] {

    if(!search) {
      return list;
    }

    const searchLower = search.toLowerCase();

    return list.filter(task => {
        return task.toLowerCase().indexOf(searchLower) !== -1;
    });
  }

}
