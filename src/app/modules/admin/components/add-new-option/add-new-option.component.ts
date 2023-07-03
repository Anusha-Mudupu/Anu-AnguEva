import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';

@Component({
  selector: 'app-add-new-option',
  templateUrl: './add-new-option.component.html',
  styleUrls: ['./add-new-option.component.scss']
})
export class AddNewOptionComponent implements OnInit {
  AddnewOptionform:FormGroup;
  constructor( private fb: FormBuilder,private http:HttpClient,private productskudataservice:ProductSkuDataService,private router:Router) { }

  ngOnInit(): void {
   this.AddnewOptionform=new FormGroup({
    optionName:new FormControl(''),
    optionValue:new FormControl('')
    })
  }

  addNewOption(){
   this.productskudataservice.addNewOption(this.AddnewOptionform.value).subscribe((res:any)=>{
    console.log(res);
    alert('Successfully Added NewOption');
   })
    
  
   
  }


  // cancel(){
  //   this.router.navigate(['/admin/product-view/:productId/:productSkuId'])
  // }
}
       
   