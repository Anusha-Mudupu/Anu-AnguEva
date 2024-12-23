/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/sharedServices/contact-us.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactus: UntypedFormGroup;
  public submit: any;
  contactsus: any = [];
  constructor(private contactService: ContactUsService) { }

  ngOnInit() {
    console.log("you have entered into ngOnInit()");

    this.buildContactus();

  }
  buildContactus(): void {

    this.contactus = new UntypedFormGroup({

      contactType: new UntypedFormControl('', Validators.required),
      userId: new UntypedFormControl(''),
      orderId: new UntypedFormControl('', Validators.required),

      assignedTo: new UntypedFormControl(''),
      userEmailId: new UntypedFormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),

      userPhone: new UntypedFormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.maxLength(13)]),

      reasonId: new UntypedFormControl('', Validators.required),
      reasonDesc: new UntypedFormControl('', Validators.required)
    });

  }
  get email() {
    return this.contactus.get('userEmailId');
  }
  get mobileNo() {
    return this.contactus.get('userPhone');
  }
  post() {
    this.contactService.insertData(this.contactus.value).subscribe(data => {
      this.contactsus = data;
      console.log(this.contactus.value);
      this.buildContactus();
    });

  }
  resetForm() {
    this.contactus.reset();
    console.log("you have entered into resetForm() method.");

    this.buildContactus();

  }
}


