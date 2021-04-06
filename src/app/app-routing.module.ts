import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarComponent } from './components/car/car.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { LoginComponent } from './components/login/login.component';
import { NaviComponent } from './components/navi/navi.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", pathMatch: "full", component: LoginComponent },
  { path: "login", pathMatch: "full", component: LoginComponent },


  {
    path: '',
    component: NaviComponent,
    children: [
      { path: "cars", component: CarComponent,canActivate:[LoginGuard] },
      { path: "cars/brand/:brandId", component: CarComponent,canActivate:[LoginGuard] },
      { path: "cars/color/:colorId", component: CarComponent,canActivate:[LoginGuard] },
      { path: "car/:id", component: CarDetailComponent,canActivate:[LoginGuard] },
      { path: "cars/:brandId/:colorId", component: CarComponent,canActivate:[LoginGuard] },
      { path: "payment/:rental", component: PaymentComponent,canActivate:[LoginGuard] },
      { path: "colorlist", component: ColorListComponent,canActivate:[LoginGuard] },
      { path: "carlist", component:CarListComponent,canActivate:[LoginGuard]},
      { path: "brandlist", component:BrandListComponent,canActivate:[LoginGuard]},
     
    ]
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
