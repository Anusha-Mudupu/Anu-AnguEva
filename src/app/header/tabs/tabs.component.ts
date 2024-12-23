import { Component, OnInit } from '@angular/core';
import {NgModule} from '@angular/core';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  headerLinks:any=[];
  constructor() { }

  ngOnInit() {
this.getHeaderLinks();


  }
getHeaderLinks(){
  this.headerLinks=[
    {  label: 'Corporate Gifting', link: '/CorporateGifting' },
    {  label: 'GiftCards', link: 'GiftCards' },
    {  label: 'JflPayments', link: 'JflPayments' },
    {  label: 'StoreLocator', link: 'StoreLocator' },
    
    {  label: 'Corporate', link: 'Corporate ' },
    {  label: 'Investors', link: 'Investors' }
    
  ];
}
}
