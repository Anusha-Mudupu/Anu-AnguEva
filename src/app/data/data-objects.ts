import { Observable } from "rxjs";

export interface Product {
    productId: number;
    productSkuId:number;
    productName: string;
    manufacturerName: string;
    productDesc: string;
    manufacturerId: number;
    storeId: number;
    search_tag: string
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
imageUrl: string;
price:number;
skuDescription:string;
status:string;
count:number;
discount:number;
productId:number;
productSkuCd:string;
listPrice:number;
barCode:number;
}