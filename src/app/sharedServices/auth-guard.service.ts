/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable, Input } from '@angular/core';
import { GetOrderInfoServiceService } from 'src/app/sharedServices/get-order-info-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/sharedServices/order.service';
import { OrderItem, Order, FilterCriteria, FilterCriteriaObj, Product, LoginDetails } from '../../app/data/hero';
import { ProductListService } from 'src/app/Product/product-list/productListService';
import { LoginService } from './login.service';
import { LoginComponent } from '../subheader/login/login.component';
import { UserdetailsService } from './userdetails.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  orderId;
  private orderInfoData;
  private ResponseObj;
  private id;
  private catalog_id = 0;
  private filterEnabled = "sajana";
  private orderItem;
  public orderitems = [];
  private ProductsList: Product[];
  public currentproductdetails: Product[];
  public itemsaddedcount = 0;
  public cartList = [];
  private cartLength: number;
  private userId: any;


  constructor(private route: ActivatedRoute, private productListService: ProductListService, private getOrderInfoService: GetOrderInfoServiceService, private router: Router, private orderService: OrderService,
    private _loginService: LoginService, private _loginComponent: LoginComponent, private _userdetails: UserdetailsService, private _appservice: AppService) { }
  setData(responseVariable) {
    console.log(responseVariable);
    this.ResponseObj = responseVariable;

  }
  getData() {
    return this.ResponseObj;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log('this is localStorage.getItem(userDetails)', localStorage.getItem('userDetails'));
    console.log('this is localStorage.getItem(userId) in canActivate(.,.)', localStorage.getItem('userId'));
    this.userId = parseInt(localStorage.getItem('userId'));

    if (this.userId !== null) {
      console.log('value in userId is. ', typeof (this.userId));
      this._userdetails.getUserDetails(this.userId).subscribe(data => {
        this._appservice.userdetails = data;
        console.log('firstName is. ', this._appservice.userdetails.firstName);
      });
    }
    return true;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log("this is AuthGuardService's canActivateChild(). ");
    return true;
  }
  canLoad(
    route: Route,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

}
