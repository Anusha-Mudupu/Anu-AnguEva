/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { StepsData, TimelineFlowOptions, DEFAULT_STATUS_VALUES } from 'src/app/subheader/order-tracking/order-tracking.options';
import { OrderStatus } from 'src/app/data/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/sharedServices/order.service';
import { AppService } from 'src/app/sharedServices/app.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})

export class OrderTrackingComponent implements OnInit {
  @Input() orderstatus: OrderStatus;
  @Input() options: TimelineFlowOptions = DEFAULT_STATUS_VALUES;
  private id;
  orderStatus: OrderStatus;
  orderStatusChanged: OrderStatus;
  Response: any;
  data: any[] = [{
    step: 'PAID',
    status: 'Completed'
  }, {
    step: 'Order confirmed',
    status: 'Completed'
  }, {
    step: 'In-Transit',
    status: 'Completed'
  }, {
    step: 'Out For Delivery',
    status: 'Not Started'
  }, {
    step: 'Delivered',
    status: 'Not Started'
  }];
  private index;
  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router, private appService: AppService,) { }

  ngOnInit() {
    this.appService.setShowBanner(false);
    this.appService.setShowDeals(false);
    this.appService.setShowMenuIcons(false);

    this.route.params.subscribe(params => {
      this.id = this.route.snapshot.params.id;
      console.log("this.id is. ", this.id);
      this.orderService.getOrderStatus2(this.id).subscribe(
        response => {
          this.orderStatusChanged = <OrderStatus>response;
          console.log("this.orderStatusChanged is. ", this.orderStatusChanged);

          for (status in this.data.find(item => item.status).step) {
            this.index = this.data.indexOf(this.data.find(item => item.step == this.orderStatus.statusCd));
            if (this.orderStatus.statusCd == this.data.find(item => item.step == this.orderStatus.statusCd).step) {
              if (this.index == 4) {
                let st = this.data[this.index];
                st.status = "Completed";
                let forthlabel = this.data[this.index - 1];
                forthlabel.status = "Completed";
              } else {
                let st = this.data[this.index];
                st.status = "Completed";
                let stInc = this.data[this.index + 1];
                stInc.status = "In Progress";
                let stInc1 = this.data[this.index + 2];
                stInc1.status = "Not Started"

              }
            }
          }
        }
      )
    });
  }

  getStyles(step, type) {
    const statusRec: any = this.options.statuses.find(item => item.text === step.status);
    const styles = {};
    if (statusRec && statusRec.styles) {
      switch (type) {
        case 'icon-styles':
          if (statusRec.styles.iconPath) {
            styles['content'] = `url(${statusRec.styles.iconPath})`;
          }
          if (statusRec.styles.textColor) {
            styles['color'] = statusRec.styles.textColor;
          }
          styles['font-weight'] = 'bold';
          break;
        case 'text-styles':
          if (statusRec.styles.textColor) {
            styles['color'] = statusRec.styles.textColor;
          }
          break;
        case 'icon-class':
          if (statusRec.styles.iconClass) {
            styles[statusRec.styles.iconClass] = true;
          }
          break;
        case 'connector-styles':
          if (statusRec.styles.borderColor) {
            styles['border-left-color'] = statusRec.styles.borderColor;
          }
          break;
      }
    }
    return styles;
  }
  cancelOrder() {
    console.log("You have clicked track Order Button");
    this.router.navigate(["/main/header/subheader/cancelOrder"]);
  }
  gotoOrders(){
    this.router.navigate(["/main/header/subheader/customerOrders"])
  }
}
