/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child, NavigationList, DropdownSvcParams } from '../../data/hero';
@Injectable({
  providedIn: 'root'
})
export class DropdownsService {
  private _dropdownSvcParams: DropdownSvcParams;
  constructor(private _http: HttpClient) { }


  getnaviagtionmenu(inputParams: DropdownSvcParams) {
    console.log(inputParams);
    this._dropdownSvcParams = inputParams;

    const httpBody = {
      'startLevel': this._dropdownSvcParams.startLevel,
      'endLevel': this._dropdownSvcParams.endLevel,
      'storeId': this._dropdownSvcParams.storeId,
      'parentCatalogId': this._dropdownSvcParams.parentCatalogId

    };
    console.log(httpBody);

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
        'Access-Control-Allow-Headers': 'Content-Type,application/json',
        'Authorization': 'my-auth-token'

      })
    };
    console.log("service call");
    console.log("result is", this._http.post<any>(environment.navigation_url, httpBody, httpOptions).pipe());
    return this._http.post<NavigationList[]>(environment.navigation_url, httpBody, httpOptions).pipe();

  }

}

