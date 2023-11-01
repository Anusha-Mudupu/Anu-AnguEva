/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */


export interface Product {
  productId: number;
  productName: string;
  manufacturerName: string;
  productDesc: string;
  manufacturerId: number;
  storeId: number;
  searchTag: string;
  Catalogdetails: Catalog[];
  productOption: option[]
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
  price: number;
  skuDescription: string;
  status: any;
  count: number;
  discount: number;
  productId: number;
  productSkuCd: string;
  listPrice: number;
  barCode: string;
  selfLocCd: string;
  gstId: number;
  gstCode: string;
  igst: number;
  option: option[];

}

export interface option {
  optionName: string,
  optionValue: string,
  optionId: number,
  productSkuOptionsId: number;
}
// export interface ProductSkuOptions{
//   optionTypeName:string;
//   optionTypeId:number;
//  optionTypeFor:string
//   theOption:theOption[];
// }
// export interface theOption{
//   optionId: number;
//   optionTypeId: number;
//   optionValue: string;
//   productSkuId:number
// }


// export interface Options{

//     optionId: number;
//     optionName: string;
//     optionValue: string;
//     productSkuOptions:productSkuOptions[]
// }

// export interface productSkuOptions{
//   optionId: number,
//   productSkuId: number,
//   productSkuOptionsId: number
// }

export interface OrderDetails {
  orderId: number,
  customerName: string,
  orderModDtTm: number,
  orderSubmitDtTm: number,
  status: string,
  imageUrl: string,
  totalAmount: number,
  userId: number,
  igst: number,
  couponApplied: boolean,
  pgRazorpayOrderId: string,
  pgRazorpayPaymentId: string,
  mobileNumber: number,
  lastUpdate: number,
  statusCd: string,
  lastUpdateDtTm: number,
  emailId: string
  staffCd: number;
  estimatedTime: number
  orderItemdetails: orderItems[]
}

export interface orderItems {
  orderItemId: number,
  discountApplied: number,
  giftWrapped: string,
  productName: string,
  status: string,
  price: number,
  mrpPrice: number,
  orderId: number,
  productId: number,
  productSku: number,
  quantity: number,
  totalPrice: number,
  finalPrice: number,
  igstAmt: number,
  igstPct: number,
  imageUrl: string

}

export interface OrderStatus {
  orderId: number;
  orderstatus: orderStatus[]


}
export interface orderStatus {
  id: number,
  lastUpdateDtTm: string,
  staffCd: number,
  staffName: string,
  statusCd: string
}


export interface Catalog {
  catalogId: number,
  primaryFlg: string,
  productCatalogId: Number,


}


export interface AddNewCatalog {

  catalogId: number,
  parentCatalogId: number,
  // catalogLevel: number,
  catalogName: string,
  catalogDesc: string,
  storeId: number
}

export interface Staffdetails {
  opStaffId: number,
  staffCd: number,
  staffName: string,
  mobileNo: number,
  emailId: string,
  state: string,
  area: string,
  city: string,
  pincode: number,
  startDt: number,
  endDt: number,
  dob: number,
  staffRole: staffRole[];
}
export interface staffRole {
  opStaffId: number,
  roleId: number,
  staffRoleId: number,
  roleName: string
}

export interface parentCatalogData {
  catalogId: number,
  parent: string,
  catalogName: string
}

export interface StaffRoles {
  roleId: number,
  staffRole: string
}


export interface purchaseData {
  poBillingAddress: string,
  poCommentsTxt: string,
  poCreateDt: number,
  poCreatedBy: string,
  poCurrency: string,
  poDiscountAmount: number,
  poId: number,
  poLastUpdateBy: string,
  poLastUpdateDt: number,
  poPaymentTerms: string,
  poShippingAddress: string,
  poShippingEstimatedAmt: number,
  poStatus: string,
  poStoreId: number,
  poTotalAmount: number,
  supplierId: number
  purchaseOrderDtl: purchaseOrderDtl[]
}

export interface purchaseOrderDtl {
  amount: number,
  discountPerPkg: number,
  perPkgQty: number,
  pkgCount: number,
  poDtlId: number,
  poId: number,
  pricePerPkg: number,
  productSkuId: number,
  qualityFailedCount: number,
  receivedCount: number
}
