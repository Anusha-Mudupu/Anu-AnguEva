/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { User } from '../../../app/data/hero';
import { DataServiceService } from 'src/app/sharedServices/data-service.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/sharedServices/user.service';
import { AppService } from 'src/app/sharedServices/app.service';
import { ThemeService } from 'src/app/theme.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private UserProfileData;
  private id: string;
  public isReadonly: any;
  val: any = false;
  public updatepwd: any;
  public btnreadonly: any;
  userId: number;
  userProfile: User;
  loading = false;
  submitted = false;
  myForm: UntypedFormGroup;
  loading1: boolean = true;
  btnLabel: any;
  showBtnLabel: boolean = false;
  constructor(
    private router: Router,
    public dataService: DataServiceService,
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserService,
    private _appService: AppService,
    public themeService: ThemeService) { }

  ngOnInit() {
    this._appService.setShowBanner(false);
    this._appService.setShowMenuIcons(false);
    this._appService.setShowDeals(false);
    setTimeout(() => {
      this.loading1 = false
    }, 700);
    this.isReadonly = true;
    console.log(this.dataService.dataFromService);
    this.UserProfileData = this.dataService.dataFromService;
    this.id = localStorage.getItem('token');

    this.myForm = this._formBuilder.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      mobileNumber: ['', [Validators.required, this.mobileNumberValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      maillistFlg: ['', Validators.required]
    });
    this.fillProfile();
  }
  fillProfile() {
    this.myForm
    this.userId = this._appService.getUser().userId;
    // this below only line is added by shashikanth in 20-jan-
    this.userId = (JSON.parse(localStorage.getItem("user"))).userId;
    console.log("this.userId is. ", this.userId);
    //get the user profile details using userId.
    this._userService.getUserProfile(this.userId).subscribe(data => {
      this.userProfile = data;
      console.log("getUserProfile is. ", data);
      console.log("this.userProfile.user_id is.", this.userProfile.userId);
      this.myForm.controls["userId"].setValue(this.userProfile.userId);
      this.myForm.controls["firstName"].setValue(this.userProfile.firstName);
      this.myForm.controls["lastName"].setValue(this.userProfile.lastName);
      this.myForm.controls["emailId"].setValue(this.userProfile.emailId);
      this.myForm.controls["mobileNumber"].setValue(this.userProfile.mobileNumber);
      this.myForm.controls["password"].setValue(this.userProfile.password);
      this.myForm.controls["gender"].setValue(this.userProfile.gender);
      this.myForm.controls['maillistFlg'].setValue(this.userProfile.maillistFlg);
      var birthday = new Date(this.userProfile.birthday);
      let year = birthday.getFullYear();
      let mm = (birthday.getMonth() + 1);
      let dd = birthday.getDate();
      let month;
      let day;
      if (dd < 10)
        day = '0' + dd;
      else
        day = dd;
      if (mm < 10)
        month = '0' + mm;
      else
        month = mm;
      let date: string = year + "-" + month + "-" + day;
      this.myForm.controls["birthday"].setValue(date);
      console.log("Date is. ", date);

      if (this.userProfile.maillistFlg === 'Subscribed') {
        this.showBtnLabel = true;
        this.btnLabel = 'UnSubscribe';

      }
    });






  }
  // cancel button functionality
  showProfile(): void {
    this.router.navigate(['/main/header/subheader/products'])
    this.fillProfile();
    this.isReadonly = true;
    this.val = true;

  }
  onUnsubscribed() {

    this.myForm.patchValue({ maillistFlg: 'UnSubscribed' });
    console.log('myform', this.myForm.value);
    const modal = document.getElementById('myModal1');
    modal.style.display = 'none';

  }


  closeModel() {
    const modal = document.getElementById('myModal1');
    modal.style.display = 'none';

  }
  openModel() {
    const modal = document.getElementById('myModal1');
    modal.style.display = 'block';


  }




  myFunction() {
    document.getElementById("profile").style.display = "block";
  }
  editProfile() {
    console.log("this is editProfile(). ");
    this.isReadonly = false;
    this.val = null;
    this.loading = false;
  }
  mobileNumberValidator(control: UntypedFormControl) {
    const mobileNumber = control.value;

    if (mobileNumber && mobileNumber.length !== 10) {
      return { invalidMobileNumber: true };
    }

    return null;
  }

  submitProfile() {
    console.log("this is submitProfile(). ");
    this.submitted = true;

    // if (this.myForm.invalid) {
    //   alert("plz check your details")
    //   console.log("this is myForm data inside if block. ", this.myForm.value);
    //   return;
    // }

    this.loading = true;
    console.log("this is myForm data. ", this.myForm.value);
    this._userService.saveUserProfile(this.myForm.value).subscribe();
    this.isReadonly = true;
    this.val = false;
    alert(" user profile information has been updated successfully ");

  }
  get f() {
    return this.myForm.controls;
  }

}
