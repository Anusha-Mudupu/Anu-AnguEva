/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */

import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DropdownNotifyService {

  private notify = new Subject<any>();
  public notifyObservable = this.notify.asObservable();
  constructor(){}
  public notifyOther(data: any) {
  if (data) {
  this.notify.next(data);
  }
  }
  
}
