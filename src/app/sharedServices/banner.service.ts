import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Banner } from '../data/hero';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  banner: Banner;
  constructor(private http: HttpClient) { }

  getBanner(): Observable<Banner[]> {
    console.log("before service");
    return this.http.get<Banner[]>(environment.bannerUrl).pipe();
  }

}
