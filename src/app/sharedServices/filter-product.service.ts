import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { productCatalog } from 'src/app/data/hero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterProductService {

  constructor(private _http: HttpClient) { }
  getFilterProductList(categoryId): Observable<any[]> {
    console.log(categoryId);
    return this._http.get<productCatalog[]>(environment.getFilterProductListUrl + categoryId);
  }
}
