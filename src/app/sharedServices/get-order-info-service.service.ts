/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetOrderInfoServiceService {
  public localStorageMap: any;
  constructor() {
    console.log("this is constructor of GetOrderInfoService. ");
    this.localStorageMap = new Map<string, any>();

  }
  set(key: string, value: any) {
    console.log("value", value)
    this.localStorageMap.set(key, value);

  }

  get(key: string): any {
    console.log("key", key)
    console.log("this is get(.) of GetOrderInfoService. ");
    return this.localStorageMap.get(key);
  }

  check(key: string): boolean {
    return this.localStorageMap.has(key);
  }
  clearOrderInfo() {
   
    this.localStorageMap.delete('order'); 
  }
}
