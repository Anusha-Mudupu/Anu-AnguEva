/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../../data/hero'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentCaptureService {

  paymentId: String;

  constructor(private _httpClient: HttpClient) {
  }
  getPaymentDetails(paymentId): Observable<PaymentDetails> {
    console.log(paymentId);
    return this._httpClient.get<PaymentDetails>(environment.getPaymentDetailsUrl + paymentId);
  }
}
