import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Options, ProductSku, ProductSkuOptions } from '../data/data-objects';

@Injectable({
  providedIn: 'root'
})
export class ProductSkuDataService {
  id: any;
  selectedFile: any;

  test = 'http://localhost:8085/api/getOptions'
  constructor(
    private httpclient: HttpClient
  ) { }

  getAllProductSkus(id: number): Observable<ProductSku[]> {

    return this.httpclient.get<ProductSku[]>(environment.getAllProductskusIdURL + id)
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
    return this.httpclient.get(`${this.test}`)
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


}
