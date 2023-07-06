import { Observable } from "rxjs";
export interface Product1{
  productId: number;
  productName: string;
  productDesc: string;
  manufacturerId: number
  search_tag: string
}
export interface Product {
    productId: number;
   productName: string;
    manufacturerName: string;
    productDesc: string;
    manufacturerId: number;
    storeId: number;
    searchTag: string;
    Catalogdetails:Catalog[]
  }

export interface Vendor {
  manufacturerId: number;
  manufacturerName: string;
}

export interface SearchTag {
  name: string;
}

export interface ProductSku {
  productSkuId: number;
  productSkuImage: any;
price:number;
skuDescription:string;
status:any;
count:number;
discount:number;
productId:number;
productSkuCd:string;
listPrice:number;
barCode:string;
selfLocCd:string
}

export interface ProductSkuOptions{
  optionTypeName:string;
  optionTypeId:number;
 optionTypeFor:string
  theOption:theOption[];
}
export interface theOption{
  optionId: number;
  optionTypeId: number;
  optionValue: string;
  productSkuId:number
}
 

export interface Options{
  
    optionId: number;
    optionName: string;
    optionValue: string;
    productSkuOptions:productSkuOptions[]

}

export interface productSkuOptions{
  optionId: number,
  productSkuId: number,
  productSkuOptionsId: number
}

export interface OrderDetails{
  orderId: number,
  customerId: string,
  orderModDtTm:number,
  orderSubmitDtTm: number,
  status: string,
  imageUrl:string,
  totalAmount: number,
  userId: number,
  igst: number,
  couponApplied: boolean,
  pgRazorpayOrderId:string,
  pgRazorpayPaymentId:string,
  mobileNumber: number,
  lastUpdate: number,
  statusCd:string,
  lastUpdateDtTm:number,
  emailId:string
  staffCd:number;
  orderItemdetails:orderItems[]
}

export interface orderItems{
  orderItemId: number,
  discountApplied: number,
  giftWrapped: string,
  productName:string,
  status: string,
  price: number,
  mrpPrice: number,
  orderId: number,
  productId: number,
  productSku:number,
  quantity: number,
  totalPrice: number,
  finalPrice: number,
  igstAmt: number,
  igstPct: number,
  imageUrl: string

}

export interface OrderStatus{
  orderId: number;
  orderstatus:orderStatus[]
 

  }
  export interface orderStatus{
    id:number,
    lastUpdateDtTm: string,
    staffCd: number,
    staffName: string,
    statusCd: string
  }

  
   export interface Catalog{
   catalogId: number,
   primaryFlg:string,
   productCatalogId:Number,
  
    
   }
   

export interface AddNewCatalog{
  
  catalogId: number,
  parentCatalogId: number,
  catalogLevel: number,
  catalogName: string,
  catalogDesc: string,
  storeId: number
}

export interface Staffdata{
  opStaffId: number,
    staffCd: number,
    staffName:string,
    mobileNo: number,
    emailId: string,
    state: string,
    area: string,
    city: string,
    pincode: number,
    startDt:number,
    endDt: number,
    dob: number
}



