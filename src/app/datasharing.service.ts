/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {
  private totalAmountSource = new BehaviorSubject<number>(0);
  totalAmount = this.totalAmountSource.asObservable();

  setTotalAmount(amount: number) {
    this.totalAmountSource.next(amount);
  }
  constructor() { }
}
