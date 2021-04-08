import { CarImage } from "./carImage";

export interface Car  {
    id : number;
    brandId:number;
    colorId:number;
    modelYear : string;
    dealyPrice : number;
    description : string;
    findeksPoint : number;
    
}

export interface CarDetail extends Car{
    color : string;
    brand : string;
    carImages : CarImage[]

}