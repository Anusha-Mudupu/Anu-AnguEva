/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
import { NumericOnlyDirective } from "../numeric-only.directive";

/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
export class Register {
  status: string;
  methodName: string;
  id: string;
}
export class MenuIconsDetails {
  catelogId: number;
  category: string;
  iconId: number;
  iconsName: string;
  imageUrl: string;
}
export class Mobileotp {
  expirytime: number;
  otp: any;
}
export class Otps {
  emailotp: number;
  mobileotp: number;
}
export class productCatalog {
  catalogId: number;
  catalogName: string;
  price: number;
  catalogDesc: string;
  size: string;
  imageUrl: string;
  brand: string;
  category: string;
}
export class NavigationList {
  catalogName: string;
  catalogId: number;
  catalogDesc: string;
  catalogLevel: number;
  parentCatalogId: number;
  childCatalog: any[];
  storeId: number;
}


export class Child {
  catalogName: string;
  catalogId: number;
  catalogDesc: string;
  catalogLevel: number;
  parentCatalogId: number;
  childCatelog: any[];
}
export class User {
  userId: any;
  emailId: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  gender: string;
  birthday: Date;
  maillistFlg:any;
}
export class FBUser {
  firstName: string;
  emailId: string;


  password: string;
  lastName: string;
  loginStatus: string;
  mobileNumber: number;
  userId: number;
}
export class FBCred {
  userId: any;
  emailId: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  gender: string;
  birthday: Date;
  maillistFlg:any;
}
export class GoogleUser {
  firstName: string;
  emailId: string;
}
export class GCred {
  userId: any;
  emailId: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  gender: string;
  birthday: Date;
  maillistFlg:any;
}
export class Response {
  response: string;
}
export class DropdownSvcParams {
  startLevel: number;
  endLevel: number;
  storeId: number;
  parentCatalogId: number;
}

export class Product {
  productId: number;
  productManufacturerName: string;
  brandName: string;
  productName: string;
  productSkus: Skus[];
 price:number;
 discount:number;
 discountedPrice:number;
 skuDescription:any;
 productSkuCd:string;




}

export class Skus {
  productSkuId: number;
  gstId: number;
  options: Options[];
  productSkus: Options;
  imageUrl: string;
  price: number;
  productSkuCd:string;
 discount:number;
  productSkuCode: string;
  avgCustomerRating: number;
  igst: number;
  cgst: number;
  sgst: number;
  skuDescription:any;

  productSkuImageUrls: any[];
}
export class Options {
  optionName: string;
  optionValue: string;
  //options:any[];
}
export class FilterCriteria {
  catalogId: number;
  filterEnabled: string;
}
export class FilterCriteriaObj {
  filterCriteria: FilterCriteria;
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
export class RefundOrderDetails {
  refundId: number;
  totalAmount: number;
  currency: String;
  pgRazorpayPaymentId: String;
  pgRazorpayOrderId: String;
  status: String;

  cancelOrderReason: String;
  orderId: number;

}



export class Order {
  customerName: string;
  orderItemObj: any[];

  totalAmount: number;
  shippingAddressId: number;
  id: number;
  shippingAddress: string;
  totalQuantity: number;
  status: string;
  userId: number;
  orderSubmitDtTm: Date;
  finalAmount:any;
  imageUrl: any;
  igstAmt: any;
  cgstAmt: any;
  sgstAmt: any
  productSkuCd:any;

}

export class OrderImage {
  imageUrl: string;
}
export class orderImage {
  productId: number
  imageUrl: any;
}



export class cartItems {
  productSkuId: number;

  "price": number;
  "skuDescription": string;
  "status": string;
  "count": number;
  "discount": number;
  "productId": number;
  "productSkuCd": any;
  "listPrice": number;
  "barCode": any;
  "quantity": number;
  "totalAmount": number;
  "images": any;
}


export class custViewOrder {

}
export class CouponInfo {
  couponCode: string;
  orderId: string;
}
export class CouponRes {
  couponStatus: string;
  reason: string;
  discountToApply: number;
  totalAmount: number;
  finalAmount: number;
  couponApplied: string;
}
export class OrderItem {
  order_id: number;
  productSku: string;
  mrpPrice: string;
  price: number;
  discountApplied: string;
  quantity: string;
  giftWrapped: string;
  productId: number;
  productName: string;
  productSkuCd:string;
  imageUrl: string;
  igstPct: number;
  cgstPct: number;
  sgstPct: number;
  igstAmt: number
  cgstAmt: number;
  sgstAmt: number;
  totalPrice: number;
 


}
export class CreateOrderResponse {
  status: string;
  orderId: number;
}
export class UpdateOrderResponse {
  totalQuantity: number;
  status: string;
}
export class addItem {
  orderItem: OrderItem;
  updateQuantity: UpdateQuantity;
}
export class UpdateQuantityRequest {
  imageUrl: string;
  orderId: number;
  productSku: string;
  mrpPrice: string;
  price: number;
  discountApplied: string;
  quantity: string;
  giftWrapped: string;
  productId: number;
  productName: string;
  productSkuCd:string

  updateQuantity: UpdateQuantity;
  igst: any;
  cgst: number;
  sgst: number;
  igstAmt: number;
  cgstAmt: number;
  sgstAmt: number;
  totalPrice: number;
}
export class UpdateQuantity {
  newQuantity: string;
  productSku: string;
  imageUrl: string;

}
export class DeleteItem {
  orderId: number;
  orderItemId: number;
}
export class UpdateItemObj {
  orderId: number;
  addItem: addItem;
  updateQuantity: UpdateQuantity;

}
export class ResetPasswordStatus {
  status: string;
}
export class PaymentDetails {
  fee: String;
  description: String;
  created_at: String;
  amount_refunded: String;
  bank: String;
  contact: String;
  currency: String;
  paymentId: String;
  email: String;
  amount: number;
  order_id: String;
  entity: String;
  status: String;
}
export class ShippingAddress {
  area: string;
  city: string;
  firstName: string;
  flatNo: string;
  landmark: string;
  lastFlg: string;
  lastName: string;
  middleName: string;
  mobileNo: number;
  pincode: number;
  primaryFlg: string;
  state: string;
  id: number;
  userId: number;

}
export class ShippingAddressRes {
  id: number;
  status: string;
}

export class RazorPayOrder {
  amount: number;
  currency: string;
  notes: NotesObj;
  orderId: number;
}
export class NotesObj {
  orderId: number;
}
export class RazorPayOrderRes {
  amount: number;
  currency: string;
  notes: NotesObj;
  Id: string;
  orderId: number;

}
export class OrderStatus {
  orderTrackRef: number;
  orderId: string;
  orderId2: number;
  orderTrackUpdateTime: Date;
  statusCd: string;
  orderTracksDesc: string;
  estimatedTime: Date;
  status: string;
  statusCdId: number;
}
export interface Customer {
  fullname: string;
  age: number;
  address: string;
  published: string;
}

export interface CustomerSource {
  source: Customer;
}

export interface Rating {
  avgCustomeRating: number;
  rating: number;
  count: number;
}
export class productsku {
  product_sku_id: number;
  product_description: string;
  price: number;
  imageUrl: string;
  productSkuCd:string
}
// added by shashikanth

export class ProductIndex {

  productName: any;
  product_desc: string;
  searchTag: string;
  productSkuId: number;
  price: number;
  imageUrl: string;
  length: any;
  _source: ProductInfo;
}
export class ProductInfo {

  productSkus: Skus[];
  product_desc: string;
  price: number;
  image_url: string;
  product_id: number;
  product_sku_id: number;
  productName: string;
  search_tag: string;
}

export class vieworders {
  deliverDate: string;
  orderId: number;
  orderStatus: string;
}

export class ContactUs {

  id: number;
  contactType: string;
  userId: string;
  orderId: string;
  submitDate: Date;
  status: string;
  assignedTo: string;
  userEmailId: string;
  userPhone: string;
  lastUpdateDate: Date;
  reasonId: number;
  reasonDesc: string;
}
export class ContactReasonRef {

  reasonId: number;
  reasonDesc: string;

}
export class Banner {

  bannerId: number;
  imageURL: string;
  activityType: string;
  componentType: string;
  param: BannerParameter;
}
export class BannerParameter {

  bannerParamRefId: number;
  paramName: string;
  paramValue: number;
}
export class WishList {
  userId: number;
  wishListId: number;
  wishListName: string;
  productSkuId: number;
  productName: string;
  productId: number;
  price: number;
  imageUrl: string;
  avgCustomerRating: number;
}
export class WishListSku {
  barCode: number;
  count: number;
  discount: number;
  imageUrl: string;
  images: any[];
  listPrice: number;
  price: number;
  productId: number;
  productSkuId: number;
  productSkuCd: string;
  status: string;
  productName: string;
  AvgCustomerRating: number;
}


export class ProductReview {
  id: number;
  customerId: number;
  productSkuId: number
  rating: number;
  lastUpdate: Date;
  reviewTitleTxt: string;
  feedBack: string;
  recommendedFlag: string;
  userId:number;
  firstName:any;
}

export class UserDetails {
  userId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  mobileNumber: string;
  loginStatus: string;
  enabledEmailOTP: boolean;
  enabledEmailToken: boolean;
  enabledMobileOTP: boolean;
}
export class LoginDetails {
  emailId: string;
  password: string;
  firstName: string;
  lastName: string;
  loginStatus: string;
  mobileNumber: number;
  userId: number;
  maillistFlg:string;
  
}
export class currentOrder {
  orderId: number;
  status: string;
  orderdDate: any;
  estimatedTime: any;
  statusCd: string;
  totalAmount: number;
  orderItems: order[]
  length: number;
}
export class order {
  orderItemId: number;
  imageUrl: string;
  productdescription: string;
  quantity: number;
  price: number;
}





export class viewOrder {
  orderId: number;
  orderSubmitDtTm: Date;
}
export class selectShippAddr {
  orderId: number;
  addrId: number;
}
export class EmailInvoice {
  orderId: number;
  email: string;
  subject: string;
  body: string;
}
export class EmailOrderConfirmation {
  orderId: number;
  emailTo: string;
  subject: string;
}
export class OrderItemIdData {
  orderId: number;
  skuId: number;
}
export class ReturnOrderItem {
  notes: string;
  orderId: number;
  orderItemId: number;
  returnReason: string;
}

export class BillingSummery {
  totalAmount: number;
  gst: number;
  expire: Date;
  couponCode: number;
  couponCharges: number;
  shippingCharges: number;
  total: number;
  igstNo: number;
}
export class ApplyCoupon {
  couponCode: string;
  orderId: number;
  userId: number;
}
export class trendingProduct{
  skuId:number;
  productId:number;
  productName:string;
  avgCustomerRating:number;
  discount:number;
  imageUrl:any;
  price:number;
  discountedPrice:number;
 
}