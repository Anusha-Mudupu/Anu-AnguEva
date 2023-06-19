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
import { StartFillingActionComponent } from './components/start-filling-action/start-filling-action.component';
import { FinishFillingActionComponent } from './components/finish-filling-action/finish-filling-action.component';
import { CheckQuantityActionComponent } from './components/check-quantity-action/check-quantity-action.component';
import { QCDoneActionComponent } from './components/qc-done-action/qc-done-action.component';
import { StartPackingActionComponent } from './components/start-packing-action/start-packing-action.component';
import { DonePackingActionComponent } from './components/done-packing-action/done-packing-action.component';
import { StartShippingActionComponent } from './components/start-shipping-action/start-shipping-action.component';
import { FinishShippingActionComponent } from './components/finish-shipping-action/finish-shipping-action.component';





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
    {path:'start-filling-action',component:StartFillingActionComponent},
    {path:'finish-filling-action',component:FinishFillingActionComponent},
    {path:'check-quantity-action',component:CheckQuantityActionComponent},
    {path:'Qc-done-action',component:QCDoneActionComponent},
    {path:'start-packing-action',component:StartPackingActionComponent},
    {path:'done-packing-action',component:DonePackingActionComponent},
    {path:'start-shipping-action',component:StartShippingActionComponent},
    {path:'finish-shipping-action',component:FinishShippingActionComponent},
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