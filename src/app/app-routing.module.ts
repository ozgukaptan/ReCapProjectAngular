import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: CarComponent },


  {
    path: '',
    component: NaviComponent,
    children: [
      { path: "", pathMatch: "full", component: CarComponent },
      { path: "cars", component: CarComponent },
      { path: "cars/brand/:brandId", component: CarComponent },
      { path: "cars/color/:colorId", component: CarComponent },
      { path: "car/:id", component: CarDetailComponent },
      { path: "cars/:brandId/:colorId", component: CarComponent },
      { path: "payment/:rental", component: PaymentComponent },
    ]
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
