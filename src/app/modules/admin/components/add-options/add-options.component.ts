import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSkuOptions } from 'src/app/data/data-objects';
import { ProductSkuDataService } from 'src/app/services/productsku-data.service';

@Component({
  selector: 'app-add-options',
  templateUrl: './add-options.component.html',
  styleUrls: ['./add-options.component.scss']
})
export class AddOptionsComponent implements OnInit {
  myForm:any;
  myForm1:any
  id:any;
  OptionsData:any
  raji:any
  r1:any;

  constructor( private fb: FormBuilder,private http:HttpClient,private route:Router,private activateroute:ActivatedRoute,private productSkudataservice:ProductSkuDataService) { }

  ngOnInit(): void {
    this.id=this.activateroute.snapshot.paramMap.get('productSkuId')
   this.productSkudataservice.getProductSkuByID(this.id).subscribe((data:any)=>{
    this.OptionsData=data[0];
    console.log(this.OptionsData)
   });
  
    
    this.myForm=this.fb.group({
     
      optionTypeId:'',
      optionValue:'',
      productSkuId:'',
      optionId:'',
      fields:this.fb.array([])
    })
   this.myForm1=this.fb.group({

    optionTypeName:'',
    optionTypeFor:''
   })
  //   this.myForm = this.fb.group({
  //     optionTypeName: '',
  //     // optionTypeId: '',
  //     optionTypeFor:'',
  //     OptionValues: this.fb.array([
  //       this.createAddress()
  //     ])
  //   });
  // }

  // createAddress(): FormGroup {
  //   return this.fb.group({
  //     optionValue: '',
  //     productSkuId: '',
  //      optionTypeId: '',
     
  //   });
  // }

  // addOptionValues() {
  //   const OptionValues1 = this.myForm.get('OptionValues') as FormArray;
  //   OptionValues1.push(this.createAddress());
  // }
  

  // onSubmit() {
  //   console.log(this.myForm.value);
  
  // this.productSkudataservice.addOptions(this.myForm.value).subscribe(data=>{
  //   console.log(data);
  // })
 
  // }
  }

  SubmitOption(){
this.productSkudataservice.addOptions(this.myForm1.value).subscribe(data=>{
  this.r1=data;
  console.log(this.r1);
})

  }

  onSubmit(){
 this.productSkudataservice.addOptionsValues(this.myForm.value).subscribe(res=>{
console.log(res);
},message=>{  alert('successfully added')
}
 )
  }

 addOptions(){
  const fields = this.myForm.get('fields') as FormArray;
  fields.push(new FormControl(''));
 }


//  get(){
//   this.productSkudataservice.getOptionTypeId(this.r1).subscribe((data:any)=>{
//     this.raji=data;
//     console.log(this.raji);
     
//    })
//  }

}
