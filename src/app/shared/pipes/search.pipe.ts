import { Pipe, PipeTransform } from '@angular/core';
import { ProductsData } from '../../core/models/products';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(product:ProductsData[] , word:string): ProductsData[] {
    return product.filter( (item)=> item.title.toLocaleLowerCase().includes(word.toLowerCase()) ) ;
  }

}
