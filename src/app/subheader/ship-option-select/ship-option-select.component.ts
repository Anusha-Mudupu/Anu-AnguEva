/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order, ShippingAddress, PaymentDetails, RazorPayOrder, NotesObj, EmailInvoice, EmailOrderConfirmation, BillingSummery, ApplyCoupon, CouponRes } from 'src/app/data/hero';
import { ShippingAddressService } from 'src/app/sharedServices/shipping-address.service';
import { WindowRef } from 'src/app/subheader/ship-option-select/WindowRef';
import { PaymentCaptureService } from 'src/app/subheader/paymentProcess/payment-capture.service';
import { AppService } from 'src/app/sharedServices/app.service';
import { InvoiceService } from 'src/app/sharedServices/invoice.service';
import { CartShipOptionSelectService } from 'src/app/sharedServices/cart-ship-option-select.service';
import { shareReplay } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { ThemeService } from 'src/app/theme.service';
import { DatasharingService } from 'src/app/datasharing.service';


@Component({
  selector: 'app-ship-option-select',
  templateUrl: './ship-option-select.component.html',
  styleUrls: ['./ship-option-select.component.css']
})
export class ShipOptionSelectComponent implements OnInit {
  @Input() receivedValue: string;
  public viewOrder: Order;
  private currentOrderItem;
  orderId;
  public shippingaddid;
  clickedAddress: ShippingAddress = new ShippingAddress();
  razorpayorderRes;
  @Input() selectedAddress: ShippingAddress;
  shippingAdd: ShippingAddress[] = [];
  TotalAmount;
  title = 'angular-payment-gateway';
  rzp1: any;
  paymentId: String;
  client: any;
  paymentDetails: PaymentDetails;
  custViewOrder: any;
  curOrder: Order;
  orderDetails: Order = new Order();
  bSummery: BillingSummery = new BillingSummery();
  couponCheckDetails: CouponRes = new CouponRes();
  couponMSG: string;
  couponCode: String;
  cartLength: number;
  razorpayInstance: any;
  key_id = "rzp_test_wbkgQ7Kke2UeHE"
  key_secret = "L5gktV0Honmz4XziDu1zpEMt"
  coupon: string;
  coupons = [];
  loading: boolean = true;
  constructor(private ngZone: NgZone,
    private winRef: WindowRef,
    private _paymentCaptureService: PaymentCaptureService,
    private route: ActivatedRoute,
    private shippingAddressService: ShippingAddressService,
    private getOrderInfoService: GetOrderInfoServiceService, private orderservice: OrderService, private router: Router, private _appService: AppService
    , private _invoiceService: InvoiceService,
    private _getOrderInfoService: GetOrderInfoServiceService,
    private _orderService: OrderService,
    private cartShipOptionSelect: CartShipOptionSelectService,
    private orderService: OrderService,
    public themeService: ThemeService,
    private dataSharingService: DatasharingService) {
    this.viewOrder = this.getOrderInfoService.get("order");
    console.log("this.viewOrder in controller is. ", this.viewOrder);


    var component = this.route.snapshot.url[0].path;

    this.cartShipOptionSelect.shipOptionSelectComponentRef(this);

  }

  ngOnInit() {

    this._orderService.getRefreshObservable().subscribe(() => {
      this.billingSummery();
    });

    this._appService.setShowBanner(false);
    console.log(this.razorpayorderRes);
    this.orderService.cartLengthChange.pipe(shareReplay(1)).subscribe(data => {
      this.cartLength = data;
      console.log("value of this.length in (ship-option-select.component.ts) ", this.cartLength);
    });

    this.route.params.subscribe(params => {
      this.shippingaddid = +params['id'];


      var userId = this._appService.userdetails.userId;
      console.log("userId in ShipOptionSelectComponent.ts is. ", userId);
      this.shippingAddressService.getShippingAddressesBE(userId).subscribe(
        (addresses) => {
          setTimeout(() => {
            this.loading = false
          }, 500);
          this.shippingAdd = <ShippingAddress[]>addresses;
          console.log("this is this.shippingAdd. ", this.shippingAdd);
          console.log(this.shippingAdd);
          this.clickedAddress = this.shippingAdd.find(id => id.id == this.shippingaddid);
          console.log("this is this.shippingaddid ", this.shippingaddid);
          console.log("this is clickedAddress.(inside subscribe()) ", this.clickedAddress);
          this.getOrderInfoService.set("address", this.clickedAddress);
        });
      console.log("this is this.selectedAddress ", this.selectedAddress);
      console.log("this is this.getOrderInfoService.get(orderInCart)", this.getOrderInfoService.get('orderInCart'));
      this.currentOrderItem = this.getOrderInfoService.get('orderInCart');
      let ss = this.getOrderInfoService.get('productId');

    });


    this.couponCheckDetails.discountToApply = 0;
    this.billingSummery();
    this._appService.setProductStatus("ShippingAndBillingInfo");
    console.log("this._appService.getProductStatus() is ", this._appService.getProductStatus());
    this.getViewOrder();

    this.orderService.cartLengthChange.pipe(shareReplay(1)).subscribe(data => {
      console.log("value of this.length in (subheader.component.ts) ", data);
    });
  }
  billingSummery() {
    this.orderDetails = <Order>this.getOrderInfoService.get("order");
    var firstName = (JSON.parse(localStorage.getItem("user"))).firstName;
    var userId = parseInt(localStorage.getItem('userId'));
    var orderId: number = 0;
    this.orderService.getOrderId(userId, "open").then(data => {
      var orderId = data;
      console.log("value of orderId is. ", orderId);
      this.
        orderService.getProductFromCart(orderId).subscribe(data => {
          this.orderDetails = <Order>data['order'];
          console.log("this.orderDetails is. ", this.orderDetails);
          this.bSummery = new BillingSummery();
          this.couponCode = localStorage.getItem("couponcode");
          if (!this.couponCode)
            this.couponCode = "";
          this.orderDetails = <Order>this.getOrderInfoService.get("order");

          this.bSummery.totalAmount = this.orderDetails.totalAmount;
          console.log("(shashikanth) this.bSummery.totalAmount is. ", this.bSummery.totalAmount);

          var convertDate = new Date(this.orderDetails.orderSubmitDtTm);
          var month = convertDate.getMonth() + 1;
          this.orderDetails.orderSubmitDtTm = new Date(convertDate.getFullYear() + "-" + month + "-" + convertDate.getDate());
          console.log("date is (shashikanth) ", this.orderDetails.orderSubmitDtTm);

          this.bSummery.shippingCharges = 500;

          this.bSummery.couponCharges = this.couponCheckDetails.discountToApply;

          // this.bSummery.gst = (18 / 100) * (this.bSummery.totalAmount);
          this.bSummery.gst = this.orderDetails.igstAmt;

          this.bSummery.total = this.bSummery.totalAmount + this.bSummery.gst + this.bSummery.shippingCharges - this.bSummery.couponCharges;
          var totalAmount = this.bSummery.total
          this.dataSharingService.setTotalAmount(totalAmount);
        });
    });


  }

  getViewOrder() {
    this.viewOrder = new Order();

    console.log("this.viewOrder in getViewOrder() is. ", this.viewOrder);

    var name: string;
    var userId: number;
    name = this._appService.getUser().firstName;
    name = (JSON.parse(localStorage.getItem("user"))).firstName;
    userId = parseInt(localStorage.getItem("userId"));
    console.log("name in OrderDetailResolverService is. ", name);

    this.orderservice.getOrderId(userId, 'OPEN').then(orderId => {

      this.orderservice.getProductFromCart(orderId).subscribe(data => {
        this._appService.setOrderDetail(data);
        this.viewOrder = <Order>data['order'];
        this.getOrderInfoService.set("order", this.viewOrder);
        console.log("viewOrderDetails in getViewOrder() are. ", this.viewOrder);
        console.log("customerId in viewOrder is. ", this.viewOrder.customerName);
      });
    });
    console.log("viewOrderDetails outside(subscribe()) ", this.getOrderInfoService.get("order"));
  }

  createRazorPayOrder() {
    var inputParam1 = new NotesObj();
    inputParam1.orderId = this.getOrderInfoService.get('order').id;
    var inputParam = new RazorPayOrder();

    inputParam.amount = 1 * 100;
    inputParam.currency = "INR";
    inputParam.orderId = this.getOrderInfoService.get('order').id;
    inputParam.notes = inputParam1
    this.router.navigate(["/main/header/subheader/payment-done"])
    this.getOrderInfoService.clearOrderInfo();

    console.log("this is inputparam. ", inputParam);
    this.shippingAddressService.createRazorPayOrderBE(inputParam).subscribe(
      data => {
        this.razorpayorderRes = <RazorPayOrder>data;
        console.log("this.razorpayorderRes ", this.razorpayorderRes);
        var options = {

          "key": "rzp_test_wbkgQ7Kke2UeHE",
          "order_id": this.razorpayorderRes.id,
          "order_id2": this.getOrderInfoService.get('orderId'),
          'name': 'DMANTZ technologies pvt ltd',
          'description': 'product description',
          'image': './assets/images/formalshirt.jpeg',
          'payment_capture': 1,
          'handler': this.paymentCapture.bind(this),
          'redirect': false,
          'prefill': {
            "name": "DMANTZ technologies pvt ltd",
            "email": "harsha.akavaram@gmail.com"
          },
          "modal": {
            "ondismiss": () => {
                // Redirect to cart page when payment is canceled
                this.router.navigate(["/main/header/subheader/cart"]);
            }
        },
          //   "modal": {
          //     "ondismiss": function(){
          //       window.location.replace("http://localhost:4200/#/main/header/subheader/cart");
          //      }
          // },
          'notes': {
            'address': this.clickedAddress,
          },
          'theme': {
            'color': '#F37254'
          }


        };



        this.rzp1 = new this.winRef.nativeWindow.Razorpay(options);
        console.log("new this.winRef.nativeWindow.Razorpay(options) is. ", this.rzp1);
        this.rzp1.open();


      });

  }
  paymentCapture(response) {

    this.paymentId = response.razorpay_payment_id;
    console.log("payment id " + this.paymentId);
    this.whatsappNotificationOnOrderConfirmation();
    this.emailWithAttachmentAndOrderConfirmation();
    this._paymentCaptureService.getPaymentDetails(this.paymentId).subscribe(data => {
      this.paymentDetails = data;
      console.log("this is this.paymentDetails ", this.paymentDetails);
      this.forwardDetails(this.paymentDetails);
      console.log("this is this.paymentDetails.amount ", this.paymentDetails.amount);

      if (this.paymentDetails.status == "authorized") {
        this.getOrderInfoService.set('order', undefined);

        this._appService.setProductStatus("payment-done");
        console.log("this._appService.getProductStatus() ", this._appService.getProductStatus());

      }
    });



  }
  forwardDetails(paymentDetails) {
    localStorage.removeItem('order');

    console.log("this is paymentDetails. ", paymentDetails);
    console.log("this.getOrderInfoService.get('orderId') is.", this.getOrderInfoService.get('orderId'));
    console.log("paymentDetails.order_id is. ", paymentDetails.order_id);
    this.ngZone.run(() => this.router.navigate(['/main/header/subheader/paymentSummary', this.getOrderInfoService.get('order').orderItemObj[0].order_id])).then();
    console.log("paymentDetails are. ", paymentDetails);
    this.getOrderInfoService.clearOrderInfo();
  }


  emailWithAttachmentAndOrderConfirmation() {
    var userId;
    userId = this._appService.getUser().userId;

    console.log("this._appService.getUser().user_id is. ", userId);
    this._invoiceService.custOrderDetails(userId).subscribe(data => {
      this.custViewOrder = data;
      console.log("this.custViewOrder value is. ", this.custViewOrder);
      this.curOrder = this._getOrderInfoService.get("order");
      console.log("this.curOrder is. ", this.curOrder);
      var orderId = this.curOrder.orderItemObj[0].order_id;
      console.log("this is current orderId is. ", orderId);

      this._invoiceService.getEmailIdByUserId(userId).subscribe(id => {
        var email: any = id;
        console.log("userId is.", userId);
        console.log("emailId in getEmailIdByUserId() is. ", email);
        var emailInvoice = new EmailInvoice();
        emailInvoice.orderId = orderId;
        emailInvoice.email = email.emailId;
        emailInvoice.subject = "this is subject of this mail.";
        emailInvoice.body = "this is body of the mail.";

        this._invoiceService.emailWithAttachment(emailInvoice).subscribe();


        var orderConfirmation = new EmailOrderConfirmation();

        orderConfirmation.orderId = orderId;
        orderConfirmation.emailTo = email.emailId;
        orderConfirmation.subject = "mail from TBD";
        console.log("orderId for orderConfirmation is. ", orderConfirmation.orderId);
        console.log("emailTo is. ", orderConfirmation.emailTo);
        this._invoiceService.emailWithOrderConfirmation(orderConfirmation).subscribe();
      });

    });


  }


  /*   whatsappNotificationOnOrderConfirmation() {
      this.curOrder = this._getOrderInfoService.get("order");
      console.log("this.curOrder is. ", this.curOrder);
      var orderId = this.curOrder.orderItemObj[0].order_id;
      console.log("this is current orderId is. ", orderId);
      this._invoiceService.whatsappNotificationwithOrderConfirmation(orderId).subscribe((data: any) => {
        console.log('whatsapp notifiaction sent successfully',data)
      })
    } */

      whatsappNotificationOnOrderConfirmation() {
        this.curOrder = this._getOrderInfoService.get("order");
        var orderId = this.curOrder.orderItemObj[0].order_id;
    
    
        let orderDetailsMessage = {
          message: `🛒 *Order Confirmation*\n\nThank you for your order!\n\n` +
            `🆔 *Order ID:* ${orderId}\n\n` +
            `📦 *Order Summary:*\n`,
          orderId: orderId
        };
    
    
        this.curOrder.orderItemObj.forEach((item: any, index: number) => {
          orderDetailsMessage.message += `\n*Item ${index + 1}:*\n` +
            `🔹 *Product:* ${item.productName}\n` +
            `🔹 *Quantity:* ${item.quantity}\n` +
            `🔹 *Price:* ₹${item.price.toFixed(2)}\n`;
        });
    
        orderDetailsMessage.message += `\n💳 *Total Price:* ₹${this.curOrder.finalAmount.toFixed(2)}\n\n` +
          `🛍️ We hope you enjoy your purchase!😊 \n Visit us anytime at *Evadella* website (https://uat.evadella.com/#/main/header/subheader/products) for more products.\n` +
          `Feel free to reach out if you have any questions😍.`;
    
    
        this._invoiceService.whatsappNotificationwithOrderConfirmation(orderDetailsMessage)
          .subscribe((data: any) => {
            console.log('WhatsApp notification sent successfully', data);
          });
      }

  applyCouponChange(data) {
    this.coupon = data.value;
    console.log("this.coupon", this.coupon)
    console.log("entered into applyCoupon(). ");
    console.log("localStorage", localStorage)
    var couponCode = data.value

    console.log("entered Apply Coupon value is. ", couponCode);
    var orderId = 0, userId = 0;
    var userName = "";

    userId = (JSON.parse(localStorage.getItem("user"))).userId
    console.log("userId", userId)
    userName = localStorage.getItem("firstName");
    console.log("userName", userName)


    this.orderService.getOrderId(userId, "open").then(data => {
      orderId = data;
      console.log("orderId of perticular user is. ", orderId);
      var coupon_var = new ApplyCoupon();
      coupon_var.couponCode = couponCode;
      coupon_var.orderId = orderId;
      coupon_var.userId = userId;
      console.log("coupon_var" + coupon_var.couponCode + coupon_var.orderId + coupon_var.userId)



      this.orderService.applyCoupon(coupon_var).subscribe(data => {
        console.log("entered into this.orderService.applyCoupon(.).subscribe(.) ");
        console.log("coupon details are. ", data);
        this.couponCheckDetails = data;
        this.bSummery.couponCharges = this.couponCheckDetails.discountToApply;
        var orderData = this._orderService.getProductFromCart(orderId);
        this._appService.setOrderDetail(orderData);
        console.log("orderData", orderData)
        console.log("entered into getProductFromCart(.) ");
        var updateOrderDetails: Order = new Order();


        updateOrderDetails = <Order>this.getOrderInfoService.get("order");
        console.log("this._appService.getOrderDetails is. ", this._appService.getOrderDetail());

        console.log("updateOrderDetails is. ", updateOrderDetails);

        this.getOrderInfoService.set("order", updateOrderDetails);


        updateOrderDetails.totalAmount = this.bSummery.totalAmount;
        this.couponTEXT();

        if (this.couponCheckDetails.reason != 'valid') {

          this.couponMSG = this.couponCheckDetails.reason;

          console.log("values in this.orderDetails are. ", this.orderDetails);
          this.orderDetails = this.getOrderInfoService.get("order");
          this.bSummery.shippingCharges = 50;
          this.bSummery.couponCharges = 0;
          // this.bSummery.gst = (18 / 100) * (this.bSummery.totalAmount);
          this.bSummery.gst = this.orderDetails.igstAmt;
          this.bSummery.total = this.bSummery.totalAmount + this.bSummery.gst + this.bSummery.shippingCharges - this.bSummery.couponCharges;
        }

        if (this.couponCheckDetails.reason == 'valid') {
          this.couponMSG = this.couponCheckDetails.reason;
          if (this.couponCheckDetails.couponApplied == 'already applied') {
            console.log("this is already applied. ");
            this.bSummery.couponCharges = 0;
            this.couponMSG = this.couponCheckDetails.couponApplied;
            this.bSummery.totalAmount = updateOrderDetails.totalAmount;
            this.orderDetails = <Order>this.getOrderInfoService.get("order");
            this.bSummery.shippingCharges = 500;
            this.bSummery.couponCharges = this.couponCheckDetails.discountToApply;
            // this.bSummery.gst = (18 / 100) * (this.bSummery.totalAmount);
            this.bSummery.gst = this.orderDetails.igstAmt;
            this.bSummery.total = this.bSummery.totalAmount + this.bSummery.gst + this.bSummery.shippingCharges - this.bSummery.couponCharges;
          }
          else {
            console.log("this is not already applied");
            localStorage.setItem("couponcode", couponCode);
            this.couponMSG = this.couponCheckDetails.couponApplied;
            this.orderDetails = <Order>this.getOrderInfoService.get("order");
            this.bSummery.couponCharges = this.couponCheckDetails.discountToApply;
            this.bSummery.totalAmount = updateOrderDetails.totalAmount;
            this.bSummery.shippingCharges = 500;
            // this.bSummery.gst = (18 / 100) * (this.bSummery.totalAmount);
            this.bSummery.gst = this.orderDetails.igstAmt;
            this.bSummery.total = this.bSummery.totalAmount + this.bSummery.gst + this.bSummery.shippingCharges - this.bSummery.couponCharges;
          }
        }
        this.orderDetails.totalAmount = updateOrderDetails.totalAmount;
        this.orderDetails = updateOrderDetails;
        this.getOrderInfoService.set("order", this.orderDetails);
        console.log("this.orderDetails is. ", this.orderDetails);
      });
    });

  }
  couponTEXT() {

    this.couponMSG = this.couponCheckDetails.couponApplied;
  }

  displayStyle = 'none'
  openPopup() {
    //getting all the coupons available
    this.orderService.getCoupons().subscribe(data => {
      this.coupons = data;
      console.log("all coupons are ", data);
    });
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  test(this) {
    console.log(this.value)
  }

  f1(test) {
    var clickedvalue = (document.getElementById('button') as HTMLInputElement).value
    console.log(test.value)
  }
}
