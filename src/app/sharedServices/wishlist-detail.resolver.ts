import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WishListService } from './wish-list.service';
@Injectable({
  providedIn: 'root'
})
export class WishlistDetailResolver implements Resolve<any> {
  constructor(private wishlistService: WishListService, private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}
