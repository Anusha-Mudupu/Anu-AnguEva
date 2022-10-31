import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsComponent } from './components/products/products.component';
import { VendorsComponent } from './components/vendors/vendors.component';


const routes: Routes = [
  {path: '', component: AdminDashboardComponent,
  children: [
    {path:'home', component: HomeComponent},
    {path:'products',component: ProductsComponent},
    {path:'vendors',component: VendorsComponent},
    {path:'products/:productId', component: ProductViewComponent},
    {path: '', redirectTo: '/admin/home', pathMatch: 'full'}
  ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

export const MyRoutings = [
  HomeComponent,
  ProductsComponent,VendorsComponent,ProductViewComponent
]