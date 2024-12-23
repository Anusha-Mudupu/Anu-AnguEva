/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GiftscardsComponent } from './header/giftscards/giftscards.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { SearchComponent } from './subheader/search/search.component';
import { LoginComponent } from './subheader/login/login.component';
import { RegisterComponent } from './subheader/register/register.component';
import { FavoritesComponent } from './subheader/favorites/favorites.component';
import { CartComponent } from './subheader/cart/cart.component';
import { DropdownsComponent } from './subheader/dropdowns/dropdowns.component';
import { MainbodyComponent } from './mainbody/mainbody.component';
import { TabsComponent } from './header/tabs/tabs.component';
import { NgModule } from '@angular/core';
import { CorporategiftingComponent } from './header/corporategifting/corporategifting.component';
import { Router, RouterModule } from '@angular/router';
import { JflpaymentsComponent } from './header/jflpayments/jflpayments.component';
import { StorelocatorComponent } from './header/storelocator/storelocator.component';
import { CorporateComponent } from './header/corporate/corporate.component';
import { InvestorsComponent } from './header/investors/investors.component';
import { EventsComponent } from './events/events.component';
import { RefineSearchComponent } from './Product/refine-search/refine-search.component';
import { ContentfilterPipe } from './Product/content-filter.pipe';
import { FilterDataService } from 'src/app/sharedServices/filter-data.service';
import {  NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
// import { GoogleAnalyticsService, NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
// import { Ng5SliderModule } from 'ng5-slider';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DataServiceService } from 'src/app/sharedServices/data-service.service';
import { AlertService } from 'src/app/sharedServices/alert.service';
import { AuthenticationService } from 'src/app/sharedServices/authentication.service';
import { UserService } from 'src/app/sharedServices/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from 'src/app/Product/product-list/product-list.component';
import { ProductTileComponent } from 'src/app/Product/product-list/product-tile/product-tile.component';
import { ProductListService } from 'src/app/Product/product-list/productListService';
import { AlertComponent } from './alert/alert.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';
import { ProductDetailTileComponent } from './Product/product-detail/product-detail-tile/product-detail-tile.component';
import { OrderService } from 'src/app/sharedServices/order.service';
import { ProductDetailService } from 'src/app/sharedServices/product-detail.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { UserProfileComponent } from './subheader/user-profile/user-profile.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from 'src/app/sharedServices/auth-guard.service';
import { ErrorPageComponent } from './subheader/error-page/error-page.component';
import { PaymentComponent } from './subheader/paymentProcess/payment/payment.component';
import { PaymentCaptureService } from 'src/app/subheader/paymentProcess/payment-capture.service';
import { ShippingAddressComponent } from './subheader/shipping-address/shipping-address.component';
import { ShipOptionSelectComponent } from './subheader/ship-option-select/ship-option-select.component';
import { ShippingAddressService } from 'src/app/sharedServices/shipping-address.service';
import { EditShippingAddComponent } from './subheader/edit-shipping-add/edit-shipping-add.component';
import { WindowRef } from 'src/app/subheader/ship-option-select/WindowRef';
import { FilterProductListComponent } from './Product/filter-product-list/filter-product-list.component';
import { FilterProductService } from 'src/app/sharedServices/filter-product.service';
import { OrderTrackingComponent } from './subheader/order-tracking/order-tracking.component';
import { PaymentSummaryComponent } from './subheader/ship-option-select/payment-summary/payment-summary.component';
import { OtpComponent } from './subheader/otp/otp.component';
import { CustomerreviewsComponent } from './Product/product-detail/customerreviews/customerreviews.component';
import { CustomerRatingSummaryComponent } from './Product/product-detail/customer-rating-summary/customer-rating-summary.component';
import { ProductReviewComponent } from './Product/product-detail/product-review/product-review.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { SearchResultRowComponent } from './search-result-page/search-result-row/search-result-row.component';
import { SearchTileComponent } from './subheader/search/search-tile/search-tile.component';
import { ElasticsearchService } from './sharedServices/elastic-serch.service';
import { ContactusComponent } from './subheader/contactus/contactus.component';
import { ViewOrdersComponent } from './subheader/view-orders/view-orders.component';
import { BannerComponent } from './subheader/banner/banner.component';
import { CustomerBotModule } from './customer-bot/customer-bot.module';
import { APP_BASE_HREF } from '@angular/common';
// import { MatDialogModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog'; 
import { LoginDetailsResolverService } from './sharedServices/login-details-resolver.service';
import { CustomerReviewTileComponent } from './Product/product-detail/customerreviews/customer-review-tile/customer-review-tile.component';
import { FavoriteItemComponent } from './subheader/favorites/favorite-item/favorite-item.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './sharedServices/login.service';
import { FooterComponent } from './footer/footer.component';
import { FAQComponent } from './faq/faq.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DailyDealsComponent } from './daily-deals/daily-deals.component';
import { ReturnProductComponent } from './subheader/return-product/return-product.component';
import { MenuIconsComponent } from './menu-icons/menu-icons.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderitemFeedbackComponent } from './subheader/orderitem-feedback/orderitem-feedback.component';
import { NewDeliverAddressComponent } from './new-deliver-address/new-deliver-address.component';
import { AddShippingAddressComponent } from './subheader/add-shipping-address/add-shipping-address.component';
import { SelectedAddressComponent } from './subheader/selected-address/selected-address.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient} from '@angular/common/http';
import {  TranslateStore } from '@ngx-translate/core';
import { NumericOnlyDirective } from './numeric-only.directive';
import { IsNewPipe } from './is-new.pipe';
// import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { environment1 } from 'src/environments/environment';
// import { RouteTrackingService } from './route-tracking.service';
// import { GoogleAnalyticsService } from './google-analytics.service'; 
export function HttpLoaderFactory(HttpClient:HttpClient){
  return new TranslateHttpLoader(HttpClient, "../src/assets/i18n/",".json");
}
@NgModule({ declarations: [
        AppComponent,
        CorporategiftingComponent,
        HeaderComponent,
        JflpaymentsComponent,
        StorelocatorComponent,
        CorporateComponent,
        InvestorsComponent,
        GiftscardsComponent,
        SubheaderComponent,
        SearchComponent,
        LoginComponent,
        RegisterComponent,
        FavoritesComponent,
        CartComponent,
        DropdownsComponent,
        TabsComponent,
        MainbodyComponent,
        ProductListComponent,
        ProductTileComponent,
        EventsComponent,
        RefineSearchComponent,
        ContentfilterPipe,
        SearchResultPageComponent,
        AlertComponent,
        ProductDetailComponent,
        ProductDetailTileComponent,
        UserProfileComponent,
        ErrorPageComponent,
        PaymentComponent,
        ShippingAddressComponent,
        ShipOptionSelectComponent,
        EditShippingAddComponent,
        FilterProductListComponent,
        OrderTrackingComponent,
        PaymentSummaryComponent,
        OtpComponent,
        CustomerreviewsComponent,
        CustomerRatingSummaryComponent,
        ProductReviewComponent,
        SearchResultPageComponent,
        SearchResultRowComponent,
        SearchTileComponent,
        ContactusComponent,
        ViewOrdersComponent,
        BannerComponent,
        CustomerReviewTileComponent,
        FavoriteItemComponent,
        FooterComponent,
        FAQComponent,
        CancelOrderComponent,
        DailyDealsComponent,
        ReturnProductComponent,
        MenuIconsComponent,
        OrderitemFeedbackComponent,
        NewDeliverAddressComponent,
        AddShippingAddressComponent,
        SelectedAddressComponent,
        NumericOnlyDirective,
        NumericOnlyDirective,
        IsNewPipe,
    ],
    bootstrap: [AppComponent], imports: [
        // NgbRatingModule,
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // Ng5SliderModule,
        NgxSliderModule, 
        MatMenuModule,
        SocialLoginModule,
        // NgbModule,
        NgbRatingModule,

        
         MatDialogModule,
        NgxCaptchaModule,
        NgxPaginationModule,
        NgxChartsModule,
        CustomerBotModule,
        NgxGoogleAnalyticsModule.forRoot('G-9EETE0V4WX'),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        })], providers: [
    //  RouteTrackingService,
    //  GoogleAnalyticsService,
        AlertService,
        ProductListService,
        AuthenticationService,
        UserService,
        OrderService,
        DataServiceService,
        [LoginComponent, UserProfileComponent],
        AuthGuardService,
        WindowRef,
        PaymentCaptureService,
        ProductDetailService,
        ShippingAddressService,
        FilterProductService,
        FilterDataService,
        ElasticsearchService,
        LoginDetailsResolverService,
        CookieService,
        CartComponent,
        LoginService,
        
        {
            provide: APP_BASE_HREF, useValue: '/'
        },
        
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('579751429785740')
                    },
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('523052556903-gqfetomkdj0fk8mus3br8ctglkc5jpfk.apps.googleusercontent.com')
                    }
                ]
            } as SocialAuthServiceConfig,
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}