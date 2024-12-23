import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/sharedServices/app.service';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { ShippingAddressService } from 'src/app/sharedServices/shipping-address.service';

@Component({
  selector: 'app-orderitem-feedback',
  templateUrl: './orderitem-feedback.component.html',
  styleUrls: ['./orderitem-feedback.component.css']
})
export class OrderitemFeedbackComponent implements OnInit {
  name = 'Feedback';
  formGroup: UntypedFormGroup
  registerForm: UntypedFormGroup
  submitted = false


  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute,
    private shippingAddressService: ShippingAddressService,
    private getOrderInfoService: GetOrderInfoServiceService, private router: Router,
    private _appService: AppService, private http: HttpClient, public appService: AppService) {
    this.registerForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpassword: ['', Validators.required],
      feedback: ['', Validators.required]
    },
      {
        validators: this.mustMatch('password', 'cpassword')
      })
  }
  ngOnInit(): void {
    this.appService.setShowBanner(false);
    this.appService.setShowDeals(false);
    this.appService.setShowMenuIcons(false);
  }
  goToViewOrder() {
    this.router.navigate(["/main/header/subheader/customerOrders"]);
  }
  mustMatch(password: any, cpassword: any) {
    return (formGroup: UntypedFormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const cpasswordcontrol = formGroup.controls[cpassword];
      if (passwordcontrol.value !== cpasswordcontrol.value) {
        cpasswordcontrol.setErrors({ mustMatch: true })
      } else {
        cpasswordcontrol.setErrors(null);
      }
    }
  }
  onSubmit() {
    this.submitted = true

    if (this.registerForm.invalid) {
      return
    }
    alert("Success")
    console.log(this.registerForm)
  }
  Space(event: any) {
    console.log(event)
    console.log(event.target.selectionStart)
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault()
    }
  }
}



