/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DarkModeService } from './dark-mode.service';
import { OrderService } from './sharedServices/order.service';
import { LocationServiceService } from './location-service.service';



// declare const gtag: Function;
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isThemeDark: Observable<boolean>;
 title = 'pcjJewellers';
  isDarkMode = false;
  themeControl: UntypedFormControl;
  
  refreshService: any;
  location: { latitude: number; longitude: number } | null = null;
  cityName: string | null = null;
  error: string | null = null;
  constructor(public router: Router, private translateService: TranslateService,
    private darkModeService: DarkModeService,
    private _orderService: OrderService,
    
   ) {
   
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     gtag('config', 'G-3M2P3DV09Y', { 'page_path': event.urlAfterRedirects });
    //   }
    // })


  }
  ngOnInit(): void {
    gtag('config', 'G-9EETE0V4WX', { 'anonymize_ip': true });
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     console.log('Tracking page view:', event.urlAfterRedirects);
    //     gtag('config', 'G-3M2P3DV09Y', { 'page_path': event.urlAfterRedirects });
    //   }
    // });


    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     // Get the current URL path
    //     const page_path = event.urlAfterRedirects;

    //     // Log to the console (for debugging purposes)
    //     console.log(`Tracking page view: ${page_path}`);

    //     // Send page view to Google Analytics
    //     gtag('config', 'G-3M2P3DV09Y', {
    //       'page_path': page_path
    //     });
    //   }
    // });

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     gtag('config', 'GTM-TNL4VHKD', {
    //       'page_path': event.urlAfterRedirects  // Sends the route path to Google Analytics
    //     });
    //     console.log(`Tracking page view: ${event.urlAfterRedirects}`);  // Logs each page view for debugging
    //   }
    // });
    }

    

}
  

