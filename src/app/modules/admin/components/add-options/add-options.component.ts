import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Options, ProductSkuOptions } from 'src/app/data/data-objects';
import { ProductSkuDetailComponent } from 'src/app/product-sku-detail/product-sku-detail.component';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { option } from 'src/app/data/productskudetail';
 


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

     constructor( private fb: FormBuilder,private http:HttpClient,private route:Router,private activateroute:ActivatedRoute,private productSkudataservice:ProductSkuDataService,private dialogRef: MatDialogRef<AddOptionsComponent>) { }
  


  ngOnInit(): void {
    // this.fetchOptionsData();

this.Gstcodeform=new FormGroup({
  id:new FormControl(),
  prductSkuId:new FormControl(),
  gstCode:new FormControl(),
  totalGst:new FormControl()
});
this.Gsttypeform=new FormGroup({
  gstType:new FormControl(),
  // percentage:new FormControl(),
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

//    fetchOptionsData() {
//   this.http.get<any>('http://localhost:8085/api/getOptions').subscribe(
//     (response:any) => {
//       this.options = response;
//     },
//     error => {
//       console.error('Failed to fetch options data:', error);
//     }
//   );
// }

// onOptionNameSelected(event: any) {
//   this.selectedOptionName = event.target.value;
//   this.selectedName =this.selectedOptionName
//   this.selectedOptionValues = this.getFilteredOptionValues(this.selectedName);
// }

// getFilteredOptionValues(selectedName: any): string[] {
//   const selectedOption = this.options.find((option:any) => option.optionName=== selectedName);
//   return selectedOption ? selectedOption.optionValue : [];
// }




}
