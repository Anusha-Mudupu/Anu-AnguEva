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
  productSkuId: number,
  productId: number,
  productSkuCode: string,
  count: number,
  status: string
}