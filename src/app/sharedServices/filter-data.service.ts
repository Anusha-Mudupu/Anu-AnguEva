/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FilterDataService {

  constructor() { }
  pricerangeDataShare = new Subject<any>(); //Decalring new RxJs Subject 
  shareDataSubject = new Subject<any>(); //Decalring new RxJs Subject
  avgRatingData = new Subject<any>();
  priceRangeDataSend(data) {
    this.pricerangeDataShare.next(data);
  }
  sendDataToOtherComponent2(data) {
    console.log("manufacturers in service:",data)
    this.shareDataSubject.next(data);
  }
  sendAvgRating(data) {
    console.log("avg rating", data)
    this.avgRatingData.next(data)
  }
}
