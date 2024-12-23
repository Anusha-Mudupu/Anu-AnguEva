/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';
import { ChatService } from '../chat.service'
import { AppService } from 'src/app/sharedServices/app.service';
import { InvoiceService } from 'src/app/sharedServices/invoice.service';
import { environment } from 'src/environments/environment';
import { event } from 'jquery';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
interface Message {
  text: string;
  type: 'bot' | 'user';
  imageUrl: any;
  status: any;
}

interface Option {
  label: string;
  action: string;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  selectedOption: Option | null = null;
  // messages: Message[] = [];
  value: string;
  timestamp: Date;
  display: boolean;
  chatStarted = false;
  dialogInfo: any;
  showOptions = false;
  orderDetailsShown = false;
  messages: Message[] = [];
  currentOptions: Option[] = [];
  orderDetails: any;
  options: string[] = [
    'Order Shipping Information',
    'Order Tracking Information',
    'Order Change Policy',
    'Return and Refund Policy',
    'Payment Options',
    'Subscription Cancellation',
    'Return and Exchange Policy'
  ];

  order = {
    imageUrl: 'path_to_order_image.jpg',
    productName: 'Your Product Name',
    status: 'delivered' // or 'canceled'
  };
  userId: any;
  orderDisplayed = false;
  imageBaseUrl: string;
  private messagesSet: Set<string> = new Set();
  isMinimized = false;
  private selectedOptions: Set<string> = new Set(); // Add this line
  recentOrder: any;
  constructor(public chatService: ChatService,
    public themeService: ThemeService,
    private _appService: AppService,
    private _invoiceService: InvoiceService,
    private cdRef: ChangeDetectorRef,
    private router: Router,private dialog: MatDialog) {
     
  }

  ngOnInit() {

    this.userId = this._appService.getUser().userId;
    this.imageBaseUrl = environment.imagesBaseUrl;
    // this.chatService.conversation.subscribe((val) => {
    //   this.messages = this.messages.concat(val);
    // });
    var userdetails: any;
    var firstName: string;
    userdetails = this._appService.getUser();
    if (userdetails !== undefined) {
      firstName = userdetails.firstName;

    }
    else {
      firstName = undefined;
    }
    if (userdetails === undefined || firstName === undefined) {

      this.showInitialOptions();
    }

    if (firstName !== undefined) {
      
      this.startChat();
      // this. minimizeChat();
    }
    

  }
  closeChat() {
    this.dialog.closeAll(); // Closes the dialog window
  }
  startChat() {
    this._invoiceService.custOrderDetails(this.userId).subscribe(
      (data) => {
        this.orderDetails = data;
        console.log("this.orderDetails", this.orderDetails);
  
        if (this.orderDetails && this.orderDetails.length > 0) {
          this.recentOrder = this.orderDetails.reduce((latest, current) => {
            return new Date(latest.orderdDate) > new Date(current.orderdDate) ? latest : current;
          });
          console.log("Most recent order:", this.recentOrder);
          this.showInitialOptions();
        } else {
          console.log("No orders found");
          // Display the message and option for trending products;
          this.showInitialOptions();
          this.messages.push({
            text: "Now, you don't have any orders. Would you like to see the trending products?",
            type: 'bot',
            imageUrl: undefined,
            status: undefined
          });
  
          this.showOptions = true;
          this.currentOptions = [
            { label: 'Trending Products', action: 'trendingProducts' },
            // { label: 'Start Again', action: 'startAgain' }
          ];
        }
      },
      (error) => {
        console.error("Error fetching order details:", error);
        // Handle error appropriately
      }
      
    );
    
  }
  
  showInitialOptions() {
    this.messages.push({
      text: `Hi! It's Evadella's messaging assistant again. What can I help you with?`,
      type: 'bot',
      imageUrl: undefined,
      status: undefined
    });

    this.showOptions = true;
    this.currentOptions = [
      { label: `check My Order Details`, action: 'confirmOrder' },
      { label: `check My Order Tracking`, action: 'trackingOrder' },
      { label: `Cancel My Order`, action: 'cancelOrder' },
      { label: `Check Shipping Adress`, action: 'shippingAddress' },
      { label: `Frequently Asked questions`, action: 'faq' },

      // { label: 'No, something else', action: 'somethingElse' }
    ];
  }

  handleOptionClick(option: Option) {
    var userdetails: any;
    var firstName: string;
    userdetails = this._appService.getUser();
    firstName = userdetails.firstName;
    console.log("firstName",firstName)
    if (userdetails !== undefined) {
      firstName = userdetails.firstName;
    } else {
      firstName = undefined;
    }
  
    if (firstName === undefined ||firstName===null) {
      // User is not signed in
      if (option.action !== 'signIn') {
        this.messages.push({
          text: 'You need to sign in before you can ask any questions..',
          type: 'bot',
          imageUrl: undefined,
          status: undefined
        });
  
        this.showOptions = true;
        this.currentOptions = [
          { label: 'Sign In', action: 'signIn' },
          { label: 'Start Again', action: 'startAgain' }
        ];
        return; // Exit the method to prevent further execution
      } else {
        this.router.navigate(['/main/header/subheader/login']);
      }
    } else {
      // User is signed in
      this.selectedOption = option;
      this.messages.push({
        text: option.label,
        type: 'user',
        imageUrl: undefined,
        status: undefined
      });
  
      this.showOptions = false;
      this.cdRef.detectChanges();
  
      switch (option.action) {
        case 'seeMoreOrders':
          this.router.navigate(['/main/header/subheader/customerOrders']);
          this.startAgain();
          break;
          case 'trendingProducts':
            this.router.navigate(['/main/header/subheader/products'])
            setTimeout(() => {
              window.scrollTo({
                top: 450,
                behavior: 'smooth'
              });
            }, 50);;
            this.startAgain();
            break;
        case 'trackingOrders':
          if (this.recentOrder) {
            this.router.navigate(['/main/header/subheader/orderTracking/', this.recentOrder.orderId]);
          } else {
            this.messages.push({
              text: 'No recent orders found.',
              type: 'bot',
              imageUrl: undefined,
              status: undefined
            });
          }
          this.startAgain();
          break;
  
        case 'cancelOrders':
          if (this.recentOrder) {
            this.router.navigate(['/main/header/subheader/cancelOrder/', this.recentOrder.orderId]);
          } else {
            this.messages.push({
              text: 'No recent orders found.',
              type: 'bot',
              imageUrl: undefined,
              status: undefined
            });
          }
          this.startAgain();
          break;
  
        case 'shippingAddresses':
          this.router.navigate(['/main/header/subheader/shippingAddress']);
          this.startAgain();
          break;
  
        case 'seeFaq':
          this.router.navigate(['/main/header/subheader/faq']);
          this.startAgain();
          break;
  
        case 'confirmOrder':
          this.showOrderDetails(this.recentOrder);
          break;
  
        case 'trackingOrder':
          this.showTrackingOrderDetails(this.recentOrder);
          break;
  
        case 'cancelOrder':
          this.showCancelOrder(this.recentOrder);
          break;
  
        case 'faq':
          this.showFaq();
          break;
  
        case 'shippingAddress':
          this.showShippingAddress(this.recentOrder);
          break;
  
        case 'somethingElse':
          this.handleSomethingElse();
          break;
  
        case 'startAgain':
          this.startAgain();
          break;
  
        default:
          this.messages.push({
            text: 'Sorry, I didn\'t understand that option.',
            type: 'bot',
            imageUrl: undefined,
            status: undefined
          });
      }
  
      console.log("messages", this.messages);
    }
  }
  

  showFaq() {
    this.messages.push({
      text: `Here are some Frequently Asked Questions (FAQs): click FAQ option`,
      type: 'bot',
      imageUrl: undefined,
      status: undefined
    });

    // You can add more FAQ content here if needed.
    this.showOptions = true;
    this.currentOptions = [
      { label: 'FAQ', action: 'seeFaq' },
      { label: 'Start Again', action: 'startAgain' }
    ];
  }
  showShippingAddress(recentOrder) {
    if (recentOrder) {
    this.messages.push({
      text: `If you want to see your Shipping Address, click Shipping Address`,
      type: 'bot',
      imageUrl: undefined,
      status: undefined
    })
  }
    else {
      this.messages.push({
        text: 'No recent orders found.',
        type: 'bot',
        imageUrl: undefined,
        status: undefined
      });
    }
if (this.orderDetails && this.orderDetails.length >= 1) {
      this.currentOptions = [
        { label: 'Shipping Address', action: 'shippingAddresses' },
        { label: 'Start Again', action: 'startAgain' }
      ];
    } else {
      this.currentOptions = [
        { label: 'Start Again', action: 'startAgain' }
      ];
    }
    this.showOptions = true;

    
  }
  showCancelOrder(recentOrder) {
    if (recentOrder) {
      this.messages.push({
        text: `If you want to Cancel your order , click Cancel Orders.`,
        type: 'bot',
        imageUrl: undefined,
        status: undefined
      });

      
      
    } else {
      this.messages.push({
        text: 'No recent orders found.',
        type: 'bot',
        imageUrl: undefined,
        status: undefined
      });
    }
    if (this.orderDetails && this.orderDetails.length >= 1) {
      this.currentOptions = [
        { label: 'Cancel Orders', action: 'cancelOrders' },
        { label: 'Start Again', action: 'startAgain' }
      ];
    } else {
      this.currentOptions = [
        { label: 'Start Again', action: 'startAgain' }
      ];
    }
    this.showOptions = true;
  }
  showTrackingOrderDetails(recentOrder) {
    if (recentOrder) {
      this.messages.push({
        text: `If you want to see your order tracking details, click See Tracking Orders option.`,
        type: 'bot',
        imageUrl: undefined,
        status: undefined
      });

     
      this.currentOptions = [
        { label: 'See Tracking Orders', action: 'trackingOrders' },
        { label: 'Start Again', action: 'startAgain' }
      ];
    } else {
      this.messages.push({
        text: 'No recent orders found.',
        type: 'bot',
        imageUrl: undefined,
        status: undefined
      });
    }

    if (this.orderDetails && this.orderDetails.length >= 1) {
      this.currentOptions = [
        { label: 'See Tracking Orders', action: 'trackingOrders' },
        { label: 'Start Again', action: 'startAgain' }
      ];
    } else {
      this.currentOptions = [
        { label: 'Start Again', action: 'startAgain' }
      ];
    }
    this.showOptions = true;
  }
  showOrderDetails(recentOrder) {
    if (recentOrder) {
      const orderStatus = recentOrder.statusCd;

      const orderItem = recentOrder.orderItems[0];
      console.log("orderDate",orderItem.orderdDate)
      this.messages.push({
        text: orderItem.productdescription,
        type: 'bot',
        imageUrl: orderItem.imageUrl,
        status: orderStatus
      });

      if (orderStatus === 'CANCELLED') {
        const cancellationDate =this.recentOrder.orderdDate;
        this.messages.push({
          text: `Your item got cancelled on ${cancellationDate}.`,
          type: 'bot',
          imageUrl: undefined,
          status: undefined
        });
      } else if (orderStatus === 'PAID') {
        const paymentDate = this.recentOrder.orderdDate;
        this.messages.push({
          text: `Your item was paid on ${paymentDate}.
          `,
          type: 'bot',
          imageUrl: undefined,
          status: undefined
        });
      }

      if (this.orderDetails.length > 1) {
        this.messages.push({
          text: `This is your "Most Recent Order". If you want to see more orders, click See More Orders.`,
          type: 'bot',
          imageUrl: undefined,
          status: undefined
        });
      }

      this.showOptions = true;
      this.currentOptions = [
        { label: 'Start Again', action: 'startAgain' }
      ];
    } else {
      this.messages.push({
        text: 'No recent orders found.',
        type: 'bot',
        imageUrl: undefined,
        status: undefined
      });
    }
    
    if (this.orderDetails && this.orderDetails.length > 1) {
      this.currentOptions = [
        { label: 'See More Orders', action: 'seeMoreOrders' },
        { label: 'Start Again', action: 'startAgain' }
      ];
    } else {
      this.currentOptions = [
        { label: 'Start Again', action: 'startAgain' }
      ];
    }
  
    this.showOptions = true;
  }



  handleSomethingElse() {
    this.messages.push({
      text: 'Please tell me what you need help with.',
      type: 'bot',
      imageUrl: undefined,
      status: undefined
    });
    console.log("messages", this.messages);
  }

  startAgain() {
    this.messages = []; // Clear all messages
    this.showInitialOptions(); // Restart by showing the initial options
  }
   minimizeChat() {
    this.isMinimized = !this.isMinimized;   
  }
}

