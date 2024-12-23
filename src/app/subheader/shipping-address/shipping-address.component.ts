/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, } from '@angular/forms';
import { Order, selectShippAddr, ShippingAddress, ShippingAddressRes } from 'src/app/data/hero';
import { ShippingAddressService } from 'src/app/sharedServices/shipping-address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { AppService } from 'src/app/sharedServices/app.service';
import { ThemeService } from 'src/app/theme.service';
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})

export class ShippingAddressComponent implements OnInit {

  myForm: UntypedFormGroup;
  loading = false;
  loading1 = true;
  submitted = false;
  clickedAddress;
  private shippingAddRes;
  isChecked = true;
  loadContent: boolean;
  private UserVariable;
  public addresslist: ShippingAddress[] = [];
  shippingAdd: ShippingAddress[] = [];

  constructor(private router: Router,
    private getOrderInfoService: GetOrderInfoServiceService,
    private _route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private shippingAddressService: ShippingAddressService,
    private _orderService: OrderService, private _appService: AppService,
    public themeService:ThemeService) {
    this.addresslist = this._route.snapshot.data['addressList'];
  
  }

  ngOnInit() {
    gtag("event", "add_shipping_info", {
      currency: "USD",
      value: 30.03,
      coupon: "SUMMER_FUN",
      shipping_tier: "Ground",
      items: [
        // {
        //   item_id: shippAddr.addrId,
          
        // }
      ]
    });
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push({
    //   event: 'add_shipping_info',
    //   componentName: 'app-shipping-address'  // Replace 'ComponentName' with the actual name of your component
    // });
    
    // window.dataLayer = window.dataLayer || [];

    // window.dataLayer.push({
    //   event: "add_shipping_info",
    //   componentName: "app-shipping-address",
    //   "gtm.uniqueEventId": 10
    // });
    
    this._appService.setShowBanner(false);
    this._appService.setShowDeals(false);
    this._appService.setShowMenuIcons(false);
    this.isChecked = true;
    // we will initialize our form here
    console.log(this.addresslist);
    console.log(this.getOrderInfoService.get('orderId'));
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      landmark: ['', Validators.required],
      flatNo: ['', Validators.required],
      state: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.getShippingAddresses();
  }
  get f() {
    return this.myForm.controls;
  }
  previousAddress() {

    this.router.navigate(['/main/header/subheader/shippingAddress'])
  }
  goToCart() {
    this.router.navigate(['/main/header/subheader/cart'])
  }
  save() {
    
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.myForm.value);
    var shippingaddress = new ShippingAddress();
    shippingaddress.area = this.myForm.value.area;
    shippingaddress.city = this.myForm.value.city;
    shippingaddress.firstName = this.myForm.value.firstName;
    shippingaddress.flatNo = this.myForm.value.flatNo;
    shippingaddress.landmark = this.myForm.value.landmark;
    shippingaddress.mobileNo = this.myForm.value.mobileNo;
    shippingaddress.pincode = this.myForm.value.pincode;
    shippingaddress.state = this.myForm.value.state;
    shippingaddress.userId = this._appService.userdetails.userId;

    console.log("this.getOrderInfoService.get(order).user_id ", this.getOrderInfoService.get("order").userId);
    
    this.shippingAddressService.addShippingAddressBE(shippingaddress).subscribe(data => {
      this.shippingAddRes = <ShippingAddressRes>data;

      console.log("this is this.shippingAddRes. ", this.shippingAddRes);
      this.getShippingAddresses();
      this.loadContent = true;
      document.getElementById("Newaddress").style.display = "none";
    });
  }
  getShippingAddresses() {

    var userId = this._appService.userdetails.userId;
    userId = (JSON.parse(localStorage.getItem("user"))).userId;
   
    this.shippingAddressService.getShippingAddressesBE(userId).subscribe(
      (addresses) => {

        this.addresslist = <ShippingAddress[]>addresses;
        setTimeout(()=>{
          this.loading1=false
        },500);
        console.log("this is this.addresslist ", this.addresslist);

        var len = this.addresslist.length;
        console.log("length is: ", len);
        var last = this.addresslist[this.addresslist.length - 1];
     
        if (this.addresslist.indexOf(last) > 0) {
          var index = this.addresslist.indexOf(last);
         
          this.addresslist.unshift(this.addresslist.splice(index, 1)[0]);
        }
      },
      error => console.log(error)
    );
  }
  enterNew() {
    this.router.navigate(['/main/header/subheader/addshippinaddress']);
  }
  deliverToThisAddress(shippingaddid) {

    this.router.navigate(['/main/header/subheader/shipOptionSelect', shippingaddid]);
    console.log("selected shippingAddressId is. ", shippingaddid);
    var curOrder: Order;
    var orderId;

    curOrder = this.getOrderInfoService.get("order");
    orderId = curOrder.orderItemObj[0].order_id;
    var shippAddr: selectShippAddr;
    shippAddr = new selectShippAddr();
    shippAddr.orderId = orderId;
    shippAddr.addrId = shippingaddid;
    gtag("event", "add_shipping_info", {
      currency: "USD",
      value: 30.03,
      coupon: "SUMMER_FUN",
      shipping_tier: "Ground",
      items: [
        {
          item_id: shippAddr.addrId,
          
        }
      ]
    });
    this._orderService.updateShippAddrId(shippAddr).subscribe();

    this._appService.setProductStatus("shipAddr");
   
  }
  formActiveWithFeilds(selectedAddId, address) {
    console.log("entered into formActiveWithFeilds", selectedAddId, address);
    this.router.navigate(['/main/header/subheader/editAddress', selectedAddId], {
      queryParams: { 'data': JSON.stringify(address) }
    });
  }

  deleteAddress(addrId: number) {
    this.shippingAddressService.DeleteShippingAddressById(addrId).subscribe(data => {
      var userId = this._appService.userdetails.userId;
      this.shippingAddressService.getShippingAddressesBE(userId).subscribe(
        addresses => {
          console.log("addresses are. ", addresses);
          this.addresslist = <ShippingAddress[]>addresses;
        })

    });
   
  }

}