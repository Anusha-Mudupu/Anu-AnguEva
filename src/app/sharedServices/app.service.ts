/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { LoginDetails, User, OrderItem, Order, UserDetails, WishList, WishListSku } from 'src/app/data/hero';
import { CartComponent } from '../subheader/cart/cart.component';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public userdetails: LoginDetails | undefined;
  public orderdetails: Order;
  public orderItems: OrderItem;
  public cartObject: CartComponent;
  public cartLength: number;
  public wishlistDetails: WishList[];
  public wishlistSkuDetails: WishListSku[];
  public productStatus: string;
  public favourites: number[];
  showBanner: boolean = true;
  showDeals: boolean = true;
  showMenuIcons: boolean = true;
  showDropdowns: boolean = true;
  public addOrRemoveWishListClassName: boolean;

  userDetails$ = new Subject<LoginDetails>();
  userDetails = this.userDetails$.asObservable();
  orderDetails$ = new Subject<OrderItem>();
  orderDetails = this.orderDetails$.asObservable();
  constructor() {
    console.log(this.userdetails);
    if (sessionStorage) {
      this.userdetails = this.userdetails;
    }
    this.userdetails = new LoginDetails();
    this.userDetails$.subscribe(user => {
      this.userdetails = user;
    });
  }

  userNameChange(newValue) {
    this.userDetails$.next(newValue);
  }
  setUser() {

  }
  getUser() {
    return this.userdetails;
  }
  OrderDetailChange(data) {
    this.orderDetails$.next(data);
  }
  setCartObject(a: CartComponent) {
    this.cartObject = a;
  }
  getCartObject() {
    return this.cartObject;
  }
  setOrderDetail(orderDetailObj: any) {
    this.orderdetails = orderDetailObj;
  }
  getOrderDetail() {
    return this.orderdetails;
  }
  setCartLength(length: number) {
    this.cartLength = length;
  }
  getCartLength() {
    return this.cartLength;
  }
  setProductStatus(status: string) {
    this.productStatus = status;
  }
  getProductStatus() {
    return this.productStatus;
  }

  //banner
  isShowBanner() {
    return this.showBanner;
  }
  setShowBanner(banner: boolean) {
    this.showBanner = banner;
  }
  isDropdowns() {
    return this.showDropdowns
  }
  setDropdowns(downs: boolean) {
    this.showDropdowns = downs
  }

  //deals
  isShowDeals() {
    return this.showDeals;
  }
  setShowDeals(deals: boolean) {
    this.showDeals = deals;
  }
  //menuIcons
  isShowMenuIcons() {
    return this.showMenuIcons;
  }
  setShowMenuIcons(menuIcons: boolean) {
    this.showMenuIcons = menuIcons;
  }
  setAddOrRemoveWishListClassName(addOrRemoveWishListClassName: boolean) {
    this.addOrRemoveWishListClassName = addOrRemoveWishListClassName;
  }
  isAddOrRemoveWishListClassName() {
    return this.addOrRemoveWishListClassName;
  }
}
