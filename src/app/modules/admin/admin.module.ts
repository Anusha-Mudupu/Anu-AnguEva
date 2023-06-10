import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AdminRoutingModule, MyRoutings } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddOptionsComponent } from './components/add-options/add-options.component';
import { AddNewOptionComponent } from './components/add-new-option/add-new-option.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { MatSortModule } from '@angular/material/sort';
import { OrderItemDetailsComponent } from './components/order-item-details/order-item-details.component';
import { VerifyPaymentComponent } from './components/verify-payment/verify-payment.component';




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
    MatSortModule

  
  ]
})
export class AdminModule { }
