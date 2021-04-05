import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(cars: Car[], filtertext : string): Car[] {
   return cars || filtertext ? cars.filter(car=>
    car.brand.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()) ||
    car.color.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()) ||
    car.description.toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()) ||
    car.modelYear.toString().toLocaleLowerCase().includes(filtertext.toLocaleLowerCase()) ||
    car.dealyPrice.toString().toLocaleLowerCase().includes(filtertext.toLocaleLowerCase())

   ):cars;
  }

}
