/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { PaymentDetails } from '../../../data/hero'
import { Router } from '@angular/router';
import { AppService } from 'src/app/sharedServices/app.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Input() details: PaymentDetails;
  constructor(private router: Router, private _appService: AppService, private appService: AppService) { }

  ngOnInit() {
    this.appService.setShowDeals(false);
    this._appService.setShowBanner(false);
    this._appService.setShowMenuIcons(false);
    console.log(this.details);
    console.log(this.details.amount);
  }
  orderTracking() {

  }
  // sending E-Mail with invoice attachment.TBD
  sendingEmail() {

  }
}
