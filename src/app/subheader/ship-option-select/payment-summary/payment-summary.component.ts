/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentDetails, OrderStatus, Order } from 'src/app/data/hero';
import { OrderService } from 'src/app/sharedServices/order.service';
import { SubheaderComponent } from '../../subheader.component';
import { CartComponent } from '../../../subheader/cart/cart.component';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { AppService } from 'src/app/sharedServices/app.service';
import { ThemeService } from 'src/app/theme.service';
import { DatasharingService } from 'src/app/datasharing.service';
import { RefreshService } from 'src/app/refresh.service';
import { SharedServiceService } from 'src/app/shared-service.service';
import { CartService } from 'src/app/cart.service';
@Component({
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent implements OnInit {
  totalAmount: number;
  refreshSubheader: boolean = false;
  public id;
  public allTotal = this.cartcompo.allTotal;
  loading:boolean=true;
  viewOrder: Order;
 
  constructor(private router: Router,
     private getOrderInfoService: GetOrderInfoServiceService,
      private route: ActivatedRoute, private orderService: OrderService,
       private subheadercomp: SubheaderComponent,
        private cartcompo: CartComponent,
         private appService: AppService,
         public themeService:ThemeService,
         private dataSharingService:DatasharingService,
         private refreshService: RefreshService,
         private _orderService: OrderService,
         private sharedService:SharedServiceService,
         private cartService:CartService) {
         
          }
  @Input() details: PaymentDetails;
  orderStatus: OrderStatus[];
  public len = 0;
  public emptyobjectforcart = null;
 
  ngOnInit() {
    
    this.dataSharingService.totalAmount.subscribe(amount => {
      this.totalAmount = amount;
    });
    this.appService.setShowBanner(false);
    this.appService.setShowDeals(false);
    this.appService.setShowMenuIcons(false);
    this.route.params.subscribe(params => {
      this.id = this.route.snapshot.params.id;
      console.log(this.id);
      setTimeout(()=>{
        this.loading=false
      },1000);
    });
    
    this.len = SubheaderComponent.length;
    console.log(this.subheadercomp.length);
    this.subheadercomp.length = 0;
    this.len = this.orderService.cartList.length = 0;
    console.log(this.cartcompo.viewOrder);
    this.cartcompo.viewOrder = null;
    this.getOrderInfoService.set('orderInCart', this.emptyobjectforcart);
    console.log(this.getOrderInfoService.set('orderInCart', this.emptyobjectforcart));
    console.log("details:", this.details);
    console.log(this.details.amount);
    this.viewOrder = <Order>this.getOrderInfoService.get('order');

    // After payment is done, clear the cart
    localStorage.removeItem('order');
   
  }
  orderTracking(id) {
    console.log(id);
    this.router.navigate(['/main/header/subheader/orderTracking', id]);
  }
  continueShopping(selectedOrderId: number){
    this.router.navigate(['/main/header/subheader/products'], { relativeTo: this.route });
    if(selectedOrderId){
    localStorage.removeItem('order');
    }
    var curOrder = this.getOrderInfoService.get('order');
      for (const orderItem of curOrder) {
       
        if (orderItem.id === selectedOrderId) {
          
          localStorage.clear();
         
        
      }
     
    }
    
  }
}
