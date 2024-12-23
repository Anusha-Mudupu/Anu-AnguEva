/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticsService } from './google-analytics.service'; // Make sure this service is set up
@Injectable({
  providedIn: 'root'
})
export class RouteTrackingService {
  constructor(private router: Router, private gaService: GoogleAnalyticsService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.gaService.sendPageView(event.urlAfterRedirects);
      }
    });
  }
}
