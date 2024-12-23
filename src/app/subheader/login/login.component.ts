/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../sharedServices/login.service';
// import { error } from '@angular/compiler/src/util';
import { UntypedFormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../../sharedServices/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../sharedServices/alert.service';
import { first } from 'rxjs/internal/operators/first';
import { User, LoginDetails, ResetPasswordStatus, Order, WishList, Register, Mobileotp, FBUser, GoogleUser, FBCred, GCred, EmailInvoice } from '../../../app/data/hero';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/sharedServices/app.service';
import { DataServiceService } from 'src/app/sharedServices/data-service.service';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { SubheaderComponent } from 'src/app/subheader/subheader.component';
import { UserdetailsService } from 'src/app/sharedServices/userdetails.service';
import { environment } from 'src/environments/environment';
import { WishListService } from 'src/app/sharedServices/wish-list.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserService } from 'src/app/sharedServices/user.service';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { EmailSubscriptionService } from 'src/app/sharedServices/email-subscription.service';
// import { CookieService } from 'ngx-cookie-service/cookie-service/cookie.service';
declare global {
  interface Window {
    dataLayer: any[];
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  window: any;
  hide: false;
  [x: string]: any;
  public user1: LoginDetails;
  isOTP: boolean = false;
  isSUCCESS: boolean = false;
  isFAIL: boolean = false;
  otp: string;
  public otpForm: UntypedFormGroup;
  public OtpVaraible: Register;
  public OTPVariable: Register;
  public emailresponse: Register;
  public val: any;
  public Userotp: any;
  public otpValidationCount = 0
  otpval: string;
  enterotpval: any;
  siteKey: string;
  UserVariable: { status: string; };
  loading = false;
  submitted = false;
  loginForm: UntypedFormGroup;
  returnUrl: string;
  private loginDetails: LoginDetails;
  resetpasswordForm: UntypedFormGroup;
  forgotpasswordForm: UntypedFormGroup;
  private userdetails;
  showsecurityquestionForm: UntypedFormGroup;
  private submittedSecurityAnswer = true;
  private error;
  private forgotemaildetails;
  private currentemail;
  private remembermeclicked;
  private formdetails;
  private viewOrder: Order;
  public loggedin = true;
  public responseData: any;
  public userPostData = {
    emailId: '',
    firstName: '',
    provider: '',
    provider_id: '',
    provider_pic: '',
    user_id: ''
  };
  private linDetails: LoginDetails;
  userDetails: [];
  isresetPassword: boolean;
  isForgotPassword: boolean;
  private rememberedemail = localStorage.getItem('email');
  private orderId: number;
  private order: Order[];
  private wishlistDetail: WishList[];
  favourites: number[] = [];
  countdown: number = 300; // 5 minutes in seconds
  countdownInterval: any;







  constructor(private formBuilder: UntypedFormBuilder, private _http: HttpClient, private _appservice: AppService, private _loginService: LoginService, private route: ActivatedRoute,
    private router: Router, public dataService: DataServiceService, private userService: UserService, private getuserservice: GetOrderInfoServiceService
    , private authenticationService: AuthenticationService, private alertService: AlertService, private orderService: OrderService, private cookieService: CookieService,
    private appService: AppService, private getOrderInfoService: GetOrderInfoServiceService, private socialAuthService: SocialAuthService,
    private _userdetails: UserdetailsService, private _wishlistService: WishListService, private emailSubscriptionService: EmailSubscriptionService, private _userService: UserService) {
    this.isForgotPassword = false;
    this.siteKey = '6LekM0gbAAAAAOWZf6P4S9Pu3LKbdzMP93sz1yvW';




  }

  ngOnInit() {
    
    gtag("event", "login", {
      method: "Google"
    });
    this.appService.setShowBanner(false);
    this.appService.setShowDeals(false);
    this.appService.setShowMenuIcons(false);
    this.appService.setDropdowns(false);

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
    console.log(this.route.snapshot.data['userDetails']);

    this.user1 = this.route.snapshot.data.userDetails;
    console.log(this.user1);
    localStorage.setItem('firstName', this.user1.firstName);
    console.log(localStorage.getItem('firstName'));

    this.orderService.getPreviousUrl();
    this._loginService.logout();
    this.resetpasswordForm = this.formBuilder.group({
      newpassword: ['', [Validators.required, Validators.minLength(6),
      this.validateSpecialChars,
      this.validateCapitalLetters,
      this.validateNumbers]],
      confirmpassword: ['', Validators.required]
    },
      { validator: this.passwordMatchValidator }
    );
    this.forgotpasswordForm = this.formBuilder.group({
      emailId: ['']
    });
    this.showsecurityquestionForm = this.formBuilder.group({
      securityquestion: ['', [Validators.required, Validators.minLength(6)]],
      securityanswer: ['']
    });
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._loginService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    this.otpValidationCount = 0;
    this.otpval = '';
  }
  ngOnDestroy() {
    // Clean up the countdown timer when the component is destroyed
    clearInterval(this.countdownInterval);
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
  passwordMatchValidator(frm: UntypedFormGroup) {
    console.log("entered into passwordMatchValidator(.) method");
    return frm.controls['newpassword'].value === frm.controls['confirmpassword'].value ? null : { 'mismatch': true };
  }
  get f() {
    return this.loginForm.controls;
  }
  checkLoginDetails() {
    this.loading = true;
    console.log(this.loginForm.value);
    if (this.loginForm.value.emailId == "" && this.loginForm.value.password == "") {
      this.error = "make sure to enter mailId and password";
      console.log(this.error);
    }
    console.log(this.loginForm.value);
    this._loginService.getLoginStatus(this.loginForm.value).subscribe(data => {
      console.log("data is.", data);
      this.user1 = data;

      this.getuserservice.set('userdetails', this.user1);
      localStorage.setItem('useremail', this.user1.emailId);
      // coded by shashikanth
      localStorage.setItem('firstName', this.user1.firstName);
      // storing userId for future purpose using localStorage.
      localStorage.setItem('userId', JSON.stringify(this.user1.userId));
      // this below only line is added by shashikanth in 19-jan-2022.It is used in favorites.component.ts file.
      localStorage.setItem('user', JSON.stringify(this.user1));

      if (localStorage.getItem('firstName') == "null") {
        localStorage.setItem('firstName', 'Please sign in');
      }
      console.log("shashikanth's new firstName is: ", localStorage.getItem('firstName'));

      this.dataService.dataFromService = this.user1;
      console.log(this.dataService.dataFromService);
      console.log(this.user1);
      console.log("this.user1.loginStatus", this.user1.loginStatus);
      if (this.user1.loginStatus == "not a valid user please enter valid credentials or else do register") {
        window.alert("You entered wrong email Id and password plz try again")
        window.location.reload();
      }
      if (this.user1.loginStatus == "login success") {
        sessionStorage.setItem('loggedUser', this.user1.emailId);
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('useremail', JSON.stringify(this.user1.emailId));
        localStorage.setItem('userpassword', this.user1.password);
        this.getuserservice.set('useremail', this.user1.emailId);
        this.getuserservice.set('isLoggedIn', this.loggedin);
        console.log(this.getuserservice.get('isLoggedIn'));

        this.appService.userDetails$.next(this.user1); // this line is coded by shashikanth.

        if (this.remembermeclicked == true) {

          console.log("you have entered into this.remembermeclicked==true. ");
          localStorage.setItem('useremailId', this.user1.emailId);
          localStorage.setItem('firstName', this.user1.firstName);
        }
        //coded by shashikanth (added emailId and password to cookies or storage objects)
        console.log("Current useremailId is: ", localStorage.getItem('useremailId'));
        console.log("Current password is: ", localStorage.getItem('password'));

        console.log("this.user1.firstname is. ", this.user1.firstName);


        // getting orderId.
        this.orderService.getOrderId(this.user1.userId, "open").then(data => {
          this.orderId = data;
          console.log("value of getOrderId. ", this.orderId);
          this.getOrderInfoService.set('orderId', this.orderId);
          // getting view orderDetails using orderId.
          if (this.orderId !== undefined && this.orderId != 0) {
            this.orderService.getProductFromCart(this.orderId).subscribe
              (data => {
                console.log("this is ngOnInit() of login.component.ts file. ");
                console.log("data in getProductFromCart is. ", data);
                this.viewOrder = <Order>data['order'];
                console.log("this is data variable. ", data);
                console.log("this is this.viewOrder. ", this.viewOrder);
                var count: number = 0;
                this.viewOrder.orderItemObj.forEach(item => count = count + parseInt(item.quantity));
                console.log("length of cart size. (in login.component.ts ) ", count);
                this.orderService.cartLengthChange.next(count);
                console.log("after finding length of cart size. (in login.component.ts )");

                console.log("this.viewOrder in login.component.ts ", this.viewOrder);

                this.getOrderInfoService.set("order", this.viewOrder);

              });
          } else {
            this.orderService.cartLengthChange.next(0);
          }

        });

        //getting the user_id
        console.log("user details in appservice is.(to test) ", this._appservice.getUser());
        var userId = this._appservice.getUser().userId;
        this._wishlistService.getFavourites(userId).subscribe(data => {
          console.log("SkuIds of Favourites is", data);
          this.favourites = data;
        });
        this._appservice.userdetails = this.user1;
        console.log("user_id in this.user1 is. ", this.user1.userId)
        localStorage.setItem("userDetails", this.user1 as unknown as string);
        localStorage.setItem('userId', this.user1.userId.toString());

        console.log(this._appservice.userdetails);
        this.getuserservice.set('isLoggedIn', 'true');
        this.getuserservice.get('isLoggedIn');
        localStorage.getItem('isLoggedIn');

        if (this.orderService.previousUrl == "/main/header/subheader/customerOrders") {
          console.log("enters into privious url function");
          this.router.navigate(['/main/header/subheader/customerOrders']);

        }
        else if (this.orderService.previousUrl == "/main/header/subheader/cart")
          this.router.navigate(['/main/header/subheader/cart']);
        else if (this.orderService.previousUrl == "/main/header/subheader/favorites")
          this.router.navigate(['/main/header/subheader/favorites']);

        else {
          console.log("you have entered into else block of checkeLoginDetails. ");

          this.router.navigate(['/main/header/subheader/products']);
        }
      }
    });
  }
  autopwd() {
    if (this.loginForm.value.emailId == localStorage.getItem('useremailId')) {
      this.loginForm.value.password = localStorage.getItem('password');
    }
    console.log("shashikanth side test()'s if condition.");
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  facebookLogin(): void {
    console.log("entered into facebookLogin() ");
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      console.log("FB data is. ", userData);
      this.user = userData;
      console.log("this.user.name is. ", this.user.name);
      this.user1.firstName = this.user.name;
      this._appservice.userdetails = new AppService().userdetails;
      this._appservice.userdetails.firstName = this.user.name;
      localStorage.setItem("firstName", this.user.name);
      this._appservice.userdetails = this.user1;
      var userType = userData.provider;
      localStorage.setItem("userType", userType);

      var credential: FBCred = new FBCred();
      credential.emailId = this.user.email;
      credential.password = "NA";

      this._loginService.getLoginStatus(credential).subscribe(dt => {
        console.log("values of dt are. ", dt);
        this._appservice.userdetails.userId = dt.userId;
        var fbUser = new FBUser();
        fbUser.firstName = userData.name;
        fbUser.emailId = userData.email;
        this._loginService.FBLogin(fbUser).subscribe(FBData => {
          console.log("values of  FBData are. ", FBData);
          localStorage.setItem('useremail', FBData.emailId);
          this.router.navigate(['/main/header/subheader/products']);
          // getting orderId.
          this.orderService.getOrderId(this.user1.userId, "open").then(data => {
            this.orderId = data;
            console.log("value of getOrderId. ", this.orderId);
            this.getOrderInfoService.set('orderId', this.orderId);
            // getting view orderDetails using orderId.
            if (this.orderId !== undefined && this.orderId != 0) {
              this.orderService.getProductFromCart(this.orderId).subscribe
                (data => {
                  console.log("data in getProductFromCart is. ", data);
                  this.viewOrder = <Order>data['order'];
                  console.log("this is data variable. ", data);
                  console.log("this is this.viewOrder. ", this.viewOrder);
                  this.cartItemCount = this.viewOrder.orderItemObj.length;
                  var count: number = 0;
                  this.viewOrder.orderItemObj.forEach(item => count = count + parseInt(item.quantity));
                  console.log("length of cart size. (in login.component.ts ) ", count);
                  this.orderService.cartLengthChange.next(count);
                  console.log("after finding length of cart size. (in login.component.ts )");
                  console.log("this.viewOrder in login.component.ts ", this.viewOrder);
                  this.getOrderInfoService.set("order", this.viewOrder);

                });
            } else {
              this.orderService.cartLengthChange.next(0);
            }
          });
        });
      });
    });

  }
  // googleLogin() {
  //   console.log("entered into googleLogin(). ");
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
  //     console.log("Google user data is. ", userData);
  //     this.user = userData;
  //     console.log("this.user.name is. ", this.user.name);
  //     this.user1.firstName = this.user.name;
  //     this._appservice.userdetails = new AppService().userdetails;
  //     this._appservice.userdetails.firstName = this.user.name;
  //     localStorage.setItem("firstName", this.user.name);
  //     this._appservice.userdetails = this.user1;
  //     var userType = userData.provider;
  //     localStorage.setItem("userType", userType);

  //     var credential: GCred = new GCred();
  //     credential.emailId = this.user.email;
  //     credential.password = "NA";

  //     this._loginService.getLoginStatus(credential).subscribe(dt => {
  //       console.log("values of dt are. ", dt);
  //       this._appservice.userdetails.userId = dt.userId;
  //       var googleUser = new FBUser();
  //       googleUser.firstName = userData.name;
  //       googleUser.emailId = userData.email;
  //       this._loginService.GoogleLogin(googleUser).subscribe(googleData => {
  //         console.log("values of  Google Data are. ", googleData);
  //         this.router.navigate(['/main/header/subheader/products']);
  //         // getting orderId.
  //         this.orderService.getOrderId(this.user1.userId, "open").then(data => {
  //           this.orderId = data;
  //           console.log("value of getOrderId. ", this.orderId);
  //           this.getOrderInfoService.set('orderId', this.orderId);
  //           // getting view orderDetails using orderId.
  //           if (this.orderId !== undefined && this.orderId != 0) {
  //             this.orderService.getProductFromCart(this.orderId).subscribe
  //               (data => {
  //                 console.log("data in getProductFromCart is. ", data);
  //                 this.viewOrder = <Order>data['order'];
  //                 console.log("this is data variable. ", data);
  //                 console.log("this is this.viewOrder. ", this.viewOrder);
  //                 this.cartItemCount = this.viewOrder.orderItemObj.length;
  //                 var count: number = 0;
  //                 this.viewOrder.orderItemObj.forEach(item => count = count + parseInt(item.quantity));
  //                 console.log("length of cart size. (in login.component.ts ) ", count);
  //                 this.orderService.cartLengthChange.next(count);
  //                 console.log("after finding length of cart size. (in login.component.ts )");
  //                 console.log("this.viewOrder in login.component.ts ", this.viewOrder);
  //                 this.getOrderInfoService.set("order", this.viewOrder);

  //               });
  //           } else {
  //             this.orderService.cartLengthChange.next(0);
  //           }
  //         });
  //       });
  //     });
  //   });
  //   console.log("control came out of this.socialAuthService.signIn(.). ");
  // }
  googleLogin() {

    console.log("Entered into googleLogin(). ");
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      console.log("Google user data is: ", userData);
      this.user = userData;
      this.user1.firstName = this.user.name;
      this._appservice.userdetails.firstName = this.user.name;
      localStorage.setItem("firstName", this.user.name);
      var userType = userData.provider;
      localStorage.setItem("userType", userType);

      var credential: GCred = new GCred();
      credential.emailId = this.user.email;
      credential.password = "NA";

      this._loginService.getLoginStatus(credential).subscribe(dt => {
        console.log("Login status response: ", dt);
        this._appservice.userdetails.userId = dt.userId;
        var googleUser = new FBUser();
        googleUser.firstName = userData.name;
        googleUser.emailId = userData.email;
        this._loginService.GoogleLogin(googleUser).subscribe(googleData => {
          console.log("Google login data: ", googleData);
          this.router.navigate(['/main/header/subheader/products']);

          this.orderService.getOrderId(this.user1.userId, "open").then(data => {
            this.orderId = data;
            this.getOrderInfoService.set('orderId', this.orderId);
            if (this.orderId !== undefined && this.orderId != 0) {
              this.orderService.getProductFromCart(this.orderId).subscribe(data => {
                this.viewOrder = <Order>data['order'];
                this.cartItemCount = this.viewOrder.orderItemObj.length;
                var count: number = 0;
                this.viewOrder.orderItemObj.forEach(item => count += parseInt(item.quantity));
                this.orderService.cartLengthChange.next(count);
                this.getOrderInfoService.set("order", this.viewOrder);
              });
            } else {
              this.orderService.cartLengthChange.next(0);
            }
          });
        });
      });
    }).catch(error => {
      console.error("Google login failed: ", error);
    });
    console.log("Control exited googleLogin(). ");
  }

  RememberingEmail() {
    this.remembermeclicked = true;
  }
  Register() {
    this.router.navigate(['/main/header/subheader/register']);
  }
  ForgotPassword() {
    this.CheckEmail();
  }
  CloseForgotPasssword1() {
    console.log("forgot password1");
  }
  CheckEmail() {
    this.isresetPassword = true;
    this.formdetails = this.forgotpasswordForm.value;
    console.log("this is checkEmail() method. ", this.formdetails);
    this._loginService.CheckEmail(this.formdetails).subscribe(response => {
      console.log("response");
      console.log(response);
      if (response.status == "User with this email does not exists,Please try again") {
        Swal.fire('Error', response.status, 'error');
        this.isForgotPassword = true;
        this.isresetPassword = false;
        this.isOTP = false;
      }
      if (response.status == "registerd Email") {
        //reset the password
        Swal.fire('Success', 'OTP has been sent to your email', 'success').then(
          (res) => {
            console.log(res);
            this.isOTP = true;
            this.isresetPassword = false;
            this.isForgotPassword = false;
          }
        );

        console.log("email exists in the database enter the new password");
      }
    });
  }

  sendResetPwdOTP() {
    console.log("Enterd sendResetPwdOTP method")
    this.formdetails = this.forgotpasswordForm.value;
    this._loginService.sendOTP(this.formdetails.emailId).subscribe((res) => {
      console.log(res);
      this.OTPVariable = <Register>res;
      if (this.OTPVariable.status == "Reset password OTP mail has been sent to mail") {

        if (this.OTPVariable.methodName == "mobileOTP") {
          console.log("mobile otp");
          this.registrationSuccess();
        }
        else if (this.OTPVariable.methodName == "emailOTP") {
          console.log("email otp");
          this.Userotp = this.OTPVariable.methodName;
          this.registrationSuccess();
        }
        if (this.OTPVariable.methodName == "emailOTP_And_mobileOTP") {
          console.log("email otp");
          this.Userotp = this.OTPVariable.methodName;
          this.registrationSuccess();
        }
        Swal.fire('Success!', this.OTPVariable.status, 'success').then(
          (res) => {
            this.isOTP = true;
            this.isForgotPassword = false;
          });
      }
      else if (this.OTPVariable.status == "User with this E-mail does not exists") {
        Swal.fire('Error!', this.OTPVariable.status, 'error').then(
          (res) => {
            this.isOTP = false;
            this.isForgotPassword = true;
          });
      }
      else {
        console.log("else block");
      }
    },
      (error) => {
        Swal.fire('Error!', 'While sending reset password link', 'error');
      });

  }

  registrationSuccess() {
    this.isOTP = true;
    this.startCountdown();
  }

  closeshowsecurityquestion() {

  }
  CheckSecurityAnswer() {

  }
  CloseForgotPasssword2() {

  }
  ResetPassword() {
    var formdetails1 = this.resetpasswordForm.value;
    if (formdetails1.newpassword == formdetails1.confirmpassword) {
      console.log("new password and confirm password is same");
      console.log("this is ResetPassword() method ", this.formdetails);
      var checkpassworddetails = { emailId: this.formdetails.emailId, password: formdetails1.newpassword };
      this._loginService.resetPasswordInit(checkpassworddetails).subscribe(data => {
        this.UserVariable = <any>data
        console.log(formdetails1.newpassword);
        console.log(this.UserVariable);
        if (this.UserVariable.status == "reset password successfully") {
          this.isresetPassword = false;
          console.log("password is successfully updated");

          Swal.fire('SUCCESS!!', 'Password is successfully updated!', 'success');
        }

      });
    }
  }
  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }



    this.loading = true;
    console.log("login submit working");

    this.authenticationService.login(this.f.emailId.value)
      .subscribe(
        data => {
          console.log(data);
          console.log("this is the response from login");

        },

        error => {
          console.log(error);

          this.loading = false;
        });
  }

  validationOTP(val) {
    console.log(val);
    this.enterotpval = val;

    console.log(this.enterotpval = val);
    console.log("this.Userotp", this.Userotp);
    // if (this.Userotp == "mobileOTP") {
    //   console.log("mobile otp service call");
    //   var inputotp1 = new Mobileotp();
    //   inputotp1.otp = this.enterotpval;
    //   console.log(inputotp1.otp);
    //   this.userService.verifyOTP(this.enterotpval).subscribe(data => {
    //     this.OtpVaraible = <Register>data
    //     if (this.OtpVaraible.status === "Entered Otp is NOT valid. Please Retry!") {
    //       this.isOTP = true
    //     }

    //     this.isSUCCESS = true;
    //     console.log("otp data", this.OtpVaraible);

    //   });
    // }
    // else 
    // if (this.Userotp == "emailOTP") {

    console.log("email otp service");
    var temp = this.userService.validateOtp(this.enterotpval).subscribe(data => {
      this.OtpVaraible = <Register>data;
      console.log("otp data", this.OtpVaraible);


      if (this.OtpVaraible.status === "Entered Otp is NOT valid. Please Retry!") {
        this.isOTP = true;
        this.isFAIL = true;

        this.otpValidationCount++;
        this.otpval = '';
        if (this.otpValidationCount == 1) {
          console.log("enterted two time in valid OTP , enter captcha")
        }
        if (this.otpValidationCount > 4) {
          this.isOTP = false;
          this.isresetPassword = false;
          this.otpValidationCount = 0;
          this.OtpVaraible = null;
          temp.unsubscribe;
          console.log("enterted two time in valid OTP , enter captcha")

        }
      }
      else {
        this.isOTP = false;
        this.isresetPassword = true;
        this.isFAIL = false;

      }

    }, (error: any) => {
      console.log(error.error.message);
    });

  }


  // }

  one() {
    alert("u have selected remember me check box. ");
  }
  validateSpecialChars(control) {
    // Add your special character validation logic here
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(control.value)) {
      return { specialChars: true };
    }
    return null;
  }
  validateCapitalLetters(control) {
    // Add your capital letter validation logic here
    if (!/[A-Z]/.test(control.value)) {
      return { capitalLetters: true };
    }
    return null;
  }
  validateNumbers(control) {
    // Add your number validation logic here
    if (!/[0-9]/.test(control.value)) {
      return { numbers: true };
    }
    return null;
  }
  startCountdown() {
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }












}

