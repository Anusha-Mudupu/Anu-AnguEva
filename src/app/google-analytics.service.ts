/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Injectable } from '@angular/core';
declare var gtag: Function; // Make sure to declare gtag
@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  sendPageView(pagePath: string): void {
    gtag('config', 'G-3M2P3DV09Y', {
      'page_path': pagePath
    });
  }
  constructor() { }
}
