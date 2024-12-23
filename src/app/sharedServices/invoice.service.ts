/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmailInvoice, EmailOrderConfirmation } from '../data/hero';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http: HttpClient) { }

  downloadInvoice(orderId) {
    console.log("orderId is.(in service) ", orderId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log("downloadInvoiceUrl is. ", environment.downloadInvoiceUrl + orderId);
    return this._http.get(environment.downloadInvoiceUrl + orderId, { responseType: 'blob' });
  }
  custOrderDetails(userId) {
    console.log("userId is.(in service) ", userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    console.log("custOrderDetailsUrl is. ", environment.custOrderDetailsUrl + userId);
    return this._http.get<any>(environment.custOrderDetailsUrl + userId);
  }
  getBlobFile(orderId: number) {

    console.log("downloadInvoiceUrl is. ", environment.downloadInvoiceUrl + orderId);
    return this._http.get(environment.downloadInvoiceUrl + orderId, { responseType: 'blob' });
  }
  getProductSkuById(id: number) {
    console.log("getProductSkuById", environment.getProductSkuById + id)
    return this._http.get(environment.getProductSkuById + id)
  }
  emailWithAttachment(emailWithAttachment: EmailInvoice) {
    let data = {
      "orderId": emailWithAttachment.orderId,
      "email": emailWithAttachment.email,
      "subject": emailWithAttachment.subject,
      "body": emailWithAttachment.body
    }
    let body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })

    };
    console.log("environment.emailWithAttachmentUrl is. ", environment.emailWithAttachmentUrl, body, httpOptions);
    return this._http.post<any>(environment.emailWithAttachmentUrl, body, httpOptions);
  }

  getEmailIdByUserId(userId: number) {
    console.log("userId is.(in service) ", userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    console.log("environment.userEmailIdUrl is. ", environment.userEmailIdUrl + userId);
    return this._http.get(environment.userEmailIdUrl + userId);
  }

  emailWithOrderConfirmation(orderConfirmation: EmailOrderConfirmation) {
    let data = {
      "orderId": orderConfirmation.orderId,
      "emailTo": orderConfirmation.emailTo,
      "subject": orderConfirmation.subject,
    }
    let body = JSON.stringify(data);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })

    };
    console.log("environment.emailWithOrderConfirmationUrl is. ", environment.emailWithOrderConfirmationUrl, body, httpOptions);
    return this._http.post<any>(environment.emailWithOrderConfirmationUrl, body, httpOptions);
  }

  whatsappNotificationwithOrderConfirmation(orderConfirmation:any){
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'
      })

    };
    console.log('whatsapp called in service')
    // console.log("environment.emailWithOrderConfirmationUrl is. ", environment.whatsappotificationUrl+ orderConfirmation, httpOptions);
    return this._http.post<any>(environment.whatsappNotificationUrl,orderConfirmation, httpOptions);
  }
}
