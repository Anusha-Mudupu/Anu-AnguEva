import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from 'src/app/data/data-objects';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { VerifyPaymentComponent } from '../verify-payment/verify-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { StartFillingActionComponent } from '../start-filling-action/start-filling-action.component';
import { FinishFillingActionComponent } from '../finish-filling-action/finish-filling-action.component';
import { CheckQuantityActionComponent } from '../check-quantity-action/check-quantity-action.component';
import { QCDoneActionComponent } from '../qc-done-action/qc-done-action.component';
import { StartPackingActionComponent } from '../start-packing-action/start-packing-action.component';
import { DonePackingActionComponent } from '../done-packing-action/done-packing-action.component';
import { StartShippingActionComponent } from '../start-shipping-action/start-shipping-action.component';
import { FinishShippingActionComponent } from '../finish-shipping-action/finish-shipping-action.component';


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
    orderstatus:OrderDetails
    DynamicComponents:any
   currentStatus:any;
   Orders:any;
   CurrentOrder:any;
   index: any = 0
  raji:boolean=false
   showDynamicComponent:boolean=false

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
      this.Orders=this.allOrders;
     console.log(this.Orders)
      console.log(this.allOrders);
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

  openDialog(action:any,orderId:any){
     if(action === 'verifypayment'){
      const dialogRef =this.dailog.open( VerifyPaymentComponent,{
        data: { orderId:orderId}
      }).afterClosed().subscribe(result=>{
        console.log('Verify Order Modal Component Closed');
        this.ngOnInit();})
      }
      else 
      if(action === 'start-filling'){
        const dialogRef =this.dailog.open( StartFillingActionComponent,{
          
          data: { orderId:orderId}
        }).afterClosed().subscribe(result=>{
         
          this.ngOnInit();})
        }
        else 
      if(action === 'finish-filling'){
        const dialogRef =this.dailog.open( FinishFillingActionComponent,{
          
          data: { orderId:orderId}
        }).afterClosed().subscribe(result=>{this.ngOnInit();})
        }
   
        else 
      if(action === 'check-quality'){
        const dialogRef =this.dailog.open( CheckQuantityActionComponent,{
          
          data: { orderId:orderId}
        }).afterClosed().subscribe(result=>{this.ngOnInit();})
        }
        else 
      if(action === 'QC-Success'){
        const dialogRef =this.dailog.open( QCDoneActionComponent,{
          
          data: { orderId:orderId}
        }).afterClosed().subscribe(result=>{this.ngOnInit();})
        }
        else 
      if(action === 'start-packing'){
        const dialogRef =this.dailog.open( StartPackingActionComponent,{
          
          data: { orderId:orderId}
        }).afterClosed().subscribe(result=>{this.ngOnInit();})
        }
   
        else 
      if(action === 'done-packing'){
        const dialogRef =this.dailog.open( DonePackingActionComponent,{
          
          data: { orderId:orderId}
        }).afterClosed().subscribe(result=>{this.ngOnInit();})
        }
        else 
      if(action === 'start-shipping'){
        const dialogRef =this.dailog.open( StartShippingActionComponent,{
          
          data: { orderId:orderId}
        }).afterClosed().subscribe(result=>{this.ngOnInit();})
        }
        else 
      if(action === 'finish-shipping'){
        const dialogRef =this.dailog.open( FinishShippingActionComponent,{
          
          data: { orderId:orderId}
        }).afterClosed().subscribe(result=>{this.ngOnInit();})
        }
   

  
  
   //  this.router.navigate(['/admin/verify-payment',orderId])
  }

  // dynamicComponentLoading(component:any,ij:any){
  //   if(component==='verifyPayment'){
  //  this.DynamicComponents=VerifyPaymentComponent ;
  //   this.showDynamicComponent=true; 
  //   this.CurrentOrder = this.Orders[ij];
  //   console.log("current order is ",this.CurrentOrder, " i value is ",ij)
  //   }
  //   else
  //   if(component==='start-filling'){
  //    this.DynamicComponents=StartFillingActionComponent  
  //      this.raji=true; 
  //     const dialogRef =this.dailog.open( this.DynamicComponents,{
          
      
  //     }).afterClosed().subscribe(result=>{
  //       console.log('Verify Order Modal Component Closed');
  //       this.ngOnInit();})
  //     this.CurrentOrder = this.Orders[ij];
  //     console.log("current order is ",this.CurrentOrder, " i value is ",ij)
  //    }
  // }


  
}




