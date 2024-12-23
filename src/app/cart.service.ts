/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'order';

  constructor() { }
  getCartItems(): any[] {
    const cartItemsJson = localStorage.getItem(this.storageKey);
    console.log("cartItemsJson",cartItemsJson)
    return JSON.parse(cartItemsJson) || [];
  }

  addToCart(item: any): void {
    const cartItems = this.getCartItems();
    cartItems.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }
}
