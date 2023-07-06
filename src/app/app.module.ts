import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { AdminModule } from './modules/admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductSkuComponent } from './product-sku/product-sku.component';
import { ProductSkuOptionsComponent } from './product-sku-options/product-sku-options.component';
import { ProductSkuImagesComponent } from './product-sku-images/product-sku-images.component';
import { ProductSkuDetailComponent } from './product-sku-detail/product-sku-detail.component';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SelectGstComponent } from './select-gst/select-gst.component';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TestComponent } from './test/test.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    ProductSkuComponent,
    ProductSkuOptionsComponent,
    ProductSkuImagesComponent,
    ProductSkuDetailComponent,
    SelectGstComponent,
    TestComponent,
  
 
   
  
 
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     AdminModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    NgMultiSelectDropDownModule,
    // Ng2SearchPipeModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    Ng2SearchPipeModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
