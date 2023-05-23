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
    searchTag: string
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
