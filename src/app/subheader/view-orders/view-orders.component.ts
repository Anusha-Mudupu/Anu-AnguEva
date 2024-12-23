/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/sharedServices/order.service';
import { Router } from '@angular/router';
import { currentOrder, Order, UserDetails } from 'src/app/data/hero';
import { AppService } from 'src/app/sharedServices/app.service';
import { InvoiceService } from 'src/app/sharedServices/invoice.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { ViewOrdersService } from 'src/app/sharedServices/view-orders.service';
import { environment } from 'src/environments/environment';
import { DarkModeService } from 'src/app/dark-mode.service';
import { ThemeService } from 'src/app/theme.service';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],

})
export class ViewOrdersComponent implements OnInit {
  userDisplayName = '';
  userId: number;
  public viewOrdersByCust;
  custViewOrder: currentOrder;
  custSubViewOrder: any;
  cancelOrderDetails: any;
  imageBaseUrl: string;
  loading: boolean = true;
  refreshService: any;
  selectedTimeFrame: string = 'Last 30 Days'; // Default to "Last 30 Days"
  constructor(private orderservice: OrderService,
    private router: Router,
    private _appService: AppService,
    private _invoiceService: InvoiceService,
    private _http: HttpClient,
    private getOrderInfoService: GetOrderInfoServiceService,
    private viewOrderService: ViewOrdersService,
    private darkModeService: DarkModeService,
    public themeService: ThemeService) { }

  ngOnInit() {
    this.selectedTimeFrame = 'Last 30 Days';
    this._appService.setShowBanner(false);
    this._appService.setShowDeals(false);
    this._appService.setShowMenuIcons(false);

    this.imageBaseUrl = environment.imagesBaseUrl;
    this.userDisplayName = localStorage.getItem("firstName");
    this.userId = parseInt(localStorage.getItem('userId'));
    console.log("username after login", this.userDisplayName);
    console.log(sessionStorage.getItem('useremail'));
    if (this.userDisplayName == null) {
      this.router.navigate(['/main/header/subheader/login']);

    }
    else {
      this.orderservice.getordersofcustomer(this.userId).subscribe(data => {
        this.refreshService.triggerRefresh();
        this.viewOrdersByCust = <Order[]>data;
        console.log(this.viewOrdersByCust);
      });
    }
    var userId;
    userId = this._appService.getUser().userId;
    var userEmail = localStorage.getItem("useremail");
    console.log("this is localStorage.getItem('useremail') ", localStorage.getItem("useremail"));
    console.log("this is userId in view-orders.component.ts ", userId);

    this.viewOrderService.getUserDetails(userEmail).subscribe(data => {
      console.log("entered into this.viewOrderService.getUserDetails(userEmail) ", data);
      var userDetails: UserDetails;
      console.log("data is ", data.userId);
      this.viewOrders(data.userId, data.months);
    });
  }

  ordertracking(id) {
    console.log(id);
    this.router.navigate(['/main/header/subheader/orderTracking', id]);
  }

  viewOrders(userId: number, months: number) {
    this.loading = true; // Show the loading indicator before making the request
    this._invoiceService.custOrderDetails(userId).subscribe(data => {
      console.log("view orders", data);

      const currentDate = new Date();
      let startDate: Date;

      if (months === 0 || months === undefined) {
        if (this.selectedTimeFrame === 'Last 30 Days') {
          // Display last 30 days' orders
          startDate = new Date(currentDate);
          startDate.setMonth(currentDate.getMonth() - 1); // Last 30 days

          this.custViewOrder = data
            .filter(order => {
              const orderDate = new Date(order.orderdDate); // Assuming orderdDate is a date string in the data
              return orderDate >= startDate && orderDate <= currentDate;
            })
            .sort((a, b) => b.orderId - a.orderId); // Sort by orderId in descending order
        } else {
          // Display all orders when 'months' is 0 or undefined and the selected time frame is not "Last 30 Days"
          this.custViewOrder = data.sort((a, b) => b.orderId - a.orderId); // Sort by orderId in descending order
        }
      } else {
        // Handle other time frame filtering as before
        startDate = new Date(currentDate);
        startDate.setMonth(currentDate.getMonth() - months);

        this.custViewOrder = data
          .filter(order => {
            const orderDate = new Date(order.orderdDate);
            return orderDate >= startDate && orderDate <= currentDate;
          })
          .sort((a, b) => b.orderId - a.orderId); // Sort by orderId in descending order
      }
      

      this.loading = false; // Hide the loading indicator
    }, error => {
      console.error("Error fetching orders:", error);
      this.loading = false; // Ensure loading is stopped in case of error
    });
  }


  viewOrdersForYear(userId: number, year: number) {
    this._invoiceService.custOrderDetails(userId).subscribe(data => {
      if (year === 0 || year === undefined) {
        // Display all orders when 'months' is 0 or undefined
        this.custViewOrder = data;
      }
      this.custViewOrder = data.filter(order => {
        const orderDate = new Date(order.orderdDate);
        return orderDate.getFullYear() === year;
      });

      this.loading = false; // Hide the loading indicator
    });
  }

  selectTimeFrame(timeFrame: string) {
    this.selectedTimeFrame = timeFrame; // Update the selected time frame
    this.loading = true; // Show a loading indicator

    if (timeFrame.startsWith('Last')) {
      // Filter orders based on the selected time frame
      const timeFrameValue = parseInt(timeFrame.split(' ')[1]); // Extract the numeric value (e.g., 30 from "Last 30 Days")

      if (!isNaN(timeFrameValue)) {
        this.viewOrders(this.userId, timeFrameValue);
      }
    } else if (timeFrame.match(/^\d{4}$/)) {
      // Handle specific year selections
      const selectedYear = parseInt(timeFrame);
      if (!isNaN(selectedYear)) {
        this.viewOrdersForYear(this.userId, selectedYear);
      }
    }
  }






  subViewOrders(orderId: number) {
    this.orderservice.viewOrderSubDetails(orderId).subscribe(data => {
      this.custSubViewOrder = data;
      console.log("this.custSubViewOrder value is. ", this.custSubViewOrder);
    });
  }

  downloadInvoice(orderId: number) {
    console.log("orderId is. ", orderId);
    this._invoiceService.downloadInvoice(orderId).subscribe(data => saveAs(data, `invoice.pdf`));
  }

  trackOrder(orderId: number) {
    console.log("You have clicked track Order Button.....");
    this.router.navigate(["/main/header/subheader/orderTracking", orderId]);
  }
  cancelOrder(orderId: number) {
    console.log("You have clicked cancel Order Button", orderId);
    this.router.navigate(["/main/header/subheader/cancelOrder", orderId]);

  }
  returnProd(orderId: number, skuId: number) {
    console.log("you have clicked Return");
    this.router.navigate(["/main/header/subheader/returnProd", orderId, skuId]);
  }
  checkUserLogin() {
    var userName = this._appService.userdetails.firstName;
    console.log("this._appService.getUser().firstName is ", this._appService.userdetails.firstName);

  }
  goToHome() {
    this.router.navigate(["/main/header/subheader/products"]);

  }
  goToFeedback() {
    this.router.navigate(["/main/header/subheader/feedback"]);
  }

  getDetail(productId, productSku) {
    console.log(productId);

    console.log(productSku);

    this.router.navigate(['/main/header/subheader/productDetail', productId, productSku]);
    console.log("productId is. ", productId);
  }

}



