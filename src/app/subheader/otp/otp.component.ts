/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */

import { Component, OnInit, Input } from '@angular/core';
import { Register, Mobileotp, Otps } from 'src/app/data/hero';
import { UserService } from 'src/app/sharedServices/user.service';
import { AppService } from 'src/app/sharedServices/app.service';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  @Input() User: Register;
  public OtpVaraible: Register;
  public emailresponse: Register;
  inputotp: Mobileotp;
  expirytime: any;
  enterotpval: any;
  otpForm: UntypedFormGroup;
  emailotp;
  mobileotp;
  maxTime: any = 30;
  timer: any;
  hidevalue: any;
  public Userotp;
  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: UntypedFormBuilder, private _appService: AppService, private getuserservice: GetOrderInfoServiceService,) { }

  ngOnInit() {
    this._appService.setShowBanner(false);
    this.otpForm = new UntypedFormGroup({
      emailotp: new UntypedFormControl("", Validators.required),
      mobileotp: new UntypedFormControl("", Validators.required)
    });
    console.log("Uservariable", this.User);
    this.getuserservice.get("uservariable");
    console.log(this.getuserservice.get("uservariable"));
    this.Userotp = this.getuserservice.get("methodname");
    console.log(this.getuserservice.get("methodname"));

  }
  StartTimer() {
    console.log("start timer");
    this.timer = setTimeout(x => {
      if (this.maxTime <= 0) { }
      this.maxTime -= 1;

      if (this.maxTime > 0) {
        this.hidevalue = false;
        this.StartTimer();
      }

      else {
        this.hidevalue = true;
      }

    }, 1000);
  }

  // validationOTP(val) {
  //   console.log(val);
  //   this.enterotpval = val;

  //   console.log(this.enterotpval = val);
  //   if (this.Userotp == "mobileOTP") {
  //     console.log("mobile otp service call");
  //     var inputotp1 = new Mobileotp();
  //     inputotp1.otp = this.enterotpval;
  //     console.log(inputotp1.otp);
  //     this.userService.verifyOTP(inputotp1).subscribe(data => {
  //       this.OtpVaraible = <Register>data
  //       console.log("otp data", this.OtpVaraible);

  //     });
  //   }
  //   else if (this.Userotp == "emailOTP") {

  //     console.log("email otp service");
  //     this.userService.validateOtp(this.enterotpval).subscribe(data => {
  //       this.OtpVaraible = <Register>data;
  //       console.log("otp data", this.OtpVaraible);
  //       this.router.navigate(['/main/header/subheader/login']);

  //     });

  //   }

  //   document.getElementById("onetimepassword").style.display = "none";
  //   document.getElementById("onetp").style.display = "block";
  //   document.getElementById("onetp").style.color = "Green";

  // }
  // emailmobilevalidate(data) {
  //   console.log(data);
  //   this.enterotpval = data;

  //   if (this.Userotp == "emailOTP_And_mobileOTP") {
  //     console.log("emailOTP_And_mobileOTP");
  //     var inputotp1 = new Otps();
  //     inputotp1.mobileotp = this.enterotpval.mobileotp;
  //     var mobileotp = new Mobileotp();
  //     mobileotp.otp = inputotp1.mobileotp
  //     console.log(mobileotp.otp);
  //     this.userService.verifyOTP(mobileotp).subscribe(data => {
  //       this.OtpVaraible = <Register>data
  //       console.log("otp data", this.OtpVaraible);
  //       this.router.navigate(['/main/header/subheader/login']);

  //     });
  //     this.userService.validateOtp(this.enterotpval.emailotp).subscribe(data => {
  //       this.emailresponse = <Register>data;
  //       console.log("otp data", this.emailresponse);
  //       this.router.navigate(['/main/header/subheader/login']);

  //     });

  //     if (this.OtpVaraible.status == "OTP is verified successfully" && this.emailresponse.status == "Entered Otp is valid") {
  //       console.log("2 otps are successsfull")
  //       this.router.navigate(['/main/header/subheader/login']);
  //     }


  //   }

  // }


}
