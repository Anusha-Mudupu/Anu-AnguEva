/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from 'events';
import { Product, OrderItem, IAlert, ProductIndex, User, Order, WishList, Skus } from '../../app/data/hero';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesService } from 'src/app/sharedServices/messages.service';
import { OrderService } from 'src/app/sharedServices/order.service';
import { Observable, Subscription } from 'rxjs';
import { ElasticsearchService } from '../sharedServices/elastic-serch.service';
import { SearchComponent } from './search/search.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GetOrderInfoServiceService } from '../sharedServices/get-order-info-service.service';
// import * as $ from 'jQuery';
import { ChatComponent } from '../customer-bot/chat/chat.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DataServiceService } from '../sharedServices/data-service.service';
import { AppService } from '../sharedServices/app.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoginDetails } from 'src/app/data/hero';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { WishListService } from '../sharedServices/wish-list.service';
import { SocialAuthService } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../theme.service';
import { UntypedFormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RefreshService } from '../refresh.service';
import { SharedServiceService } from '../shared-service.service';
import { LocationServiceService } from '../location-service.service';

interface groups {
  code: string;
  group_name: string;
}
interface themes {
  code: any;
  name: any;
}
@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {

  public alerts: Array<IAlert> = [];
  @Input() cartItemCount: number;
  loginLinks = [];
  vieworderlink = [];
  public customerorders = "vieworders";
  public length: any;
  private subscription: Subscription;
  private static readonly INDEX = 'products';
  private static readonly TYPE = '_doc';
  productindex: ProductIndex;
  productsku: Product;
  private queryText = '';
  private searchlink;
  private lastKeypress = 0;
  public listFilter: string = "";
  public resultSearch: ProductIndex;
  public customerName = '';
  public returnedData = {
    emailId: '',
    password: ''
  };
  private isUserLoggedin: Object;
  private url: any;
  private userDetails: LoginDetails;
  private viewOrder: Order[];
  private wishlistDetails: WishList;
  productSkus: Skus;
  temp_user_Name: string;
  imgUrl: any;
  orderId = 683;
  cartUserId: any;
  imagesBaseUrl: string;
  userId: number;
  groups: groups[] = [
    { code: 'en', group_name: 'English' },
    { code: 'te', group_name: 'తెలుగు' },
    { code: 'hi', group_name: 'हिन्दी' },

  ];
  themes: themes[] = [

    { code: 'wm', name: 'white mode ' },
    { code: 'dm', name: 'dark mode ' },

  ]
  // Added by raji
  public isDark: boolean;

  darkModeFlag: any;
  selectedLanguage: any;
  isThemeDark: Observable<boolean>;
  themeControl: UntypedFormControl;
  selectedTheme: any;
  loading: boolean = true;
  locationJs: any;
  // location: any;
  cityName: string | null = null;
  error: string | null = null;
  location: { latitude: number; longitude: number } | null = null;
  @Input() refreshSubheader: boolean = false;
  selectedItem: string = '';

  activeDropdownItem: string | null = null;
  constructor(private dialog: MatDialog, private appser: MessagesService, private router: Router, private dataService: DataServiceService, private getuserservice: GetOrderInfoServiceService, private orderService: OrderService, private modalService: NgbModal, private messageService: MessagesService, private es: ElasticsearchService, private socialAuthService: SocialAuthService,
    public appService: AppService, private getOrderInfoService: GetOrderInfoServiceService, private actRoute: ActivatedRoute, private _wishlistService: WishListService,
    private _appService: AppService, private _orderService: OrderService,
    private translate: TranslateService,
    public themeService: ThemeService,
    private cookieService: CookieService,
    private refreshService: RefreshService,
    private sharedService: SharedServiceService,
    private locationService: LocationServiceService

  ) {
    this.getLoginLinks();
    this.userDetails = appService.getUser();

    translate.setDefaultLang('en');
    //  below line added by raji
    this.isDark = themeService.isDark;
  }

  ngOnInit() {
    this.handleGetLocation();
    this.loadStoredLocation();
    this.sharedService.refreshSubheader$.subscribe((refresh) => {
      if (refresh) {
        // Refresh the subheader as needed
        this.refreshSubheader = true;
      }
    });
    //  below line added by raji
    this.isDark = this.themeService.isDark;


    // const darkTheme = localStorage.getItem('theme')

    // const storedTheme = localStorage.getItem('theme');
    // if (storedTheme && this.themes.some((th) => th.code === storedTheme)) {
    //   this.selectedTheme = storedTheme;
    // }
    // this.setThemeControlss(this.selectedTheme)

    // this.themeControl = new UntypedFormControl()
    // this.themeControl.valueChanges.subscribe(data => {
    //   if (data) {
    //     this.themeService.toggleDark()
    //   }
    //   else {
    //     this.themeService.toggleLight();
    //   }
    // })
    this.imagesBaseUrl = environment.imagesBaseUrl;

    this._appService.setDropdowns(true)
    this.appService.setShowBanner(true);
    this.appService.setShowDeals(true);
    this.appService.setShowMenuIcons(true);

    this.actRoute.data.subscribe(data => {


    });
    const storedLanguage = localStorage.getItem('selectedLanguage');
    this.translate.use(storedLanguage);
    if (storedLanguage && this.groups.some((language) => language.code === storedLanguage)) {
      this.selectedLanguage = storedLanguage;
    }

    if (this.appService.userdetails == undefined || this.appService.userdetails.firstName == undefined) {
      this.customerName = "";
      if (!this.temp_user_Name) {
        this.customerName = localStorage.getItem("firstName");
        // below 2 lines have written by shashikanth in 20-jan-2022.
        if (this.customerName === 'null' || this.customerName === 'Please sign in')
          this.customerName = "";

      }

    }
    else {
      this.customerName = this.appService.userdetails.firstName;

      //getting wishlistDetails.

      var userId = this.appService.getUser().userId;

      this._wishlistService.getWishlist(userId).subscribe(wishlistData => {
        this.appService.wishlistSkuDetails = wishlistData;

      })
      this._wishlistService.getFavourites(userId).subscribe(data => {
        this.appService.favourites = data;
      })
    }

    if (localStorage.getItem('firstName') == null || this.customerName == '')
      this.length = 0;

    else {
      this.length = 0;

      if (this.getOrderInfoService.check("order")) {


      }

      this.orderService.cartLengthChange.pipe(shareReplay(1)).subscribe(data => {

        this.length = data;
        console.log("value of this.length in (subheader.component.ts) ", this.length);
      });
    }




    $('.carousel[data-type="multi"] .item').each(function () {
      let next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (let i = 0; i < 3; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
      }
    });

    //Scroll to Top Logic
    var scrollToTopBtn = document.getElementById("scrollToTopBtn")
    var rootElement = document.documentElement

    function scrollToTop() {
      // Scroll to top logic
      rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
    scrollToTopBtn.addEventListener("click", scrollToTop)

  }

  changeLanguage(languageCode: string) {
    var userdetails: any;
    var firstName: string;
    userdetails = this._appService.getUser();


    this.translate.use(languageCode);
    this.selectedLanguage = languageCode;

    localStorage.setItem('selectedLanguage', languageCode);


  }
  // setThemeControlss(theme) {
  //   this.darkModeFlag = theme

  //   if (theme === "dm") {
  //     this.themeService.toggleDark();

  //   }
  //   if (theme === "wm") {
  //     this.themeService.toggleLight();

  //   }
  //   localStorage.setItem('theme', this.darkModeFlag);

  // }

  //  below method added by raji
  setThemeControlss(theme: string) {
    if (theme === 'dm') {
      this.themeService.toggleDark();
    } else if (theme === 'wm') {
      this.themeService.toggleLight();
    }
    this.isDark = this.themeService.isDark;
  }


  get cartchanged() {
    return this.orderService.cartLengthChange;
  }
  getproductDetails() {
    this.es.getProducts().subscribe(products => {
      this.productindex = products;
      console.log("productindex", this.productindex)
    },
      error => console.log(error)
    );

  }
  onClickChatIcon() {

    const dialogRef = this.dialog.open(ChatComponent, {
      width: '0px',
    });
    dialogRef.disableClose = true;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ChatComponent, dialogConfig);
  }
 
  //  onClickChatIcon() {
  //     const dialogConfig = new MatDialogConfig();

  //     dialogConfig.width = '400px';
  //     dialogConfig.height = '600px';
  //     dialogConfig.disableClose = true;
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.panelClass = 'custom-dialog-container';

  //     const dialogRef = this.dialog.open(ChatComponent, dialogConfig);

  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('Dialog was closed');
  //     });
  //   }

  getLoginLinks() {
    {

      this.loginLinks = [
      ];

      if (sessionStorage.getItem('loggedUser') == null) {



        this.vieworderlink = [
          { label: 'login', link: 'login' },

        ];

      } else {

        this.vieworderlink = [
          { label: sessionStorage.getItem('loggedUser'), link: 'login' },

        ];

      }

    }

  }
  getSerachLink() {
    this.searchlink = { label: 'search', link: 'search' };
  }


  // search($event) {
  //   if ($event.timeStamp - this.lastKeypress > 100) {
  //     this.queryText = $event.target.value;

  //     this.es.fullTextSearch(
  //       SubheaderComponent.INDEX,
  //       SubheaderComponent.TYPE,

  //       'product_sku_id', this.listFilter)
  //       .then(
  //         response => {
  //           console.log("response of elastic search is", response);
  //           console.log(response.hits.hits);
  //           if (response.hits.hits.length == 0) {


  //             this.router.navigate(['/main/header/subheader/search', this.listFilter]);
  //           }
  //           else {
  //             this.resultSearch = response.hits.hits.filter(x => x._source);
  //             console.log('this.resultSearch', this.resultSearch)



  //             this.router.navigate(['/main/header/subheader/search', this.resultSearch[0]._source.price]);
  //           }

  //         }
  //         , error => {
  //           console.error(error);
  //         }).then(() => {
  //           console.log('subheader.compenenet.ts Search Completed!');

  //         });

  //   }

  //   this.lastKeypress = $event.timeStamp;

  //   // added this below line by shashikanth
  // }


  // ...




  search($event) {
    if ($event.timeStamp - this.lastKeypress > 100) {
      const searchTerm = this.listFilter.trim();

      if (searchTerm.length > 0) {
        // Split the search term into individual words
        const searchTermsArray = searchTerm.split(/\s+/);

        // Create an array of wildcard terms for each word
        const wildcardSearchTerms = searchTermsArray.map((term) => `*${term}*`);

        // Join the wildcard terms with spaces to handle cases without spaces
        const wildcardSearchTerm = wildcardSearchTerms.join(' ');

        this.es.fullTextSearch(
          SubheaderComponent.INDEX,
          SubheaderComponent.TYPE,
          'product_sku_id',
          wildcardSearchTerm
        ).then(
          (response) => {
            console.log('Elasticsearch Query:', wildcardSearchTerm);
            console.log('Elasticsearch Response:', response);
            if (response.hits.hits.length === 0) {

              this.router.navigate(['/main/header/subheader/search', this.listFilter]);
              console.log('No results found for:', searchTerm);
            } else {
              this.resultSearch = response.hits.hits
                .filter((x) => x._source)
                .map((hit) => ({
                  searchTag: hit._source.searchTag,
                  encodedsearchTag: encodeURIComponent(hit._source.searchTag),
                }));

              console.log('Search results:', this.resultSearch);
              const encodedsearchTag = this.resultSearch[0].encodedsearchTag;
              this.router.navigate(['/main/header/subheader/search', encodedsearchTag]);
              console.log('encodedsearchTag', encodedsearchTag)
            }
          },
          (error) => {
            console.error('Error during search:', error);
          }
        );
      }

    }

    this.lastKeypress = $event.timeStamp;
  }




  logout() {
    this.selectedItem = 'LogOut';
    this.socialAuthService.signOut();

    localStorage.removeItem('useremailId');
    this.appService.userdetails.firstName = localStorage.getItem("firstName");
    localStorage.removeItem('firstName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('userpassword');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('useremail');

    this.length = 0;
    this.getOrderInfoService.set('order', undefined);
    this.appService.wishlistDetails = undefined;
    this.appService.favourites = undefined;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place

      }
    });
    //temparary variable userName to hold firstName;
    this.temp_user_Name = this.appService.userdetails.firstName;

    this.appService.userdetails = undefined;
    // this.router.navigate(['/main/header/subheader/login']);
    this.router.navigate(['/main/header/subheader/login']).then(() => {
      // Optionally reload the page to refresh all components
      window.location.reload();
    });

  }
  setActiveDropdownItem(item: string) {
    this.activeDropdownItem = item;
  }
  dropdownOpen = false;
  // toggleDropdown() {
  //   this.dropdownOpen = !this.dropdownOpen;
  // }
  navigateTocustomerOrders(item) {
    console.log("navigateTocustomerOrders", item)
    this.selectedItem = item;
    this.dropdownOpen = false;
    this.router.navigate(['/main/header/subheader/customerOrders']);
  }

  navigateToUserProfile(item) {
    console.log("navigateToUserProfile", item)
    this.selectedItem = item;
    this.dropdownOpen = false;
    this.router.navigate(['/main/header/subheader/userProfile']);
  }
  navigateToFaq(item) {
    console.log("navigateToFaq", item)
    this.selectedItem = item;
    this.dropdownOpen = false;
    this.router.navigate(['/main/header/subheader/faq']);
  }


  handleGetLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.location = { latitude, longitude };

          // Call OpenCage API to get city name
          this.locationService.getCityName(latitude, longitude).subscribe(
            (response) => {
              if (response && response.results && response.results.length > 0) {
                const components = response.results[0].components;
                const city =
                  components.city ||
                  components.town ||
                  components.village ||
                  components.state ||
                  'City not found';
                this.cityName = city;

                // Save location and city name to localStorage
                localStorage.setItem('location', JSON.stringify(this.location));
                localStorage.setItem('cityName', this.cityName);
              } else {
                this.cityName = 'City not found';
              }
            },
            (error) => {
              this.error = 'Unable to fetch city name';
              console.error('Error fetching city name', error);
            }
          );
        },
        (error) => {
          this.error = error.message;
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  loadStoredLocation(): void {
    const storedLocation = localStorage.getItem('location');
    const storedCityName = localStorage.getItem('cityName');

    if (storedLocation && storedCityName) {
      this.location = JSON.parse(storedLocation);
      this.cityName = storedCityName;
    }
  }



  toggleDropdown(event: Event): void {
    event.stopPropagation(); // Prevent the event from bubbling up
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Hides dropdown when clicking outside
  handleOutsideClick(event: Event): void {
    if (this.dropdownOpen) {
      this.dropdownOpen = false;
    }
  }
  goToFavorites() {
    var userdetails: any;
    var firstName: string;
    userdetails = this._appService.getUser();
    if (userdetails !== undefined) {
      firstName = userdetails.firstName;
      console.log('user detail', userdetails);
      console.log("firstName product-tile.component is. ", firstName);
    }
    else {
      firstName = undefined;
    }
    if (userdetails === undefined || firstName === undefined) {

      this.router.navigate(['/main/header/subheader/login']);
    }

    if (firstName !== undefined) {
      console.log('if(firstName!==undefined),name is. ', firstName);
      this.router.navigate(['/main/header/subheader/favorites']);
    }
  }
  updateCart(){
    var userdetails: any;
    var firstName: string;
    userdetails = this._appService.getUser();
    if (userdetails !== undefined) {
      firstName = userdetails.firstName;
      console.log('user detail', userdetails);
      console.log("firstName product-tile.component is. ", firstName);
    }
    else {
      firstName = undefined;
    }
    if (userdetails === undefined || firstName === undefined) {

      this.router.navigate(['/main/header/subheader/login']);
    }

    if (firstName !== undefined) {
      console.log('if(firstName!==undefined),name is. ', firstName);
      this.router.navigate(['/main/header/subheader/cart']);
    }
  }
}