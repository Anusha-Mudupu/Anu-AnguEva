/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
// import { ThemePalette } from '@angular/material';
import { AppService } from 'src/app/sharedServices/app.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {
  loading: boolean=true;

  constructor(private appService: AppService,public themeService:ThemeService) { }

  ngOnInit() {
    this.appService.setShowBanner(false);
    this.appService.setShowDeals(false);
    this.appService.setShowMenuIcons(false);
    setTimeout(()=>{
      this.loading=false
    },700);
  }

}
