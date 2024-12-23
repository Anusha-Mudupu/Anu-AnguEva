import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { LoginDetails, Order, OrderItem, User } from '../data/hero';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { LoginComponent } from '../subheader/login/login.component';
import { OrderService } from './order.service';
import { GetOrderInfoServiceService } from './get-order-info-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsResolverService implements Resolve<any> {
  private order: Order[] | undefined;
  private orderItemObj: any[] | undefined;
  private viewOrder: any;
  private cartItemCount: number;
  private user: LoginDetails;
  public userdetails = {
    emailId: '',
    password: ''
  };
  private userds: User;
  private userdetail: LoginDetails;
  private orderId: number;
  constructor(private loginService: LoginService, private _http: HttpClient,
    private appService: AppService, private loginComponent: LoginComponent, private orderService: OrderService, private getOrderInfoService: GetOrderInfoServiceService) {
    console.log("this is constructor of LoginDetailsResolverService.");
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("this is resolve.");

    this.userdetails.emailId = localStorage.getItem('useremail');
    this.userdetails.password = localStorage.getItem('userpassword');

    console.log("firstName in resolver. ", localStorage.getItem('firstName'));
    console.log("this is localStorage.getItem(firstName) (in login resolver). ", localStorage.getItem("firstName"));
    let firstName = localStorage.getItem('firstName');
    console.log("firstName in localStorage. ", !(firstName === null));


    return this._http.post<LoginDetails>(environment.getUserUrl, this.userdetails).pipe();
  }
}
