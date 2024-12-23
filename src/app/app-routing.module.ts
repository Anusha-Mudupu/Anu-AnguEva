/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';
import { MainbodyComponent } from 'src/app/mainbody/mainbody.component';
import { FilterProductListComponent } from 'src/app/Product/filter-product-list/filter-product-list.component';
import { ProductDetailComponent } from 'src/app/Product/product-detail/product-detail.component';
import { ProductListComponent } from 'src/app/Product/product-list/product-list.component';
import { AuthGuardService } from 'src/app/sharedServices/auth-guard.service';
import { ShippingAddressResolverService } from 'src/app/sharedServices/shipping-address-resolver.service';
import { EditShippingAddComponent } from 'src/app/subheader/edit-shipping-add/edit-shipping-add.component';
import { ErrorPageComponent } from 'src/app/subheader/error-page/error-page.component';
import { OrderTrackingComponent } from 'src/app/subheader/order-tracking/order-tracking.component';
import { OtpComponent } from 'src/app/subheader/otp/otp.component';
import { PaymentComponent } from 'src/app/subheader/paymentProcess/payment/payment.component';
import { PaymentSummaryComponent } from 'src/app/subheader/ship-option-select/payment-summary/payment-summary.component';
import { ShipOptionSelectComponent } from 'src/app/subheader/ship-option-select/ship-option-select.component';
import { ShippingAddressComponent } from 'src/app/subheader/shipping-address/shipping-address.component';
import { SubheaderComponent } from 'src/app/subheader/subheader.component';
import { UserProfileComponent } from 'src/app/subheader/user-profile/user-profile.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { ChatComponent } from './customer-bot/chat/chat.component';
import { FAQComponent } from './faq/faq.component';
import { GiftscardsComponent } from './header/giftscards/giftscards.component';
import { CustomerRatingSummaryComponent } from './Product/product-detail/customer-rating-summary/customer-rating-summary.component';
import { ProductReviewComponent } from './Product/product-detail/product-review/product-review.component';
import { RefineSearchComponent } from './Product/refine-search/refine-search.component';
import { LoginDetailsResolverService } from './sharedServices/login-details-resolver.service';
import { OrderDetailResolverService } from './sharedServices/order-detail-resolver.service';
import { CartComponent } from './subheader/cart/cart.component';
import { ContactusComponent } from './subheader/contactus/contactus.component';
import { FavoritesComponent } from './subheader/favorites/favorites.component';
import { LoginComponent } from './subheader/login/login.component';
import { RegisterComponent } from './subheader/register/register.component';
import { ReturnProductComponent } from './subheader/return-product/return-product.component';
import { SearchTileComponent } from './subheader/search/search-tile/search-tile.component';
import { SearchComponent } from './subheader/search/search.component';
import { ViewOrdersComponent } from './subheader/view-orders/view-orders.component';
import { OrderitemFeedbackComponent } from './subheader/orderitem-feedback/orderitem-feedback.component';
import { AddShippingAddressComponent } from './subheader/add-shipping-address/add-shipping-address.component';
import { SelectedAddressComponent } from './subheader/selected-address/selected-address.component';
import { ProductTileComponent } from './Product/product-list/product-tile/product-tile.component';
import { DailyDealsComponent } from './daily-deals/daily-deals.component';
const appRoutes: Routes =
  [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'main'
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [AuthGuardService],
      canActivateChild: [AuthGuardService],
    },
    {
      path: "main",
      component: MainbodyComponent,
      resolve: { userDetails: LoginDetailsResolverService },
      canActivate: [AuthGuardService],
      canActivateChild: [AuthGuardService],
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'header',
        },

        {
          path: 'header',
          component: HeaderComponent,
          canActivate: [AuthGuardService],
          canActivateChild: [AuthGuardService],
          children: [
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'subheader'
            },
            {
              
              path: 'GiftsCards',
              component: GiftscardsComponent
            },
            {
              path: 'subheader',
              component: SubheaderComponent,
              resolve: { orderDetail: OrderDetailResolverService, addressList: ShippingAddressResolverService },
              // canActivate: [AuthGuardService],
              // canActivateChild: [AuthGuardService],
              runGuardsAndResolvers: 'always',
              children: [
                {
                  path: '',
                  pathMatch: 'full',
                  redirectTo: 'products'
                },
                {
                  path: 'payment-done',
                  component: PaymentComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'search-tile',
                  component: SearchTileComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'refine-search',
                  component: RefineSearchComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },

                {
                  path: 'search/:searchTag',
                  component: SearchComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },

                {
                  path: 'products',
                  component: ProductListComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],

                },
                {
                  path: 'trendingProducts',
                  component: DailyDealsComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],

                },
                {
                  path: 'c',
                  component: AddShippingAddressComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],

                },

                {
                  path: 'chat',
                  component: ChatComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'feedback',
                  component: OrderitemFeedbackComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],

                },
                {
                  path: 'cart',
                  component: CartComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },

                {
                  path: 'shippingAddress',
                  component: ShippingAddressComponent,

                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'selectedaddress',
                  component: SelectedAddressComponent,

                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },

                {
                  path: 'editAddress/:id',
                  component: EditShippingAddComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'addshippinaddress',
                  component: AddShippingAddressComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },


                {
                  path: 'productDetail/:product/:skuId',
                  component: ProductDetailComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],

                },
                {
                  path: 'productReview',
                  component: ProductReviewComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],

                },

                {
                  path: 'filterProductList/:id',
                  component: FilterProductListComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],

                },
                {
                  path: 'refine-search',
                  component: RefineSearchComponent,
                },

                {
                  path: 'login',
                  component: LoginComponent,
                  resolve: { userDetails: LoginDetailsResolverService },
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'customerOrders',
                  component: ViewOrdersComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'register',
                  component: RegisterComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'contactus',
                  component: ContactusComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'otp',
                  component: OtpComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'userProfile',
                  component: UserProfileComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'faq',
                  component: FAQComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'cancelOrder/:orderId',
                  component: CancelOrderComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'payment',
                  component: PaymentComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },

                {
                  path: 'favorites',
                  component: FavoritesComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'error-page',
                  component: ErrorPageComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'shipOptionSelect/:id',
                  component: ShipOptionSelectComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],

                },
                {
                  path: 'paymentSummary/:id',
                  component: PaymentSummaryComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'orderTracking/:id',
                  component: OrderTrackingComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'rat',
                  component: CustomerRatingSummaryComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                },
                {
                  path: 'returnProd/:orderId/:skuId',
                  component: ReturnProductComponent,
                  canActivate: [AuthGuardService],
                  canActivateChild: [AuthGuardService],
                }

              ],



            },

          ]
        }

      ]

    }


  ];
@NgModule({
  declarations: [],
  imports: [
   
    RouterModule.forRoot(appRoutes, {
    useHash: true,
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64]
}),
    CommonModule
  ]
})
export class AppRoutingModule { }
