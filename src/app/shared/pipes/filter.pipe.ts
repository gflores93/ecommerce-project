import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /*
   let item of productList | filter:searchKey:'title'
   value is what is on the left side of the pipe
   then after the name of the pipe the first element is filterString and the second : the propName
  */
  transform(value: any[], filterString: string, propName: string): any[] {
    if (!value || filterString === '' || propName === '') {
      return value;
    }
    return value.filter(((a: any) => a[propName].trim().toLowerCase().includes(filterString.toLowerCase())));
  }

}
