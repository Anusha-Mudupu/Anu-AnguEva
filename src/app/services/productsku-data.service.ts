/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  OrderDetails, ProductSku} from '../data/data-objects';
import { ProductSkudetails } from '../data/productskudetail';

@Injectable({
  providedIn: 'root'
})
export class ProductSkuDataService {
  id: any;
  selectedFile: any;

  getoptions = 'http://localhost:8085/api/getOptions';
  test=' http://localhost:8085/getAllGstCode'
  constructor(
    private httpclient: HttpClient
  ) { }

  getAllProductSkus(id: number): Observable<any> {

    return this.httpclient.get<any>(environment.getAllProductskusIdURL + id)
  }
  getProductSkuByID(id: number): Observable<any> {
    return this.httpclient.get<any>(environment.getproductSkuById + id)
  }

  upDateProductSkuById(id: any, productSku: ProductSku) {
    return this.httpclient.put(environment.updateProductSku + id, productSku)
  }

  deleteImgByImgId(productSkuImageId: number) {
    return this.httpclient.delete<any>(environment.deleteImgByImgId + productSkuImageId)
  }
  getAllOptions() {    
    return this.httpclient.get(`${this.getoptions}`)
  }

  // addOptionsValues(productSkuOptions:any){
  //   // const httpOptions = {
  //   //   headers :new HttpHeaders({
  //   //     'Content-Type':'application/json',
  //   //     'Accept':'application/json',
  //   //     'responseType':'text,application/json',              
  //   //     'Access-Control-Allow-Origin':'http://localhost:8085',
  //   //     'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
  //   //     'Access-Control-Allow-Headers':'Content-Type,application/json',
  //   //     'Authorization':'my-auth-token' 
  //   //   })
  //   // };
  //   return this.httpclient.post<any>(environment.addOptionsValues,productSkuOptions)
  // }
  addNewOption(SkuOptions: any) {
    return this.httpclient.post<any>(environment.addNewOption, SkuOptions)

  }

  upDateGstCode(id:any,productskudetails:ProductSkudetails){
      const httpOptions = {
     headers :new HttpHeaders({
      'Content-Type':'application/json',
      'Accept':'application/json',
       'responseType':'text,application/json',              
     'Access-Control-Allow-Origin':'http://localhost:8085',
      'Access-Control-Allow-Methods':"DELETE, POST, GET, OPTIONS",
    'Access-Control-Allow-Headers':'Content-Type,application/json',
      'Authorization':'my-auth-token' 
    })
   };
    return this.httpclient.put<ProductSkudetails>(environment.updateProductSku + id,productskudetails,httpOptions)
  }


  getAllGstCodes(){
    return this .httpclient.get<any>(`${this.test}`)
  }

  getAllOrders(){
    return this.httpclient.get<any>(environment.getAllOrders);
  }

  getOrderItemDetails(orderId:OrderDetails){
 return this.httpclient.get<any>(environment.getOrderItemDetails +orderId)
  }


  getOrderStatusHistoryByOrderId(orderId:any){
    return this.httpclient.get<any>(environment.Orderstatushistory +orderId)
  }

  updateOrderStatus(orderstatus:OrderDetails) {
    return this.httpclient.post(environment.updateOrderStatus,orderstatus)
  }


  // downloadInvoiceByOrderId(orderId:any){
  //   return this.httpclient.get<any>(environment.downloadinvoice + orderId);
  // }


  downloadInvoice(orderId:any) {
    console.log("orderId is.(in service) ",orderId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text,application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8085',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'


      })
    };
    console.log("downloadInvoiceUrl is. ",environment.downloadinvoice+orderId);
    //return this._http.get<any>(environment.downloadInvoiceUrl+ orderId);
    return this.httpclient.get(environment.downloadinvoice+orderId,{responseType: 'blob'});
  }

  getBlobFile(orderId:number) {
    
    console.log("downloadInvoiceUrl is. ",environment.downloadinvoice+orderId);
    return this.httpclient.get(environment.downloadinvoice+orderId,{responseType: 'blob'});
    }
  
}
