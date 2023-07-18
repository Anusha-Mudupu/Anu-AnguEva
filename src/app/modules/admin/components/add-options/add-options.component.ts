import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductSkuDataService } from 'src/app/services/productsku-data.service';


 


@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.scss']
})



export class AddOptionsComponent implements OnInit {
  myForm:any;
  Gstcodeform:any;
  Gsttypeform:any
  toppings = new FormControl();

   OptionsData:any;

   options:any
   selectedOptionName: any
   selectedOptionValues: any
 
  option:any
  selectedName: any;
  fruits: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  selectedFruits: string[] = [];

     constructor( private fb: FormBuilder,private http:HttpClient,private route:Router,private activateroute:ActivatedRoute,private productSkudataservice:ProductSkuDataService,private dialogRef: MatDialogRef<AddOptionsComponent>) { }
  


  ngOnInit(): void {
 

this.Gstcodeform=new FormGroup({
  id:new FormControl(),
  prductSkuId:new FormControl(),
  gstCode:new FormControl(),
  totalGst:new FormControl()
});
this.Gsttypeform=new FormGroup({
  gstType:new FormControl(),

  prductSkuId:new FormControl(),
  gstDec:new FormControl(),
  gstPercentage:new FormControl()
  
})

 
}
;

onSubmit(){
   this.http.post<any>('http://localhost:8085/createGSTCode',this.Gstcodeform.value).subscribe((data:any)=>{
    console.log(data)
  });
   this.http.post<any>('http://localhost:8085/createGST',this.Gsttypeform.value).subscribe((res:any)=>{
    console.log(res)
   })
}







}
