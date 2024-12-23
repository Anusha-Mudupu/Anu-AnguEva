/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { OrderItem, Order, UpdateOrderResponse, UpdateQuantity, UpdateQuantityRequest, Product, FilterCriteria, FilterCriteriaObj, CreateOrderResponse, addItem, UpdateItemObj, IAlert, CouponInfo, CouponRes, RazorPayOrder, OrderStatus, vieworders, DeleteItem, Skus, UserDetails, selectShippAddr, OrderItemIdData, ReturnOrderItem, ApplyCoupon, orderImage, OrderImage, productsku, RefundOrderDetails } from '../../app/data/hero';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { ProductListService } from 'src/app/Product/product-list/productListService';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ShippingAddressService } from 'src/app/sharedServices/shipping-address.service';
import { AppService } from './app.service';
import { CartComponent } from '../subheader/cart/cart.component';
import { UserdetailsService } from './userdetails.service';
import { SubheaderComponent } from '../subheader/subheader.component';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private refreshSubject: Subject<void> = new Subject<void>();

  refreshSecondComponent() {
    this.refreshSubject.next();
  }

  getRefreshObservable() {
    return this.refreshSubject.asObservable();
  }
  private id;
  private orderId: number;
  private catalog_id = 0;
  private filterEnabled = "sajana";
  private orderItem;
  private additem;
  public orderitems: OrderItem[];
  private ProductsList: Product[];
  public currentproductdetails: Product[];
  public itemsaddedcount = 0;
  public cartList = [];
  public cartLength: number;
  UserVariable: CreateOrderResponse;
  private curOrder: Order;
  private viewOrder: Order;
  razorpayorderRes;
  productId;
  customerId = "sajana";
  private updateResponse;
  private paymenturlstring;
  cartLengthChange: Subject<number> = new Subject<number>();
  public alert: Array<IAlert> = [];
  public previousUrl: string = undefined;
  private currentUrl: string = undefined;
  private order: Order;
  private orderDetails: Order;


  private orderImage: OrderImage

  private orderImges: any;
  constructor(private router: Router, private _http: HttpClient,
    private getOrderInfoService: GetOrderInfoServiceService, private shippingAddressService: ShippingAddressService,
    private productListService: ProductListService, private appService: AppService, private _userdetails: UserdetailsService,

  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }
  public getCustomerId() {
    return this.appService.getUser();
  }
  public closeAlert(alert: any) {
    const index: number = this.alert.indexOf(alert);
    this.alert.splice(index, 1);
  }
  addItem(productdetils: Product, sku_id) {
    console.log(productdetils);
    console.log(sku_id);
    const orderinfo = this.getOrderInfoService.get('order');
    console.log("const orderinfo",orderinfo)

    if (this.cartList.length == 0) {
     
      this.id = sku_id;
      const inputParam1 = new FilterCriteria();
      inputParam1.catalogId = this.catalog_id;
      inputParam1.filterEnabled = this.filterEnabled;
      const inputParam = new FilterCriteriaObj();
      inputParam.filterCriteria = inputParam1;
     
      this.productListService.getProductList(inputParam).subscribe(
        (products: any) => {
          this.ProductsList = products.products;
          console.log("products list: ", this.ProductsList);
          console.log("this.currentproductdetails[0]", this.currentproductdetails[0].productSkus[0].imageUrl)
          this.orderItem.imageUrl = this.currentproductdetails[0].productSkus[0].imageUrl;
         this.orderItem.productSkuCd = this.currentproductdetails[0].productSkus[0].productSkuCd;

          this.currentproductdetails = this.ProductsList.filter(product => product.productSkus.find(item => item.productSkuId == this.id));
          console.log("this is currentproductdetails. if block. ", this.currentproductdetails);
          var inputParam = new Order();
          this.orderItem = new OrderItem();
         
          inputParam.customerName = this.getCustomerId().firstName;
          inputParam.userId = this.getCustomerId().userId;
          if (inputParam.customerName == null) {
            inputParam.customerName = 'Guest';
          }
          inputParam.status = 'OPEN';
          inputParam.igstAmt = 'dsfghj';
          console.log(inputParam.igstAmt);
          this.orderItem.discountApplied = "0";
          this.orderItem.giftWrapped = "yes";
          this.orderItem.mrpPrice = "10.0";
          this.orderItem.status = "open";       // added by shashikanth.
          this.orderItem.price = this.currentproductdetails[0].productSkus[0].price;
          this.orderItem.productId = this.currentproductdetails[0].productId;
          this.orderItem.productName = this.currentproductdetails[0].productName;
        

          this.orderItem.productSku = this.currentproductdetails[0].productSkus[0].productSkuId;
          this.orderItem.igstPct = this.currentproductdetails[0].productSkus[0].igst;
          this.orderItem.cgstPct = this.currentproductdetails[0].productSkus[0].cgst;
          this.orderItem.sgstPct = this.currentproductdetails[0].productSkus[0].sgst;

          this.orderItem.quantity = "1";
          this.orderItem.imageUrl = this.currentproductdetails[0].productSkus[0].imageUrl;
          this.orderItem.productSkuCd = this.currentproductdetails[0].productSkus[0].productSkuCd;
          console.log("images-------", this.currentproductdetails[0].productSkus[0].imageUrl)
          this.orderitems.push(this.orderItem);

          inputParam.orderItemObj = this.orderitems;
          
          this.cartList.push(inputParam);
          console.log("this is this.cartList. ", this.cartList);
          this.cartLength = this.cartList.length;
          this.cartLengthChange.next(this.cartLength);
          let urlstring = this.router.url;
          console.log(urlstring.includes("/main/header/subheader/paymentSummary"));
          this.paymenturlstring = urlstring.includes("/main/header/subheader/paymentSummary");
          if (this.paymenturlstring == true) {
            console.log("after order completion cart len is zero");
            this.cartList.length = 0;
          }
         

          this.getOrderInfoService.set("order", inputParam);
          this.getOrderId(inputParam.userId, 'open').then(data => {
            
          });
          this.createOrderBE(inputParam).subscribe(
            data => {
              this.UserVariable = <any>data;
              console.log("data is", this.UserVariable);
              console.log("this is this.UserVariable.status. ", this.UserVariable.status);
              console.log("this is this.UserVariable.orderId. ", this.UserVariable.orderId);
              console.log(this.getOrderInfoService.set('orderInCart', JSON.stringify(this.orderItem)));
              this.orderItem.orderId = this.UserVariable.orderId;
              this.getOrderInfoService.set('orderId', this.orderItem.orderId);
              this.getOrderInfoService.set('ProductSku', this.orderItem.productSku);
              this.getOrderInfoService.set('mrpPrice', this.orderItem.mrpPrice);
              this.getOrderInfoService.set('price', this.orderItem.price);
              this.getOrderInfoService.set('quantity', this.orderItem.quantity);
              this.getOrderInfoService.set('discountApplied', this.orderItem.discountApplied);
              this.getOrderInfoService.set('productName', this.orderItem.productName);
              this.getOrderInfoService.set('productSkuCd',this.orderItem.productSkuCd)
              this.getOrderInfoService.set('productId', this.orderItem.productId);
              this.getOrderInfoService.set('giftWrapped', this.orderItem.giftWrapped);
              this.getOrderInfoService.set('imageUrl', this.orderItem.imageUrl);
              this.getOrderInfoService.set('igst', this.orderItem.igstPct);
              this.getOrderInfoService.set('cgst', this.orderItem.cgstPct);
              this.getOrderInfoService.set('sgst', this.orderItem.sgstPct);
              this.getOrderInfoService.set('igstAmt', this.orderItem.igstAmt);
              this.getOrderInfoService.set('cgstAmt', this.orderItem.cgstAmt);
              this.getOrderInfoService.set('sgstAmt', this.orderItem.sgstAmt);
              this.getOrderInfoService.set('totalPrice', this.orderItem.totalPrice);
              this.getOrderInfoService.set('igstAmt', this.order.igstAmt);

              console.log("order Item Img ------", this.orderItem.imageUrl)
              if (this.UserVariable.status = "item added") {
                this.router.navigate(['/main/header/subheader/products']);
              }
              else {
                this.router.navigate(['/main/header/subheader/error-page']);
              }
            });

        });

    }
    else {
      console.log("length of the this.cart is. ", this.cartList);
      console.log("this is this.cartList. ", this.cartList);
      this.productId = this.getOrderInfoService.get('productId');
      console.log("this is this.productId. ", this.productId);
      this.id = sku_id;
      const inputParam1 = new FilterCriteria();
      inputParam1.catalogId = this.catalog_id;
      inputParam1.filterEnabled = this.filterEnabled;
      const inputParam = new FilterCriteriaObj();
      inputParam.filterCriteria = inputParam1;
      console.log("this is inputParam. ", inputParam);
      this.productListService.getProductList(inputParam).subscribe(
        (products: any) => {
          this.ProductsList = products.products;
          console.log("products list: ", this.ProductsList);
          this.currentproductdetails = this.ProductsList.filter(product => product.productSkus.find(item => item.productSkuId == this.id));
          console.log("currentproductdetails. in else block. ", this.currentproductdetails);
          var inputParam = new Order();
          this.orderItem = new OrderItem();
          inputParam.customerName = "sajana";
          this.orderItem.discountApplied = "0";
          this.orderItem.giftWrapped = "yes";
          this.orderItem.mrpPrice = "10.0";
          this.orderItem.status = "open";  // this line added by shashikanth.
          this.orderItem.orderId = this.UserVariable.orderId;
          this.orderItem.price = this.currentproductdetails[0].productSkus[0].price;
          this.orderItem.productId = this.currentproductdetails[0].productId;
          this.orderItem.productName = this.currentproductdetails[0].productName;
          this.orderItem.productSkuCd = this.currentproductdetails[0].productSkus[0].productSkuCd;


          this.orderItem.productSku = this.currentproductdetails[0].productSkus[0].productSkuId;
          this.orderItem.quantity = "1";
          this.orderItem.imageUrl = this.currentproductdetails[0].productSkus[0].imageUrl;
          this.orderItem.igstPct = this.currentproductdetails[0].productSkus[0].igst
          this.orderItem.cgstPct = this.currentproductdetails[0].productSkus[0].cgst
          this.orderItem.sgstPct = this.currentproductdetails[0].productSkus[0].sgst
          console.log("dfghjkl", this.currentproductdetails[0].productSkus[0].imageUrl)
          console.log("currentproductdetails are ", this.currentproductdetails[0])

          // below code written by shashikanth.

          let qty = this.orderitems.findIndex(oi => oi.productName === this.currentproductdetails[0].productName);
          console.log("qty value is. ", qty);
          if (qty !== -1) {
            this.appService.getCartObject().onAddQuantity(this.currentproductdetails[0].productId);

          }
          if (qty === -1) {
            this.orderitems.push(this.orderItem);
          }

          // code ended.
          inputParam.orderItemObj = this.orderitems;
          console.log("this is inputparam. ", inputParam);
          console.log("this is this.UserVariable.orderId. ", this.UserVariable.orderId);


          this.getProductFromCart(this.UserVariable.orderId).subscribe                               //  
            (data => {
              this.viewOrder = <Order>data['order'];
              console.log("this is this.orderItem.productId. ", this.orderItem.productId);

            });

          
          console.log("this is this.getOrderInfoService.get('price'). ", this.getOrderInfoService.get('price'));
          const updateQuantityRequest = new UpdateQuantityRequest();
          updateQuantityRequest.orderId = this.UserVariable.orderId;
          updateQuantityRequest.discountApplied = this.orderItem.discountApplied;
          updateQuantityRequest.giftWrapped = this.orderItem.giftWrapped;
          updateQuantityRequest.mrpPrice = this.orderItem.mrpPrice;
          updateQuantityRequest.orderId = this.UserVariable.orderId;
          updateQuantityRequest.price = this.orderItem.price;
          updateQuantityRequest.productId = this.orderItem.productId;
          updateQuantityRequest.productName = this.orderItem.productName;
          updateQuantityRequest.productSkuCd = this.orderItem.productSkuCd


          updateQuantityRequest.productSku = this.orderItem.productSku;
          updateQuantityRequest.quantity = this.orderItem.quantity;
          updateQuantityRequest.imageUrl = this.orderItem.imageUrl
          updateQuantityRequest.igst = this.orderItem.igstPct;
          updateQuantityRequest.cgst = this.orderItem.cgstPct;
          updateQuantityRequest.sgst = this.orderItem.sgstPct;
          updateQuantityRequest.igstAmt = this.orderItem.igstAmt;
          updateQuantityRequest.cgstAmt = this.orderItem.cgstAmt;
          updateQuantityRequest.sgstAmt = this.orderItem.sgstAmt;
          updateQuantityRequest.totalPrice = this.orderItem.totalPrice;
          this.UserVariable.orderId = this.orderItem.orderId
          console.log("this is this.userVariable.orderId. ", this.UserVariable.orderId);
          console.log("this is this.orderItem.orderId. ", this.orderItem.orderId);

          console.log("this is updateQuantityRequest. ", updateQuantityRequest);
          console.log("this is this.orderItem. ", this.orderItem);

          const additem = new addItem();

          additem.orderItem = this.orderItem;
          console.log("this is additem. ", additem);
          this.additem = additem;
          console.log("this is this.additem. ", this.additem);
          const updateItemObj = new UpdateItemObj();
          updateItemObj.addItem = this.additem;
          updateItemObj.orderId = this.UserVariable.orderId;
          console.log("this is updateItemObj. ", updateItemObj);
          this.updateItem(updateItemObj).subscribe(data => {
            this.updateResponse = <any>data;
            console.log("this is this.updateResponse. ", this.updateResponse);
            if (this.updateResponse.status == "orderitem object updated bcz productsku exists for that order") {
              alert("item alread exist in cart plz increase quantity in cart");
            }
            if (this.updateResponse.status == 'item added') {
              this.cartList.push(inputParam);
              console.log("this is this.cartList. ", this.cartList);
              this.cartLength = this.cartList.length;
              console.log("this is this.cartLength. ", this.cartLength);
              this.cartLengthChange.next(this.cartLength);
              this.getProductFromCart(this.UserVariable.orderId).subscribe
                (data => {
                  this.viewOrder = <Order>data['order'];
                  console.log("this is this.viewOrder. ", this.viewOrder);
                  console.log(this.viewOrder.orderItemObj.length);
                  console.log("length in order.service.ts file. ", this.viewOrder.orderItemObj.length);
                  this.cartLengthChange.next(this.viewOrder.orderItemObj.length);

                });

              this.router.navigate(['/main/header/subheader/products']);
            }
          });
        });
      this.getProductFromCart(this.UserVariable.orderId).subscribe
        (data => {
          this.viewOrder = <Order>data['order'];
        });
    }
    this.getOrderInfo();


  }
  getOrderInfo() {


  }
  createOrderBE(order: Order): Observable<any> {
    console.log("this is order in createOrderBE(.) ", order);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    return this._http.post<any>(environment.createOrderUrl, order, httpOptions).pipe();

  }
  paymentrefundBE(orderId: number) {
    console.log(orderId);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    }
    return this._http.post<RefundOrderDetails[]>(environment.refundDetailsURL, orderId, options);
  }

  updateLocalOrder(orderId) {
    this.getProductFromCart(orderId).subscribe
      (data => {
        this.curOrder = <Order>data['order'];
        console.log("new viewOrder is. ", this.curOrder);
        this.getOrderInfoService.set('order', this.curOrder);

        let cartQuantity: number = 0;
        let igstAmt: any
        this.curOrder.orderItemObj.forEach(item => cartQuantity = cartQuantity + parseInt(item.quantity));

        console.log('Total Items in Cart', cartQuantity);
        this.cartLengthChange.next(cartQuantity);

        this.updateTotalAmount(this.curOrder).subscribe();

      });

  }

  orderItemId(orderId) {
    return this._http.get<any>(environment.orderItemId + orderId)
  }
  getOrderItemImg(orderItemId) {
    return this._http.get<any>(environment.getOrderItemImg + orderItemId)
  }
  getProductFromCart(orderId) {
    console.log("orderId is. ", orderId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };

    return this._http.get<any>(environment.getProductFromCartUrl + orderId);
  }

  updateTotalAmount(order) {
    var totalAmount: number = 0;
    var igstAmt: number = 0;
    var sgstAmt: number = 0;
    var cgstAmt: number = 0;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    order.orderItemObj.forEach(orderItem => totalAmount = totalAmount + (orderItem.price * orderItem.quantity));
    order.totalAmount = totalAmount;

    order.orderItemObj.forEach(orderItem => igstAmt = igstAmt + (orderItem.igstAmt * orderItem.quantity));
    order.igstAmt = igstAmt;
    order.orderItemObj.forEach(orderItem => cgstAmt = cgstAmt + (orderItem.cgstAmt * orderItem.quantity));
    order.cgstAmt = cgstAmt;
    order.orderItemObj.forEach(orderItem => sgstAmt = sgstAmt + (orderItem.sgstAmt * orderItem.quantity));
    order.sgstAmt = sgstAmt;
    return this._http.post<any>(environment.updateTotalAmtUrl, order, httpOptions).pipe();

  }
  DeleteItemFromCart(deleteItem: DeleteItem) {
    console.log(deleteItem);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      }),
      body: {
        orderId: deleteItem.orderId,
        orderItemId: deleteItem.orderItemId
      },
    };
    console.log(options);

    return this._http.delete<any>(environment.deleteItemUrl, options).pipe();
  }
  updateItem(updateItemObj: UpdateItemObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };

    return this._http.post<UpdateOrderResponse[]>(environment.updateOrderUrl, updateItemObj, httpOptions).pipe();
  }
  updateOrder(orderItem: UpdateQuantityRequest) {
    console.log(orderItem);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };

    return this._http.post<UpdateOrderResponse[]>(environment.updateOrderUrl, orderItem, httpOptions).pipe();
  }
  addItemOrderToBE(updateOrder: Order): Observable<any> {
    console.log(updateOrder);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    return this._http.post<any>(environment.updateOrderUrl, updateOrder, httpOptions).pipe();

  }
  viewOrderBE(orderId) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    console.log(this._http.get<any>(environment.getProductFromCartUrl, orderId).pipe());
    return this._http.get<Order[]>(environment.getProductFromCartUrl + orderId);
  }
  applyCouponCodeBE(couponcode: CouponInfo) {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    return this._http.post<CouponRes>(environment.applyCouponCodeUrl, couponcode, httpOptions).pipe();
  }

  getOrderStatusBE(orderId) {
    return this._http.get<OrderStatus>(environment.getOrderStatusUrl + orderId);
  }
  getordersofcustomer(userId) {
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    console.log(this._http.get<any>(environment.getviewordersurl, userId).pipe());
    return this._http.get<Order[]>(environment.getviewordersurl + userId, httpOptions);
  }
  public getPreviousUrl() {
    console.log(this.previousUrl);
    return this.previousUrl;
  }

  public getOpenOrder(userId: number) {

    console.log("userId is. ", userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };

    return this._http.get<Order[]>(environment.getOpenOrderUrl + userId, httpOptions);
  }
  getCartImg(orderId: number) {
    console.log("cartid is", orderId)
    return this._http.get<orderImage[]>(environment.cartimgUrl + orderId)
  }

  getOrder(userId: any) {
    return this._http.get<Order[]>(environment.cartUserId + userId);
  }
  getCartProductId(orderId: number) {
    console.log("productId", orderId)
    return this._http.get<orderImage[]>('http://localhost:8080/getproductByOrderId?id=' + orderId)
  }
  //code added.

  public getOrderId(userId: number, status: string) {

    console.log("entered customerId is. ", userId);
    console.log("entered status is. ", status);

    const params = new HttpParams();

    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: ({ 'userId': userId, 'status': status }),
    };

    return this._http.get<any>(environment.getOrderIdUrl, httpOptions).toPromise();
  }

  public getOrderIds(customerId: string, status: string) {

    console.log("entered customerId is. ", customerId);
    console.log("entered status is. ", status);

    const params = new HttpParams();
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: ({ 'CustomerId': customerId, 'status': status }),
    };

    return this._http.get<any>(environment.getOrderIdUrl, httpOptions).toPromise();
  }

  getOrderDetails(orderId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this._http.get<Order>(environment.getViewOrderUrl + orderId, httpOptions);
  }

  addToCart(productSku: any, sku_id, quantity, product: Product) {
    console.log("productSku is. ", productSku);


    this.id = sku_id;
    this.curOrder = this.getOrderInfoService.get('order');
    console.log("this.curOrder is. ", this.curOrder);


    if (this.curOrder === undefined || this.curOrder === null) {
      
      //create a new order
      this.curOrder = new Order();
      var orderItem = new OrderItem();
      this.curOrder.customerName = this.getCustomerId().firstName;
      console.log("this.getCustomerId().firstName is. ", this.getCustomerId().firstName);
      if (this.curOrder.customerName== null) {
        this.curOrder.customerName = 'Guest';
      }
      this.curOrder.status = 'OPEN';

      this.curOrder.totalAmount = productSku.price;
      this.curOrder.igstAmt = orderItem.igstAmt;
      this.curOrder.cgstAmt = orderItem.cgstAmt;
      this.curOrder.sgstAmt = orderItem.sgstAmt;
      this.curOrder.productSkuCd = orderItem.productSkuCd

      this.curOrder.userId = this.getCustomerId().userId;
      this.curOrder.orderSubmitDtTm = new Date();

      console.log("this.curOrder.orderSubmitDtTm is. ", this.curOrder.orderSubmitDtTm);
      orderItem.discountApplied = "0";
      orderItem.giftWrapped = "yes";

      orderItem.mrpPrice = productSku.price.toString();
      orderItem.quantity = quantity.toString();

      orderItem.price = productSku.price - ((productSku.price * productSku.discount) / 100);
      orderItem.productId = product.productId;
      orderItem.igstPct = productSku.igst;
      orderItem.cgstPct = productSku.cgst;
      orderItem.sgstPct = productSku.sgst;
      orderItem.imageUrl = productSku.imageUrl;
      orderItem.igstAmt = (productSku.price * productSku.igst) / 100;
      orderItem.cgstAmt = (productSku.price * productSku.cgst) / 100;
      orderItem.sgstAmt = (productSku.price * productSku.sgst) / 100;
      orderItem.totalPrice = ((productSku.price * productSku.igst) / 100) + productSku.price - ((productSku.price * productSku.discount) / 100);
      orderItem.productName = product.productName;
      orderItem.productSkuCd = productSku.productSkuCd

      orderItem.productSku = productSku.productSkuId.toString();
      var orderItems: OrderItem[] = new Array;
      orderItems.push(orderItem);
      this.curOrder.orderItemObj = orderItems;
      this.createOrderBE(this.curOrder).subscribe(
        data => {
          this.UserVariable = <any>data;
          console.log("this.curOrder is. ", this.curOrder);
          console.log("data is", this.UserVariable);
          console.log("this is this.UserVariable.status. ", this.UserVariable.status);
          console.log("this is this.UserVariable.orderId. ", this.UserVariable.orderId);

          if (this.UserVariable.status = "item added") {
            this.curOrder.id = this.UserVariable.orderId;
            this.orderId = this.UserVariable.orderId;
            this.updateLocalOrder(this.UserVariable.orderId);

          }
          else {
            this.router.navigate(['/main/header/subheader/error-page']);
          }
        });
    }
    else {

     
      console.log("current order is. ", this.curOrder);
      this.orderId = this.curOrder.id;
      console.log(productSku.productSkuId);
      this.getProductFromCart(this.orderId).subscribe(data => {
        console.log("this.orderId in else block is. ", this.orderId);
        this.orderDetails = <Order>data['order'];
        this.curOrder = this.orderDetails;

        var itemExists = this.curOrder.orderItemObj.some(item => item.productSku == productSku.productSkuId);
        if (itemExists) {
          var curSkuInOrder = this.curOrder.orderItemObj.filter(item => item.productSku == productSku.productSkuId);
          console.log('current Item in the cart', curSkuInOrder);
          console.log('This item already exists in Cart to send need to update Quantity');
          var updateItemObj = new UpdateItemObj();
          var updateQuantity = new UpdateQuantity();
          updateQuantity.newQuantity = (parseInt(curSkuInOrder[0].quantity) + quantity).toString();
          updateQuantity.productSku = productSku.productSkuId.toString();
          updateItemObj.orderId = this.curOrder.id;
          updateItemObj.updateQuantity = updateQuantity;
          console.log(updateItemObj);
          this.updateItem(updateItemObj).subscribe(data => {
            console.log('update Order Response', data);
            this.updateLocalOrder(this.orderId);

          });
        }
        else {
          //This item does not exist in current order so need to add it;
          var updateItemObj = new UpdateItemObj();
          var addItemObj = new addItem();
          var orderItemObj = new OrderItem();

          orderItemObj.discountApplied = "no";
          orderItemObj.giftWrapped = "yes";
          orderItemObj.mrpPrice = productSku.price.toString();
          orderItemObj.order_id = this.curOrder.id;
          orderItemObj.price = productSku.price - ((productSku.price * productSku.discount) / 100);
          orderItemObj.productId = product.productId;
          orderItemObj.productName = product.productName;
          
          orderItemObj.igstPct = productSku.igst;
          orderItemObj.cgstPct = productSku.cgst;
          orderItemObj.sgstPct = productSku.sgst;


          orderItemObj.igstAmt = (productSku.price * productSku.igst) / 100;
          orderItemObj.cgstAmt = (productSku.price * productSku.cgst) / 100;
          orderItemObj.sgstAmt = (productSku.price * productSku.sgst) / 100;
          orderItemObj.totalPrice = ((productSku.price * productSku.igst) / 100) + productSku.price - ((productSku.price * productSku.discount) / 100);

          orderItemObj.productSku = productSku.productSkuId.toString();
          orderItemObj.quantity = quantity.toString();
          addItemObj.orderItem = orderItemObj;
          updateItemObj.addItem = addItemObj;
          updateItemObj.orderId = this.curOrder.id;
          orderItemObj.imageUrl = productSku.imageUrl;
          orderItemObj.productSkuCd=productSku.productSkuCd;

          this.updateItem(updateItemObj).subscribe(data => {
            console.log('updateItem Response ', data);
            this.updateLocalOrder(this.orderId);

          });
        }

        this.getOrderInfoService.set('order', this.curOrder);

      });

    }


  }    // end of addToCart() method.

  updateShippAddrId(shippAddr: selectShippAddr) {
    let data = {
      "addrId": shippAddr.addrId,
      "orderId": shippAddr.orderId,
    }
    let body = JSON.stringify(data);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    console.log("environment.selectShippingAddressUrl are. ", environment.selectShippingAddressUrl, shippAddr, options);
    return this._http.post<any>(environment.selectShippingAddressUrl, body, options);
  }

  getOrderStatus2(orderId) {
    console.log("orderId is. ", orderId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };

    return this._http.get<any>(environment.getOrderStatusUrl2 + orderId);
  }
  viewOrderSubDetails(orderId) {
    console.log("orderId in viewOrderSubDetails(.) in order.service.ts ", orderId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };


    return this._http.get<any>(environment.viewOrderSubDetailsUrl + orderId);
  }
  cancelOrder(orderId: number) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    console.log("environment.cancelOrderUrl are. ", environment.cancelOrderUrl + orderId, options);
    return this._http.post<any>(environment.cancelOrderUrl + orderId, options);
  }
  getOrderItemId(OIData: OrderItemIdData) {
    let data = {
      "orderId": OIData.orderId,
      "productSkuId": OIData.skuId,
    }

    let body = JSON.stringify(data);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    console.log("environment.getOrderItemIdUrl is. ", environment.getOrderItemIdUrl, body, options);
    return this._http.post<any>(environment.getOrderItemIdUrl, body, options);
  }

  returnProduct(RPData: any) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    console.log("environment.returnOrderItemUrl is. ", environment.returnOrderItemUrl, RPData, options);
    return this._http.post<any>(environment.returnOrderItemUrl, RPData, options);
  }
  getCoupons() {

    return this._http.get<any>("http://localhost:8080/EcommerceApp/CouponsDetails")
  }

  // code for Apply Coupon
  applyCoupon(coupon_in: ApplyCoupon) {
    let data = {
      "couponCode": coupon_in.couponCode,
      "orderId": coupon_in.orderId,
      "userId": coupon_in.userId
    }
    let body = JSON.stringify(data);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    console.log("environment.couponCheckURL is. ", environment.couponCheckURL, body, options);
    return this._http.post<any>(environment.couponCheckURL, body, options);

  }

}    // end of service class.
