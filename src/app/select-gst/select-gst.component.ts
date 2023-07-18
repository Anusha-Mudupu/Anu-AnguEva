import { Component, OnInit } from '@angular/core';
import { ProductSkuDataService } from '../services/productsku-data.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-select-gst',
  templateUrl: './select-gst.component.html',
  styleUrls: ['./select-gst.component.scss']
})
export class SelectGstComponent implements OnInit {
  Gstcode: any
  id: any
  dialog: any;
  gstForm: FormGroup;
  gstid: any
  selectedGstCode: any
  productskudetails: any
  constructor(private productskudataservice: ProductSkuDataService, private router: Router, private activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.productskudataservice.getAllGstCodes().subscribe((data: any) => {
      this.Gstcode = data
      console.log(data);

    });

    this.id = this.activate.snapshot.paramMap.get('productSkuId')
    this.productskudataservice.getProductSkuByID(this.id).subscribe((data: any) => {
      this.productskudetails = data;
      console.log(data);
      console.log(this.id)
    })
    this.gstForm = new FormGroup({
     gstId: new FormControl(''),
     
    })

  }


  saveUpdateGst() {
    this.productskudataservice.upDateGstCode(this.id, this.productskudetails).subscribe((data: any) => {
      console.log(data)

      console.log(this.gstForm.value)
    })

  }

  onSelectedGstCode(event: any) {
    this.selectedGstCode = event.target.value;

    console.log(this.selectedGstCode)

  }

  onSubmit() {
    this.saveUpdateGst()
    alert('successfully Updated')
    this.router.navigate(['/admin/product-view/:productId/:productSkuId', this.productskudetails])
  }
  cancel() {
    this.router.navigate(['/admin/product-view/:productId/:productSkuId', this.productskudetails])
  }


}


