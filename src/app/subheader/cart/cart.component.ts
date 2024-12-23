/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input, EventEmitter, NgZone } from '@angular/core';
import { Product, Order, OrderItem, CreateOrderResponse, FilterCriteriaObj, FilterCriteria, PaymentDetails, IAlert, UpdateOrderResponse, UpdateQuantity, UpdateQuantityRequest, CouponInfo, CouponRes, DeleteItem, LoginDetails, UpdateItemObj, cartItems, orderImage } from '../../data/hero';
import { ProductListService } from '../../Product/product-list/productListService';
import { OrderService } from '../../sharedServices/order.service';
import { NavigationEnd, Router } from '@angular/router';
import { error, Alert } from 'selenium-webdriver';
import { ProductDetailComponent } from '../../Product/product-detail/product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesService } from 'src/app/sharedServices/messages.service';
import { AuthGuardService } from 'src/app/sharedServices/auth-guard.service';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { PaymentCaptureService } from 'src/app/subheader/paymentProcess/payment-capture.service';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/sharedServices/app.service';
import { LoginService } from 'src/app/sharedServices/login.service';
import { LoginComponent } from '../login/login.component';
import { shareReplay } from 'rxjs/operators';
import { CartShipOptionSelectService } from 'src/app/sharedServices/cart-ship-option-select.service';
import { ShipOptionSelectComponent } from '../ship-option-select/ship-option-select.component';
import { environment } from 'src/environments/environment';
import { InvoiceService } from 'src/app/sharedServices/invoice.service';
import { HttpClient } from '@angular/common/http';
import { RefreshService } from 'src/app/refresh.service';
import { CartService } from 'src/app/cart.service';
import { UserService } from 'src/app/sharedServices/user.service';
import { EmailSubscriptionService } from 'src/app/sharedServices/email-subscription.service';
import { ThemeService } from 'src/app/theme.service';



@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    showPop: boolean = false;


    private couponInfo: CouponInfo;
    public viewOrder;
    private Id;
    couponName: string;
    public itemsaddedcount = 0;
    public productAddedTocart: any;
    allTotal: number;
    cartItemCount: number = 0;
    public cartLengthChange = new Subject();
    public alert: Array<IAlert> = [];
    productitem;
    orderId;
    private currentOrderItem;
    private userDetails: LoginDetails;
    private user: LoginDetails;
    private couponResponse: any;
    private customerName = '';
    orderDetails: Order;
    imageBaseUrl: string;
    shipOptionSelect: ShipOptionSelectComponent;
    totalAmount: 0;
    length: number;
    loading: boolean = true;


    buttonLabel: string = 'Subscribe';
    userId: number;

    userProfile: any;
    constructor(private ngZone: NgZone, private _paymentCaptureService: PaymentCaptureService, private getOrderInfoService: GetOrderInfoServiceService, private authguardService: AuthGuardService, private productListService: ProductListService, private modalService: NgbModal, private messageService: MessagesService, private fb: UntypedFormBuilder, private route: ActivatedRoute, private orderservice: OrderService, private router: Router,
        private orderService: OrderService, private appService: AppService,
        private _orderService: OrderService,
        private cartShipOptionSelect: CartShipOptionSelectService,
        private refreshService: RefreshService,
        public themeService: ThemeService,
        private cartService: CartService, private _userService: UserService, private emailSubscriptionService: EmailSubscriptionService) {
        this.userDetails = appService.getUser();

        this.customerName = this.userDetails.firstName;
        // this below only line is added by shashikanth in 19-jan-2022
        this.customerName = localStorage.getItem("firstName");
        appService.setCartObject(this);

        this.userId = this.appService.getUser().userId;
        console.log("UserId is:", this.userId);
        this._userService.getUserProfile(this.userId).subscribe(data => {
            this.userProfile = data;
            console.log("getUserProfile is.", this.userProfile);




        });
    }

    ngOnInit() {
        gtag("event", "view_cart", {
            currency: "USD",
            value: 30.03,
            items: [
              {
                item_id: this.orderDetails,
              }
            ]
          });
       
        this.refreshService.refresh$.subscribe(() => {
            this.length;
            location.reload();

        });
        this.orderService.cartLengthChange.pipe(shareReplay(1)).subscribe(data => {
            this.length = data;

        });
        this.appService.setShowBanner(false);
        this.appService.setShowDeals(false);
        this.appService.setShowMenuIcons(false);
        this.appService.isShowDeals();
        this.imageBaseUrl = environment.imagesBaseUrl;
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
                // if you need to scroll back to top, here is the right place

            }
        });

        if (this.customerName == null || this.customerName == "" || this.customerName == "Please sign in") {


            this.router.navigate(['/main/header/subheader/login']);

        }
        else {


            this.alert.push({
                id: 1,
                type: 'success',
                message: 'Product added to cart.'
            });
            setTimeout(() => {
                this.closeAlert(this.alert);
            }, 5000);


            var customerId = this.userDetails.firstName;



            let ss = this.getOrderInfoService.get('productId');

            console.log("this.getOrderInfoService.get('orderId'). ", this.getOrderInfoService.get('orderId'));
            this.orderId = this.getOrderInfoService.get('orderId');



            this.viewOrder = <Order>this.getOrderInfoService.get("order");
            this.orderDetails = this.viewOrder;
            

            setTimeout(() => {
                this.loading = false
            }, 1000);

            console.log("orderDetails is. ", this.orderDetails);
            console.log("this is this.viewOrder in cart. ", this.viewOrder);

            if (this.orderDetails === undefined || this.orderDetails === null) {

                this._orderService.cartLengthChange.next(0);
            }
            else {


                let cartQuantity: number = 0;

                this.orderDetails.orderItemObj.forEach(item => cartQuantity = cartQuantity + parseInt(item.quantity));
                console.log('Total Items in Cart', cartQuantity);
                this._orderService.cartLengthChange.next(cartQuantity);
                this.calculateAllTotal(this.viewOrder.orderItemObj);

            }

            this._orderService.cartLengthChange.pipe(shareReplay(1)).subscribe(data => {

                this.viewOrder = <Order>this.getOrderInfoService.get("order");
                console.log("this.viewOrder", this.viewOrder)
                this.orderDetails = this.viewOrder;
                this.calculateAllTotal(this.viewOrder.orderItemObj);
            });

        }
    }
    public closeAlert(alert: any) {
        const index: number = this.alert.indexOf(alert);
        this.alert.splice(index, 1);
    }
    onAddQuantity(productid) {
        console.log("productId is. ", productid);
        console.log(this.getOrderInfoService.get('quantity'));
        console.log(this.getOrderInfoService.get('price'));


        let clickedItem = this.viewOrder.orderItemObj.find(p => p.productSku == productid);
        console.log("clicked item in onAddQuantity(.) is. ", clickedItem);
        clickedItem.quantity = parseInt(clickedItem.quantity) + 1;

        this.getOrderInfoService.set('quantity', clickedItem.quantity);

        console.log(this.getOrderInfoService.get('quantity'));
        const updateqty = new UpdateQuantity();

        updateqty.newQuantity = clickedItem.quantity;
        updateqty.productSku = clickedItem.productSku;
        const updateQuantityRequest = new UpdateQuantityRequest();
        updateQuantityRequest.orderId = clickedItem.order_id;
        updateQuantityRequest.updateQuantity = updateqty;
        console.log(updateQuantityRequest);
        this.orderservice.updateOrder(updateQuantityRequest).subscribe(data => {
            data = <any>data;
            console.log(data);
        });

        this.calculateAllTotal(this.viewOrder.orderItemObj);

    }
    DeleteItem(id) {

        console.log(id);
        let clickedItem = this.viewOrder.orderItemObj.find(p => p.productId == id);
        console.log(clickedItem);
        //service for deleting orderitem that is clicked
        const deleteObj = new DeleteItem();
        deleteObj.orderId = clickedItem.order_id;
        deleteObj.orderItemId = clickedItem.orderItemId;
        console.log(deleteObj);
        this.orderservice.DeleteItemFromCart(deleteObj).subscribe(data => {
            data = <any>data;
            console.log(data);
            this._orderService.updateLocalOrder(clickedItem.order_id);
        });
        this.calculateAllTotal(this.viewOrder.orderItemObj);
    }

    onRemoveQuantity(productid) {
        console.log("productSku is. ", productid);
        let clickedItem = this.viewOrder.orderItemObj.find(p => p.productSku == productid);
        console.log("clickedItem in onRemoveQuantity(.) is. ", clickedItem);
        clickedItem.quantity = parseInt(clickedItem.quantity) - 1;
        console.log(clickedItem);
        this.getOrderInfoService.set('quantity', clickedItem.quantity);
        this._orderService.refreshSecondComponent();
        if (clickedItem.quantity <= 0) {
            this.viewOrder.orderItemObj.find(p => p.productId == productid) == null;
            console.log("clickedItem", clickedItem);
            //service for deleting orderitem that is clicked
            const deleteObj = new DeleteItem();
            deleteObj.orderId = clickedItem.order_id;
            deleteObj.orderItemId = clickedItem.orderItemId;
            console.log(deleteObj);
            this.orderservice.DeleteItemFromCart(deleteObj).subscribe(data => {
                data = <any>data;
                console.log("data of deleteItemFromCart is. ", data);
                this._orderService.updateLocalOrder(clickedItem.order_id);

            });

        }
        console.log(this.getOrderInfoService.get('quantity'));

        const orderobject = new Order();
        orderobject.totalQuantity = clickedItem.quantity;
        const updateqty = new UpdateQuantity();

        updateqty.newQuantity = clickedItem.quantity;
        updateqty.productSku = clickedItem.productSku;
        const updateQuantityRequest = new UpdateQuantityRequest();
        updateQuantityRequest.orderId = clickedItem.order_id;
        updateQuantityRequest.updateQuantity = updateqty;
        console.log(updateQuantityRequest);
        this.orderservice.updateOrder(updateQuantityRequest).subscribe(data => {
            data = <any>data;
            console.log(data);
            this._orderService.updateLocalOrder(clickedItem.order_id);
        }

        );

        this.calculateAllTotal(this.viewOrder.orderItemObj);


    }

    calculateAllTotal(allItems: OrderItem[]) {
        console.log("calculation", allItems);
        let total = 0;
        for (let i in allItems) {

            total = total + (parseInt(allItems[i].quantity) * allItems[i].price);

        }
        this.allTotal = total;
        this.orderDetails.totalAmount = this.allTotal;
        console.log(this.allTotal);
    }
    // proceedToPay() {


    //     if (this.appService.userdetails.firstName == null || this.appService.userdetails.firstName == "" || this.appService.userdetails.firstName == "Please sign in" || this.appService.userdetails.firstName == 'null') {

    //         this.router.navigate(['/main/header/subheader/login']);
    //     }
    //     else {

    //         this.checkStatus();

    //     }
    // }
    checkStatus() {
        var component: any;
        var productStatus: any;
        component = this.route.snapshot.url[0].path;

        console.log("component==='cart'", component === 'cart');
        if (component === 'cart') {
            this.appService.setProductStatus("cart");

            this.router.navigate(['/main/header/subheader/shippingAddress']);
        }

        if (component === 'shipOptionSelect') {

            this.cartShipOptionSelect.shipOptionSelect.subscribe(data => {
                this.shipOptionSelect = data;
                productStatus = "------";
                this.appService.setProductStatus(productStatus);

                this.shipOptionSelect.createRazorPayOrder();


            });
        }

    }

    applyCoupon(val) {
        var inputParam = new CouponInfo();
        inputParam.couponCode = val;
        inputParam.orderId = this.getOrderInfoService.get('orderId');
        this.orderservice.applyCouponCodeBE(inputParam).subscribe(data => {
            this.couponResponse = <CouponRes>data;
            document.getElementById("couponstatus").style.display = "block";
            document.getElementById("couponstatus").style.color = "Green";
        });
    }

    refresh() {

        this.router.navigateByUrl('/main/header/subheader', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/main/header/subheader/cart']);
        });
        this._orderService.updateLocalOrder(this.orderDetails.id);
    }
    quantityIncrement(productSku) {

        var curSkuInOrder = this.orderDetails.orderItemObj.filter(item => item.productSku == productSku);
        curSkuInOrder[0].quantity = parseInt(curSkuInOrder[0].quantity) + 1;

        var updateItemObj = new UpdateItemObj();
        var updateQuantity = new UpdateQuantity();
        updateQuantity.newQuantity = (parseInt(curSkuInOrder[0].quantity)).toString();
        updateQuantity.productSku = productSku.toString();
        updateItemObj.orderId = this.orderDetails.id;
        updateItemObj.updateQuantity = updateQuantity;
        console.log(updateItemObj);
        this._orderService.updateItem(updateItemObj).subscribe(data => {
            console.log('update Order Response ', data);
            this._orderService.updateLocalOrder(this.orderDetails.id);
            this._orderService.refreshSecondComponent();
        });
        this.calculateAllTotal(this.orderDetails.orderItemObj);

    }
    getDetail(productId, productSku) {
        console.log(productId);

        console.log(productSku);

        this.router.navigate(['/main/header/subheader/productDetail', productId, productSku]);
        console.log("productId is. ", productId);
    }
    isPaymentDisabled(): boolean {

        return this.length === 0;
    }




    proceedToPay() {
        // Check if the user is logged in
        if (!this.isUserLoggedIn()) {
            this.router.navigate(['/main/header/subheader/login']);
        } else {

            if (this.userProfile.maillistFlg === 'Subscribed' || this.userProfile.maillistFlg ==='UnSubscribed') {
                const modal = document.getElementById('myModal1');
                modal.style.display = 'none';
                this.checkStatus();
            }

            else {
                // Open the modal
                const modal = document.getElementById('myModal1');
                modal.style.display = 'block';

                // Attach a listener for when the modal is closed
                const closeModalBtn = document.getElementById('closeModalBtn');
                closeModalBtn.addEventListener('click', () => {
                    modal.style.display = 'none';  // Hide the modal
                    this.checkStatus();  // Now proceed to Razorpay after modal closes
                });
            }
        }
    }

    isUserLoggedIn(): boolean {
        const firstName = this.appService.userdetails?.firstName;
        return firstName && firstName !== "Please sign in" && firstName !== 'null';
    }

    subscribe() {
        let  emailbody = {
            action: 'Subscribed',
            message: 'Thank you for subscribing to our newsletter!',
            subject: 'Subscription Confirmation',
            to: this.userProfile.emailId
          };

        this.emailSubscriptionService
            .sendSubscriptionAction(emailbody)
            .subscribe(
                (response) => {
                    // Add your subscription logic here


                },

            );
        alert('Subscribed Successfully!');

        // Optionally, you can close the modal upon subscription and then proceed with the payment.
        const modal = document.getElementById('myModal1');
        modal.style.display = 'none';
        this.checkStatus();  // Proceed to Razorpay

    }


    closeModel() {
        const modal = document.getElementById('myModal1');
        modal.style.display = 'none';
        this.checkStatus();
    }



}





