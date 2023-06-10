import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Options, OrderDetails, ProductSku, ProductSkuOptions } from '../data/data-objects';
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

  getOrderItemDetails(orderId:any){
 return this.httpclient.get<any>(environment.getOrderItemDetails +orderId)
  }

  updateOrderStatusByOrderId(orderId: any, OrderDetails:OrderDetails) {
    return this.httpclient.put(environment.updateOrderStatusByOrderId + orderId, OrderDetails)
  }
}
