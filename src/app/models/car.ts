import { CarImage } from "./carImage";

export interface Car  {
    id : number;
    brandId:number;
    colorId:number;
    modelYear : string;
    dealyPrice : number;
    description : string;
    
}

export interface CarDetail extends Car{
    color : string;
    brand : string;
    modelYear : string;
    dealyPrice : number;
    description : string;
    carImages : CarImage[]

}