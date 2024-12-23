/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { MenuiconsService } from '../sharedServices/menuicons.service';
import { DropdownNotifyService } from 'src/app/sharedServices/dropdown-notify.service'
import { MenuIconsDetails } from '../data/hero';
import { environment } from 'src/environments/environment';
import { ThemeService } from '../theme.service';
@Component({
  selector: 'app-menu-icons',
  templateUrl: './menu-icons.component.html',
  styleUrls: ['./menu-icons.component.css']
})
export class MenuIconsComponent implements OnInit {
  public image: string;
  public menuIconsRes: MenuIconsDetails[] = [];
  public categoryIdselected;
  public catalogId;
  isDarkTheme = false;
  loading: boolean = true;
  colorValue: string = "#000000";
  constructor(private menuService: MenuiconsService,
    private _dropdownNotifyService: DropdownNotifyService,
    public themeService: ThemeService
  ) { }

  ngOnInit() {
    this.menuService.getMenuIcons().subscribe(data => {
      this.menuIconsRes = data;
      setTimeout(() => {
        this.loading = false
      }, 500);
      console.log("Icons data is. ", this.menuIconsRes);

    }, error => { console.log(error); }
    )
    this.image = environment.imagesBaseUrl;
  }
  getMenuIconDetails(catalogId: number) {
    window.scrollTo({
      top: 900,
      behavior: 'smooth'
    });
    this.catalogId = catalogId

    this.categoryIdselected = catalogId;
    this._dropdownNotifyService.notifyOther(this.categoryIdselected);
  }
}


