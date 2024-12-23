/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../sharedServices/user.service';
import { AlertService } from '../../sharedServices/alert.service';
import { User, Register, Otps, Mobileotp } from '../../data/hero';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AppService } from 'src/app/sharedServices/app.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    countdown: number = 60; // 2 minutes in seconds
    isoTP = true;
    selectedOption: 'email' | 'mobile' = 'email'; // Default selected option
    emailOtpValue = '';
    mobileOtpValue = '';
    protected aFormGroup: UntypedFormGroup;
    isOTP: boolean = false;
    isSUCCESS: boolean = false;
    isFAIL: boolean = false;
    isALREADY: boolean = false;
    otp: string;
    alphabetPattern = "[a-zA-Z ]+";
    numberPattern = "[0-9 ]+";
    pwdPattern = "^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,16}$";
    siteKey: string;
    public otpForm: UntypedFormGroup;
    public OtpVaraible: Register;
    public emailresponse: Register;
    public UserVariable: Register;
    public Userotp;
    public Userotp1;
    public otpValidationCount = 0
    enterotpval: any;
    registerForm: UntypedFormGroup;
    loading = false;
    submitted = false;
    maxTime: any = 30;
    timer: any;
    hidevalue: any;
    otpval: string;
    isSubscribed: boolean = false;  // Default state is not subscribed
    isOtpResent: boolean = false;
    constructor(private formBuilder: UntypedFormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService, private _appService: AppService,
        private appService: AppService, private getuserservice: GetOrderInfoServiceService,
    ) {
        this.siteKey = '6LekM0gbAAAAAOWZf6P4S9Pu3LKbdzMP93sz1yvW';
    }
    ngOnInit() {

        this.appService.setShowBanner(false);
        this.appService.setShowDeals(false);
        this.appService.setShowMenuIcons(false);
        this.appService.setDropdowns(false);
        // this.startCountdown();
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            emailId: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.maxLength(16)]],
            confirmPassword: ['', [Validators.required, Validators.maxLength(16)]],
            countryCode: ['+91', Validators.required],
            mobileNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('[- +()0-9]{10,12}')]],
            gender: ['', [Validators.required]],
            birthday: [''],
            maillistFlg: ['Not-Subscribed'] // Default value
        },
            {
                validator: this.MustMatch('password', 'confirmPassword')
            }
        );
        this.otpForm = this.formBuilder.group({
            emailotp: ['', Validators.required],
            mobileotp: ['', Validators.required, Validators.maxLength(10)]
        });

        this.otpValidationCount = 0;
        this.otpval = '';


    }
    formatTime(seconds: number): string {

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    onOptionChange(event: any) {
        this.selectedOption = event.target.value;

        console.log('Selected Option:', this.selectedOption);
    }
    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: UntypedFormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    Login() {
        this.router.navigate(['/main/header/subheader/login']);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    onSubscribed(event: any): void {
        this.isSubscribed = event.target.checked;
        if (this.isSubscribed) {
            this.registerForm.get('maillistFlg')?.setValue('Subscribed');
        } else {
            this.registerForm.get('maillistFlg')?.setValue('Not-Subscribed');
        }
        console.log('registerForm', this.registerForm.value);
    }



    onSubmit() {
        // stop here if form is invalid,this is for validation dont touch
        this.submitted = true;
        if (this.registerForm.invalid) {
            // alert("plz check your details")
            return;

        }
        this.loading = true;
        const mobileNumber = '+91' + this.registerForm.value.mobileNumber;
        this.registerForm.patchValue({ mobileNumber: mobileNumber });


        console.log("this.registerForm.value is.", this.registerForm.value);
        this.userService.register(this.registerForm.value)
            .subscribe(
                (data) => {
                    this.UserVariable = <Register>data
                    console.log("data is", this.UserVariable);
                    this.getuserservice.set("uservariable", this.UserVariable);
                    this.getuserservice.set("methodname", this.UserVariable.methodName);
                    console.log("this.getuserservice.get(methodname)", this.getuserservice.get("methodname"));
                    if (this.UserVariable.status === 'OTP is send successfully' || this.UserVariable.status == "registration Sucessful" || this.UserVariable.status == "mail sent..........!!" || this.UserVariable.status == "OTP is send successfully to email and mobile") {
                        console.log("the response data is", this.UserVariable);
                        console.log("above the login navigation");

                        Swal.fire('SUCCESS!!', 'A verification email has been sent!', 'success');

                        if (this.UserVariable.methodName == "mobileOTP") {
                            this.Userotp = this.UserVariable.methodName;
                            console.log("mobile otp");

                            this.registrationSuccess();
                        } else if (this.UserVariable.methodName == "emailOTP") {
                            console.log("email otp");
                            this.Userotp = this.UserVariable.methodName; -
                                this.registrationSuccess();
                        }
                        else if (this.UserVariable.methodName == "emailToken") {
                            this.Userotp = this.UserVariable.methodName;
                            console.log("emailtoken");

                            this.registrationSuccess();
                        }
                        else if (this.UserVariable.methodName == "emailOTP_And_mobileOTP") {
                            this.Userotp = this.UserVariable.methodName;
                            console.log("emailOTP_And_mobileOTP");
                            this.emailndmobileotp();
                        }
                    }
                    else {
                        this.router.navigate(['/main/header/subheader/register']);
                    }

                },
                (error) => {
                    this.alertService.error(error.error.message);
                    Swal.fire('ERROR!!', 'User with this Email or Mobile is already exists!', 'error');
                    this.loading = false;
                    this.isALREADY = true;
                    this.isSUCCESS = false;
                    this.isOTP = false;
                    console.log(error);

                    this.router.navigate(['/login']);
                }
            );

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
    registrationSuccess() {
        this.isOTP = true;
        this.startCountdown();
    }
    emailndmobileotp() {
        this.registrationSuccess();
    }

    validationOTP(val) {
        console.log(`Validating OTP for ${this.selectedOption}: ${val}`);
        console.log("val", val);
        this.enterotpval = val;
        console.log(this.enterotpval = val);
        console.log("this.Userotp", this.Userotp);
        if (this.UserVariable.methodName == "mobileOTP") {
            console.log("mobile otp service call");
            var inputotp1 = new Mobileotp();
            console.log("inputotp1", inputotp1)
            inputotp1.otp = this.enterotpval;
            console.log(inputotp1.otp);
            this.userService.verifyOTP(this.enterotpval, this.registerForm.value).subscribe(data => {
                this.OtpVaraible = <Register>data
                console.log("mobileOTP data", data)

                if (this.OtpVaraible.status === "Entered Otp is NOT valid. Please Retry!") {
                    this.isOTP = true

                }

                this.isSUCCESS = true;
                console.log("otp data", this.OtpVaraible);

            });
        }
        else if (this.Userotp == "emailOTP") {

            console.log("email otp service");

            var temp = this.userService.valAndRegUser(this.enterotpval, this.registerForm.value).subscribe(data => {
                this.OtpVaraible = <Register>data;
                console.log("otp data ", this.OtpVaraible); d:



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
                        this.isSUCCESS = false;
                        this.otpValidationCount = 0;
                        this.OtpVaraible = null;
                        temp.unsubscribe;
                        console.log("enterted two time in valid OTP , enter captcha")
                    }
                }
                else {
                    this.isOTP = false;
                    this.isSUCCESS = true;
                    console.log("message in this.OtpVaraible.status is. ", this.OtpVaraible.status);

                }

            }, (error: any) => {
                console.log(error.error.message);
            });

        }
    }

    emailmobilevalidate(data) {
        this.isOTP = true;
        console.log("emailOTP_And_mobileOTP", data);
        this.enterotpval = data;
        let alertShown = false;
        this.userService.valAndRegUser(this.enterotpval, this.registerForm.value).subscribe(data => {
            this.emailresponse = <Register>data;
            console.log("otp data", this.emailresponse);
            if (this.emailresponse.status == "Entered Otp is valid") {
                alert("Successfully entered OTP");
                console.log("2 otps are successsfull")
                this.isSUCCESS = true;
                this.router.navigate(['/main/header/subheader/login']);
            }

        });
        // if (this.Userotp == "emailOTP_And_mobileOTP") {
        //     console.log("emailOTP_And_mobileOTP");
        //     var inputotp1 = new Otps();
        //     inputotp1.mobileotp = this.enterotpval.mobileotp;
        //     var mobileotp = new Mobileotp();

        //     mobileotp.otp = inputotp1.mobileotp
        //     console.log(mobileotp.otp);
        //     this.userService.verifyOTP(this.enterotpval, this.registerForm.value).subscribe(data => {
        //         this.OtpVaraible = <Register>data
        //         console.log("otp data", this.OtpVaraible);

        //         if (this.OtpVaraible.status == "OTP is verified successfully") {
        //             console.log("2 otps are successsfull")
        //             this.isSUCCESS = true;
        //             this.router.navigate(['/main/header/subheader/login']);
        //         }
        //         else (this.OtpVaraible.status === "Entered Otp is NOT valid. Please Retry!")
        //         {
        //             alert("incorrect")

        //        }

        //     });



        // }


    }
    startCountdown() {
        this.timer = setInterval(() => {
            this.countdown--;

            if (this.countdown <= 0) {
                clearInterval(this.timer);
            } else {
                // Display the formatted time in "mm:ss" format
                const formattedTime = this.formatTime(this.countdown);
                console.log("formattedTime", formattedTime); // or update your UI with the formattedTime
            }
        }, 1000);
    }
    sendResetOTP() {
        console.log('resend called');
        console.log("this.registerForm.value is.", this.registerForm.value);


        this.loading = true;
        const mobileNumber = '+91' + this.registerForm.value.mobileNumber;
        this.registerForm.patchValue({ mobileNumber: mobileNumber });


        console.log("this.registerForm.value is.", this.registerForm.value);
        this.userService.register(this.registerForm.value)
            .subscribe(
                (data) => {
                    this.UserVariable = <Register>data
                    console.log("data is", this.UserVariable);
                    this.getuserservice.set("uservariable", this.UserVariable);
                    this.getuserservice.set("methodname", this.UserVariable.methodName);
                    console.log("this.getuserservice.get(methodname)", this.getuserservice.get("methodname"));
                    if (this.UserVariable.status === 'OTP is send successfully' || this.UserVariable.status == "registration Sucessful" || this.UserVariable.status == "mail sent..........!!" || this.UserVariable.status == "OTP is send successfully to email and mobile") {
                        console.log("the response data is", this.UserVariable);
                        console.log("above the login navigation");
                       
                        Swal.fire('SUCCESS!!', 'A verification email has been sent!', 'success');

                        if (this.UserVariable.methodName == "mobileOTP") {
                            this.Userotp = this.UserVariable.methodName;
                            console.log("mobile otp");

                            this.registrationSuccess();
                        } else if (this.UserVariable.methodName == "emailOTP") {
                            console.log("email otp");
                            this.Userotp = this.UserVariable.methodName;
                            this.registrationSuccess();


                            this.isOtpResent = true;
                            // Reset countdown and restart it
                            this.countdown = 60; // Reset the countdown to 60 seconds or any value
                            this.startCountdown(); // Restart the countdown

                        }
                        else if (this.UserVariable.methodName == "emailToken") {
                            this.Userotp = this.UserVariable.methodName;
                            console.log("emailtoken");

                            this.registrationSuccess();
                        }
                        else if (this.UserVariable.methodName == "emailOTP_And_mobileOTP") {
                            this.Userotp = this.UserVariable.methodName;
                            console.log("emailOTP_And_mobileOTP");
                            this.emailndmobileotp();
                        }
                    }
                    else {
                        this.router.navigate(['/main/header/subheader/register']);
                    }

                },
                (error) => {
                    this.alertService.error(error.error.message);
                    Swal.fire('ERROR!!', 'User with this Email or Mobile is already exists!', 'error');
                    this.loading = false;
                    this.isALREADY = true;
                    this.isSUCCESS = false;
                    this.isOTP = false;
                    console.log(error);

                    this.router.navigate(['/login']);
                }
            );
    }


}
