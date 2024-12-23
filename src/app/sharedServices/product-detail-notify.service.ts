import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ProductDetailNotifyService {


  private notify = new Subject<any>();
  public notifyObservable = this.notify.asObservable();
  constructor() { }

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
}
