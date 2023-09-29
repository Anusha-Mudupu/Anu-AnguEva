/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  OrderDetails, ProductSku, option} from '../data/data-objects';
import { ProductSkudetails } from '../data/productskudetail';

@Injectable({
  providedIn: 'root'
})
export class ProductSkuDataService {
  id: any;
  selectedFile: any;

  // getoptions = 'http://localhost:8085/api/getOptions';
  test=' http://localhost:8085/getAllGstCode'
  erroMessagge: any;
  constructor(
    private httpclient: HttpClient
  ) { }

  getAllProductSkus(id: number): Observable<any> {
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

    return this.httpclient.get<any>(environment.getAllProductskusIdURL + id,httpOptions)
  }
  getProductSkuByID(id: number): Observable<any> {
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
    return this.httpclient.get<ProductSku>(environment.getproductSkuById + id,httpOptions)
  }

  upDateProductSkuById(id: any, productSku: ProductSku) {
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
    return this.httpclient.put(environment.updateProductSku + id, productSku,httpOptions)
  }

  deleteImgByImgId(productSkuImageId: number) {
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
    return this.httpclient.delete<any>(environment.deleteImgByImgId + productSkuImageId,httpOptions)
  }
  // getAllOptions() {    
  //   return this.httpclient.get(`${this.getoptions}`)
  // }

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
    return this.httpclient.post<any>(environment.addNewOption, SkuOptions,httpOptions)

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
    return this .httpclient.get<any>(`${this.test}`,httpOptions)
  }

  getAllOrders(){
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
    return this.httpclient.get<any>(environment.getAllOrders,httpOptions);
  }

  getOrderItemDetails(orderId:OrderDetails){
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
 return this.httpclient.get<any>(environment.getOrderItemDetails +orderId,httpOptions)
  }


  getOrderStatusHistoryByOrderId(orderId:any){
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
    return this.httpclient.get<any>(environment.Orderstatushistory +orderId,httpOptions)
  }

  updateOrderStatus(orderstatus:OrderDetails) {
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
    return this.httpclient.post(environment.updateOrderStatus,orderstatus,httpOptions); 

  }

  getAllOptions(productId:any){
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
   return this.httpclient.get<any>(environment.getOptionValuesByProductId +productId,httpOptions);
  }

 
 
 
 


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
