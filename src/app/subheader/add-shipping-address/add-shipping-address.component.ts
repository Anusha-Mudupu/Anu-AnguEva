/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// import { ThemePalette } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, ShippingAddress, ShippingAddressRes, selectShippAddr } from 'src/app/data/hero';
import { AppService } from 'src/app/sharedServices/app.service';
import { CartShipOptionSelectService } from 'src/app/sharedServices/cart-ship-option-select.service';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { ShippingAddressService } from 'src/app/sharedServices/shipping-address.service';
import { ThemeService } from 'src/app/theme.service';
import { ShipOptionSelectComponent } from '../ship-option-select/ship-option-select.component';

@Component({
  selector: 'app-add-shipping-address',
  templateUrl: './add-shipping-address.component.html',
  styleUrls: ['./add-shipping-address.component.css']
})
export class AddShippingAddressComponent implements OnInit {
  formVisible: boolean = false;
  shipOptionSelect: ShipOptionSelectComponent;
  myForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  clickedAddress;
  private shippingAddRes;
  isChecked = true;
  loadContent: boolean;
  public addresslist: ShippingAddress[] = [];
  shippingAdd: ShippingAddress[] = [];
  constructor(
    private cartShipOptionSelect: CartShipOptionSelectService,
    private router: Router, private getOrderInfoService: GetOrderInfoServiceService,
    private _route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private shippingAddressService: ShippingAddressService,
   private _appService: AppService,
    private appService: AppService, private route: ActivatedRoute,
    public themeService:ThemeService
  ) {
    this.addresslist = this._route.snapshot.data['addressList'];

  
  }

  ngOnInit() {
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
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });

    this.getShippingAddresses();
  }
  get f() {
    return this.myForm.controls;
  }
  previousAddress() {
    this.router.navigate(['/main/header/subheader/shippingAddress'])
  }
  
  save() {
 
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

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

   
    this.shippingAddressService.addShippingAddressBE(shippingaddress).subscribe(data => {
      this.shippingAddRes = <ShippingAddressRes>data;

      console.log("this is this.shippingAddRes. ", this.shippingAddRes);
      this.getShippingAddresses();
      this.loadContent = true;
      document.getElementById("Newaddress").style.display = "none";
      this.router.navigate(['/main/header/subheader/shippingAddress']);
    });
  }
  getShippingAddresses() {

    var userId = this._appService.userdetails.userId;
    userId = (JSON.parse(localStorage.getItem("user"))).userId;
    console.log("custId in getShippingAddress() of ShippingAddressComponent ", userId);
    this.shippingAddressService.getShippingAddressesBE(userId).subscribe(
      (addresses) => {

        this.addresslist = <ShippingAddress[]>addresses;
        console.log("this is this.addresslist ", this.addresslist);

        var len = this.addresslist.length;

        var last = this.addresslist[this.addresslist.length - 1];
       
        if (this.addresslist.indexOf(last) > 0) {
          var index = this.addresslist.indexOf(last);
         
          this.addresslist.unshift(this.addresslist.splice(index, 1)[0]);
        }
      },
      error => console.log(error)
    );
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

    console.log("shippingAddress is deleted. ");
  }
  toggleFormVisibility() {
    this.formVisible = !this.formVisible;
  }



  proceedToPay() {

   
    if (this.appService.userdetails.firstName == null || this.appService.userdetails.firstName == "" || this.appService.userdetails.firstName == "Please sign in" || this.appService.userdetails.firstName == 'null') {
      console.log("enter user credentials in login component", this.appService.userdetails.firstName);
      this.router.navigate(['/main/header/subheader/login']);
    }
    else {
  
      this.checkStatus();

    }
  }
  checkStatus() {
    var component: any;
    var productStatus: any;
    component = this.route.snapshot.url[0].path;
  
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
}

