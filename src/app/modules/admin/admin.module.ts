/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AdminRoutingModule, MyRoutings } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddOptionsComponent } from './components/add-options/add-options.component';
import { AddNewOptionComponent } from './components/add-new-option/add-new-option.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { MatSortModule } from '@angular/material/sort';
import { OrderItemDetailsComponent } from './components/order-item-details/order-item-details.component';
import { VerifyPaymentComponent } from './components/verify-payment/verify-payment.component';
import { StartFillingActionComponent } from './components/start-filling-action/start-filling-action.component';
import { FinishFillingActionComponent } from './components/finish-filling-action/finish-filling-action.component';
import { CheckQualityActionComponent } from './components/check-quality-action/check-quality-action.component';
import { QCDoneActionComponent } from './components/qc-done-action/qc-done-action.component';
import { StartPackingActionComponent } from './components/start-packing-action/start-packing-action.component';
import { DonePackingActionComponent } from './components/done-packing-action/done-packing-action.component';
import { StartShippingActionComponent } from './components/start-shipping-action/start-shipping-action.component';
import { FinishShippingActionComponent } from './components/finish-shipping-action/finish-shipping-action.component';
import { OrderHistoryPageComponent } from './components/order-history-page/order-history-page.component';
import { AddNewCatalogComponent } from './components/add-new-catalog/add-new-catalog.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { MatMenuModule } from '@angular/material/menu';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { UpdateStaffComponent } from './components/update-staff/update-staff.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { UpdateProductComponent } from './components/update-product/update-product.component';

import { StaffVerificationComponent } from './components/staff-verification/staff-verification.component';
import { PurchaseManagementComponent } from './components/purchase-management/purchase-management.component';
import { ReceiptManagementComponent } from './components/receipt-management/receipt-management.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminDashboardComponent,
    ProductDialogComponent,
    MyRoutings,
    AddOptionsComponent,
    AddNewOptionComponent,
    OrderManagementComponent,
    OrderItemDetailsComponent,
    VerifyPaymentComponent,
    StartFillingActionComponent,
    FinishFillingActionComponent,
    CheckQualityActionComponent,
    QCDoneActionComponent,
    StartPackingActionComponent,
    DonePackingActionComponent,
    StartShippingActionComponent,
    FinishShippingActionComponent,
    OrderHistoryPageComponent,
    AddNewCatalogComponent,
    StaffListComponent,
    AddStaffComponent,
    UpdateStaffComponent,
    UpdateProductComponent,
 
    StaffVerificationComponent,
       PurchaseManagementComponent,
       ReceiptManagementComponent,
  
   
    
 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSortModule,
    Ng2SearchPipeModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPrintElementModule,


  
  ]
})
export class AdminModule { }
