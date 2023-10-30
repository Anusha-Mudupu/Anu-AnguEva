import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-management',
  templateUrl: './purchase-management.component.html',
  styleUrls: ['./purchase-management.component.scss']
})
export class PurchaseManagementComponent implements OnInit {
  loading1: boolean=true;
  loading = false;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loading1=false
    },1000);
  }

}
