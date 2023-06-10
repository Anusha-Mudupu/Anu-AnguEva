import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSkuDetailComponent } from 'src/app/product-sku-detail/product-sku-detail.component';
import { ProductSkuImagesComponent } from 'src/app/product-sku-images/product-sku-images.component';
import { ProductSkuComponent } from 'src/app/product-sku/product-sku.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsComponent } from './components/products/products.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { ProductSkuOptionsComponent } from 'src/app/product-sku-options/product-sku-options.component';
import { AddOptionsComponent } from './components/add-options/add-options.component';
import { AddNewOptionComponent } from './components/add-new-option/add-new-option.component';
import { SelectGstComponent } from 'src/app/select-gst/select-gst.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { OrderItemDetailsComponent } from './components/order-item-details/order-item-details.component';
import { VerifyPaymentComponent } from './components/verify-payment/verify-payment.component';




const routes: Routes = [

  {path: '', component: AdminDashboardComponent,
  
  children: [
     {path:'home', component: HomeComponent},
    {path:'products',component: ProductsComponent},
    {path:'vendors',component: VendorsComponent},
    {path:'products/:productId', component: ProductViewComponent},
    {path:'product-view/:productId', component:ProductSkuComponent},
    {path:'product-view/:productId/:productSkuId', component:ProductSkuDetailComponent},
    {path:'product-sku-detail/:productSkuId', component:ProductSkuImagesComponent},
    {path:'product-sku-options',component:ProductSkuOptionsComponent},
    {path:'add-options/:productSkuId',component:AddOptionsComponent},
    {path:'addnewoption/:productSkuId',component:AddNewOptionComponent},
    {path:'select-gst/:productSkuId',component:SelectGstComponent},
    {path:'order-management',component:OrderManagementComponent},
    {path:'order-item-details/:orderId',component:OrderItemDetailsComponent},
    {path:'verify-payment/:orderId',component:VerifyPaymentComponent},
   
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