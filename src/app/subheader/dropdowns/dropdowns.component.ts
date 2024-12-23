/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DropdownsService } from './dropdowns.service';
import { Child, NavigationList, DropdownSvcParams } from '../../data/hero';
import { DropdownNotifyService } from 'src/app/sharedServices/dropdown-notify.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductTileComponent } from 'src/app/Product/product-list/product-tile/product-tile.component';
@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.css']
})
export class DropdownsComponent implements OnInit {
  // @ViewChild(ProductTileComponent) homeComponent: ProductTileComponent;
  NavigationList: NavigationList[] = [];
  isPanelCollapsed = true;
  keys: String[];
  v1: boolean;
  headerLinks: any;
  isHovering = false;
  private dropdownsService;
  ChildList: Child[] = [];
  private startLevel = 1;
  private endLevel = 3;
  private storeId = 1;
  private parentCatalogId = 0;
  private _subscription: Subscription;
  public categoryIdselected;
  loadcontent: boolean;
  loading: boolean = true;
  isMobileView: boolean = false;
  isSidebarOpen: boolean = false;

  isTabletView: boolean = false;


  constructor(private router: Router,
    private _dropdownsService: DropdownsService,
    private _dropdownNotifyService: DropdownNotifyService,
    private translate: TranslateService,
    private renderer: Renderer2, private el: ElementRef) {


  }

  showIconBar = true;

  ngOnInit() {

    this.detectViewport();
    window.addEventListener('resize', () => {
      this.detectViewport();
    });

    this.getdatafromsrv();

  }

  showData = false;


  cancelData() {
    this.showData = false;
  }


  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
  getdatafromsrv() {
    const inputParams = new DropdownSvcParams();
    inputParams.startLevel = this.startLevel;
    inputParams.endLevel = this.endLevel;
    inputParams.storeId = this.storeId;
    inputParams.parentCatalogId = this.parentCatalogId;

    console.log(inputParams);
    this._dropdownsService.getnaviagtionmenu(inputParams).subscribe(
      data => {
        this.NavigationList = <NavigationList[]>data;
        // setTimeout(() => {
        //   this.loading = false
        // }, 200);


      },
      error => console.error(error)
    );

  }


  // catalogNameSelected(catalogId: string) {

  //   this.categoryIdselected = catalogId;
  //   console.log(this.categoryIdselected);
  //   this._dropdownNotifyService.notifyOther(this.categoryIdselected);
  //    this.router.navigate(['/main/header/subheader/products'], { queryParams: { catalogId: catalogId } });
  //    window.scrollTo({
  //     top: 9000,
  //     behavior: 'smooth'
  //   });
  // }
  // toggleSidebar() {
  //   const sidebar = document.getElementById('sidebar');
  //   sidebar.classList.toggle('active');
  //   this.showIconBar = !this.showIconBar;
  //   console.log('toggle clicked');
  // }
  // toggleSidebar() {
  //   const sidebar = document.getElementById('sidebar');
  //   const toggleButton = document.querySelector('.navbar-toggle');

  //   if (sidebar) {
  //     sidebar.classList.toggle('active');
  //     this.showIconBar = !this.showIconBar;

  //     if (sidebar.classList.contains('active')) {
  //       sidebar.style.height = '100vh';
  //       toggleButton.setAttribute('aria-expanded', 'true');
  //     } else {
  //       sidebar.style.height = '100vh';
  //       toggleButton.setAttribute('aria-expanded', 'false');
  //     }
  //   }

  //   console.log('toggle clicked');
  // }

  // catalogNameSelected(catalogId: string) {
  //   this.categoryIdselected = catalogId;
  //   console.log(this.categoryIdselected);
  //   this._dropdownNotifyService.notifyOther(this.categoryIdselected);

  //   // Navigate to the new route
  //   this.router.navigate(['/main/header/subheader/products'], { queryParams: { catalogId: catalogId } }).then(() => {

  //     setTimeout(() => {
  //       window.scrollTo({
  //         top: 850,
  //         behavior: 'smooth'
  //       });
  //     }, 50);
  //   });
  // }
  // subChildCatalogNmSelected(catalogId) {
  //   this.closeSidebar();
  //   this.categoryIdselected = catalogId;
  //   // this.homeComponent.updateVariables(catalogId);
  //   this._dropdownNotifyService.notifyOther(this.categoryIdselected);
  //   // this.isPanelCollapsed = true;
  //   this.router.navigate(['/main/header/subheader/products'], { queryParams: { catalogId: catalogId } }).then(() => {

  //     setTimeout(() => {
  //       window.scrollTo({
  //         top: 850,
  //         behavior: 'smooth'
  //       });
  //     }, 50);

  //   });

  // }

  // childCatalogNmSelected(catalogId) {
  //   this.closeSidebar();

  //   this.categoryIdselected = catalogId;
  //   this._dropdownNotifyService.notifyOther(this.categoryIdselected);

  //   this.router.navigate(['/main/header/subheader/products'], { queryParams: { catalogId: catalogId } }).then(() => {

  //     setTimeout(() => {
  //       window.scrollTo({
  //         top: 850,
  //         behavior: 'smooth'
  //       });
  //     }, 50);

  //   });

  // }
  // closeSidebar() {
  //   const sidebar = document.getElementById('sidebar');
  //   sidebar.classList.remove('active');
  //   this.showIconBar = true;
  // }













  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
  dropdown













  catalogNameSelected(catalogId: any): void {

    if (this.isMobileView || this.isTabletView) {

      // Check if dropdown is already open for this item
      const clickedItem = document.getElementById(catalogId);
      console.log('raji', clickedItem)
      if (clickedItem?.classList.toggle('dropdown-open')) {
        // Proceed to navigation if dropdown is already open
        this.navigateToCatalog(catalogId);
      } else {
        // Open dropdown and wait for user's decision
        this.toggleDropdown(null, catalogId);
      }
    } else {
      // Direct navigation for desktop view
      this.navigateToCatalog(catalogId);
    }
  }

  navigateToCatalog(catalogId: any): void {
    this.categoryIdselected = catalogId;
    this.router.navigate(['/main/header/subheader/products'], {
      queryParams: { catalogId },
    }).then(() => {
      this.closeSidebar();
      setTimeout(() => {
        window.scrollTo({
          top: 850,
          behavior: 'smooth',
        });
      }, 50);
    });
  }

  detectViewport(): void {
    const width = window.innerWidth;
    this.isMobileView = width <= 767; // Mobile view
    this.isTabletView = width > 767 && width <= 1024; // Tablet view
  }
  toggleDropdown(event: Event | null, itemId: string): void {
    if (event) event.preventDefault();

    // Close all other dropdowns
    const items = document.querySelectorAll('.navbar-nav > li');
    items.forEach((item) => {
      if (item.id !== itemId) {
        item.classList.remove('dropdown-open');
      }
    });

    // Toggle the current dropdown
    const clickedItem = document.getElementById(itemId);
    clickedItem?.classList.toggle('dropdown-open');

  }

  childCatalogNmSelected(catalogId: string): void {
    this.closeSidebar(); // Ensure sidebar closes
    this.navigateToCatalog(catalogId); // Navigate to the product page
  }

  subChildCatalogNmSelected(catalogId: string): void {
    this.closeSidebar(); // Ensure sidebar closes
    this.navigateToCatalog(catalogId); // Navigate to the product page
  }


}