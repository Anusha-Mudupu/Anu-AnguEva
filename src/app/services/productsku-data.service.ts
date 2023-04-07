import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductSku } from '../data/data-objects';

@Injectable({
  providedIn: 'root'
})
export class ProductSkuDataService {

  constructor(
    private httpclient: HttpClient
  ) { }

  getAllProductSkus(id: number): Observable<ProductSku[]>{

    return this.httpclient.get<ProductSku[]>(environment.getProductSkuByIdURL + id)
  }
  getProductSkuByID(id:number): Observable<any>{
    return this.httpclient.get<any>(environment.getproductSkuById + id)
}

  upDateProductSkuById(id:any,productSku:ProductSku){
return this.httpclient.put(environment.updateProductSku + id,productSku)
   }

  
}
