/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public themeService:ThemeService) { }

  ngOnInit() {
  }

}
