/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { ShippingAddressService } from 'src/app/sharedServices/shipping-address.service';
import { ShippingAddress, ShippingAddressRes } from 'src/app/data/hero';
import { Validators, UntypedFormGroup, UntypedFormBuilder, FormControl } from '@angular/forms';
import { AppService } from 'src/app/sharedServices/app.service';
import { HttpClient } from '@angular/common/http';
import { param } from 'jquery';
import { ThemeService } from 'src/app/theme.service';
@Component({
  selector: 'app-edit-shipping-add',
  templateUrl: './edit-shipping-add.component.html',
  styleUrls: ['./edit-shipping-add.component.css']
})
export class EditShippingAddComponent implements OnInit {
  data: any;
  addresslist: any;
  addressDetails: any;
  addressDetails1: any;
  addressDetails2: any;
  id: any;
  editaddid;
  shippingAdd: ShippingAddress[] = [];
  editShipAdd: ShippingAddress;
  clickedAddress;
  myForm: UntypedFormGroup;
  private shippingAddRes;
  public submitted = false;
  public loading = false;
  isChecked = true;
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private shippingAddressService: ShippingAddressService, private getOrderInfoService: GetOrderInfoServiceService, private router: Router,
    private _appService: AppService,
     private http: HttpClient,
      public appService: AppService,
      public themeService:ThemeService) { }

  ngOnInit() {
    this.appService.setShowBanner(false);
    this.appService.setShowDeals(false);
    this.appService.setShowMenuIcons(false);
    this.route.queryParams.subscribe((params: any) => {
    
      this.addressDetails = params.data;
      this.addressDetails1 = params;
      this.addressDetails2 = { ...JSON.parse(params.data) };
      console.log("params.data json data:", this.addressDetails2);
    })
    this.getShippingAddresses();
    this.isChecked = true;
    this.myForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      landmark: ['', Validators.required],
      flatNo: ['', Validators.required],
      state: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6)]]
    });
    console.log(this.myForm.value.area);
 
    this.route.params.subscribe(params => {
      this.editaddid = +params['id'];
      var customerId = "491";
      this.shippingAddressService.getShippingAddressesBE("491").subscribe(
        (addresses) => {
          this.shippingAdd = <ShippingAddress[]>addresses;
          console.log(this.shippingAdd);
         
          this.clickedAddress = this.shippingAdd.find(id => id.id == this.editaddid);
          console.log(this.clickedAddress);
        });
    });
  }
  getShippingAddresses() {
    var userId = this._appService.userdetails.userId;
    userId = (JSON.parse(localStorage.getItem("user"))).userId;
  
    this.shippingAddressService.getShippingAddressesBE(userId).subscribe(
      (addresses) => {

        this.addresslist = addresses
        console.log("this is this.addresslist ", this.addresslist);
      },
      error => console.log(error)
    );
  }
  get f() {
    return this.myForm.controls;
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
    shippingaddress.id = this.editaddid;
    shippingaddress.state = this.myForm.value.state;
    shippingaddress.userId = this._appService.userdetails.userId;

    
    this.shippingAddressService.addShippingAddressBE(shippingaddress).subscribe(data => {
      this.shippingAddRes = <ShippingAddressRes>data;
      console.log("this.shippingAddRes is. ", this.shippingAddRes);
      document.getElementById("Newaddress").style.display = "none";
      this.router.navigate(['main/header/subheader/shippingAddress']);
    });

  }
  backToAddBook() {

    this.router.navigate(['/main/header/subheader/shippingAddress']);
  }
  deliverToThisAddress(addId) {
    this.save();
    console.log(addId);
    this.router.navigate(['/main/header/subheader/shipOptionSelect', addId]);
  }
  previousAddress() {
    this.router.navigate(['/main/header/subheader/shippingAddress']);
  }

}
