import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../data/hero';
declare var message: any;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private currentCartCount = new BehaviorSubject(0);
  currentMessage = this.currentCartCount.asObservable();
  public Userdetails: User;
  constructor() {
  }
  updateCartCount(count: number) {
    this.currentCartCount.next(count);
    console.log(this.currentCartCount.next(count));
  }
  abc() {
    this.Userdetails.emailId = sessionStorage.getItem('loggedUser');
    this.Userdetails.password = localStorage.getItem('userpassword');
    console.log("data", this.Userdetails);
    return this.Userdetails;
  }
}
