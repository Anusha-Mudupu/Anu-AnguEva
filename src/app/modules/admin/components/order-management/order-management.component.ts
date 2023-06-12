import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from 'src/app/data/data-objects';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { VerifyPaymentComponent } from '../verify-payment/verify-payment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  allOrders:any
   orderId:any
  filteredData:any;
   selectedstatus:any;
    raji:any
 
   currentStatus:any;
 displayedColumns = ['orderId','userId','lastUpdate','mobileNumber','orderSubmitDtTm','status','totalAmount','Actions'];
  dataSource = new MatTableDataSource<OrderDetails>();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private productskudataservice:ProductSkuDataService,private router:Router,private dailog:MatDialog,private cdr:ChangeDetectorRef,private activated:ActivatedRoute) {
 
   }
  
  ngOnInit(): void {
   this.getOrders();
   this.dataSource.sort = this.sort;

}

 

 getOrders(){
    this.productskudataservice.getAllOrders().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.allOrders=data;
      console.log(data);
      // this.currentStatus = this.allOrders.find((x:any) =>x.status == this.allOrders[0].status);
   //   console.log(this.currentStatus.status);
     
      this.dataSource.sort = this.sort;
      // this.cdr.detectChanges();
     
   
  
      //  for(let i=0;i<=this.allOrders.length;i++){
      //    this.currentStatus=this.allOrders[i].status;
      //      this.currentStatus = this.allOrders.find((x:any) =>x.status == this.allOrders[i].status);
      //    console.log("a",this.currentStatus)
      //    if( this.currentStatus.status =='OPEN'){
      //          this.raji='NO-ACTION';
      //          console.log("b",this.raji)
      //        }
      //        else
      //        if( this.currentStatus.status =='SUBMITTED'){
      //         this.raji='verify Payment';
      //         console.log("b",this.raji)
      //        }
      //        else
      //           if( this.currentStatus.status =='filling in progress'){
      //            this.raji='Start filling';
      //            console.log("b",this.raji)
      //           }
      //           this.cdr.detectChanges();
      //  }



   })
   
    
  }


 applyFilter(event: any) {
    let filterValue = event.target.value; // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  viewOrderItemDetails(orderId:any){
this.router.navigate(['/admin/order-item-details',orderId])
  }

  openDialog(orderId:any){
   
    const dialogRef =this.dailog.open(VerifyPaymentComponent,{
      data: { orderId:orderId}
    })
   //  .afterClosed().subscribe(result=>{this.ngOnInit()});
   //  this.router.navigate(['/admin/verify-payment',orderId])
  }




  
}




