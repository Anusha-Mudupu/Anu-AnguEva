/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const GlobalVariableHelper = Object.freeze({
  BASE_URL: 'http://192.168.0.111:8080'
  
});
  export const environment = {
    production: false,
  
    //USER_ID_COOKIE_NAME: 'fmcUserID',
    //SSO_LOGIN_URL: `${GlobalVariableHelper.BASE_URL}/fluid`,
    //sessionEndedUrl: 'logout.htm',
  
    
     /* Registration_Url:'http://192.168.0.174:8080/register',
  getUserUrl:'http://192.168.0.174:8080/getUser/emailId',
  Rings_URL: './assets/data/Rings.json',
  Earrings_url:'./assets/data/earrings.json',
  NewArrivals_url:"./assets/data/newarrivals.json",
  goldcoins_url:"./assets/data/goldcoins.json",
  gold_url:"./assets/data/gold.json",
// navigation_url:"./assets/data/newfile.json",
 navigation_url:'http://192.168.0.174:8080/catalog_dir',
 ProductListUrl:'http://192.168.0.174:8080/ec/catalog',
 productDetailListUrl:"./assets/data/productDetail.json",
 createOrderUrl:'http://192.168.0.174:8080/EcommerceApp/createOrder2',
 updateOrderUrl:'http://192.168.0.174:8080/EcommerceApp/updateOrder'*/
  apiUrl:`${GlobalVariableHelper.BASE_URL}/loginDetails`,
  Registration_Url:`${GlobalVariableHelper.BASE_URL}/register`,
  verificationEmail_Url:`${GlobalVariableHelper.BASE_URL}/registerEmail`,
  getUserUrl:`${GlobalVariableHelper.BASE_URL}/userLogin`,
  resetPasswordUrl:`${GlobalVariableHelper.BASE_URL}/resetPassword`,
  checkUserEmailUrl:`${GlobalVariableHelper.BASE_URL}/checkUserEmail`,
  updatePasswordUrl:`${GlobalVariableHelper.BASE_URL}/updatePassword`,
  Rings_URL: './assets/data/Rings.json',
  Earrings_url:'./assets/data/earrings.json',
  NewArrivals_url:"./assets/data/newarrivals.json",
  goldcoins_url:"./assets/data/goldcoins.json",
  gold_url:"./assets/data/gold.json",
navigation_url:`${GlobalVariableHelper.BASE_URL}/catalog_dir`,
 ProductListUrl:`${GlobalVariableHelper.BASE_URL}/ec/catalog`,
 //productDetailListUrl:"./assets/data/productDetail.json",
 productDetailListUrl: `${GlobalVariableHelper.BASE_URL}/ec/catalogParam`,
 createOrderUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/createOrder2`,
 updateOrderUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/updateOrder`,
 getProductFromCartUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/viewOrder?order_id=`,
 applyCouponCodeUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/applyCouponCode`,
 addShippingAddressUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/addShippingAddress`,
 getShippingAddressesUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/viewShippingAddresses?customerId=`,
getPaymentDetailsUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/getPayment?paymentId=`,
createRazorPayOrderUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/createRazorPayOrder`,
getFilterProductListUrl:`${GlobalVariableHelper.BASE_URL}/allcatalog/{catalogId}?catalogId=`,
getOrderStatusUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/getOrderStatus?orderId=`,
verifyOTP_Url:`${GlobalVariableHelper.BASE_URL}/mobilenumbers/otp`,
validateOtp_Url:`${GlobalVariableHelper.BASE_URL}/validateOtp?otpnum=`,
addrating_Url:`${GlobalVariableHelper.BASE_URL}/productRatings`,
getviewordersurl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/getOrdersByCustomerId?CustomerId=`,
deleteItemUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/deleteItem`,
addToWishListUrl:`${GlobalVariableHelper.BASE_URL}/ec/addToWL`,
contactusUrl:`${GlobalVariableHelper.BASE_URL}/custcontact`,
bannerUrl:`${GlobalVariableHelper.BASE_URL}/ec/getBannerData`,

getWishlistUrl: `${GlobalVariableHelper.BASE_URL}/ec/getWL/`,
  getReviewUrl:`${GlobalVariableHelper.BASE_URL}/ec/getReview?productSkuId=`,
  getAllReviewsUrl:`${GlobalVariableHelper.BASE_URL}/ec/getAllReview`,

  getOpenOrderUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/getOpenOrderByCustomerId?CustomerId=`,
  getOrderIdUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/getOpenOrderId`,
  getViewOrderUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/viewOrder?order_id=`,
  getUserDetailsUrl:`${GlobalVariableHelper.BASE_URL}/getUser?user_id=`,

  delWishlistUrl:`${GlobalVariableHelper.BASE_URL}/ec/delFromWL`,
  getWishlistDetailsUrl:`${GlobalVariableHelper.BASE_URL}/ec/getWishListDetails?userId=`,
  delShippAddrUrl:`${GlobalVariableHelper.BASE_URL}/ec/delShippAddr/`,
  updateTotalAmtUrl:`${GlobalVariableHelper.BASE_URL}/EcommerceApp/updateTotalAmount`,
  saveUserProfileUrl:`${GlobalVariableHelper.BASE_URL}/saveUserProfile`,
  getUserProfileUrl:`${GlobalVariableHelper.BASE_URL}/getUserProfile/`,
  downloadInvoiceUrl:`${GlobalVariableHelper.BASE_URL}/downloadInvoice/`,
  custOrderDetailsUrl:`${GlobalVariableHelper.BASE_URL}/viewOrderDetails/`,
  emailWithAttachmentUrl:`${GlobalVariableHelper.BASE_URL}/sendEmail/`,
  selectShippingAddressUrl: `${GlobalVariableHelper.BASE_URL}/ec/selectShippAddr`,
  userEmailIdUrl: `${GlobalVariableHelper.BASE_URL}/emailAddress/`,
  getOrderStatusUrl2: `${GlobalVariableHelper.BASE_URL}/EcommerceApp/getOrderStatus2/`,
  emailWithOrderConfirmationUrl: `${GlobalVariableHelper.BASE_URL}/sendEmailWithOrderConfirmation`,
    viewOrderSubDetailsUrl: `${GlobalVariableHelper.BASE_URL}/EcommerceApp/viewOrderDetailsSub/`,
    cancelOrderUrl: `${GlobalVariableHelper.BASE_URL}/EcommerceApp/cancelOrderRequest/`,
    validateOTPandRegUserUrl: `${GlobalVariableHelper.BASE_URL}/valOTPAndRegUser?otpnum=`,
    resetPasswordLinkUrl: `${GlobalVariableHelper.BASE_URL}/resetPasswordLink?email=`,
    resetPasswordOTPUrl: `${GlobalVariableHelper.BASE_URL}/resetPasswordOTP?email=`,
    getOrderItemIdUrl: `${GlobalVariableHelper.BASE_URL}/EcommerceApp/getOrderItemId`,
    returnOrderItemUrl: `${GlobalVariableHelper.BASE_URL}/EcommerceApp/returnOrderItem`,
    TrendProdUrl: `${GlobalVariableHelper.BASE_URL}/TrendProd`,
    FBLoginUrl: `${GlobalVariableHelper.BASE_URL}/FaceBookLogin`,
    GoogleLoginUrl: `${GlobalVariableHelper.BASE_URL}/googleLogin`,
    getUserDetailsByEmail: `${GlobalVariableHelper.BASE_URL}/getUser/emailId?email_id=`,
    couponCheckURL: `${GlobalVariableHelper.BASE_URL}/EcommerceApp/getCouponStatus&Reason`,
    imagesBaseUrl: `${GlobalVariableHelper.BASE_URL}/`,
  elasticSearchUrl: 'http://192.168.0.111:9200'

//  apiUrl:'http://192.168.100.15:8080/loginDetails',
//  Registration_Url:'http://192.168.100.15:8080/register',
//  verificationEmail_Url:'http://192.168.100.15:8080/registerEmail',
//  getUserUrl:'http://192.168.100.15:8080/userLogin',
//  resetPasswordUrl:'http://192.168.100.15:8080/resetPassword',
//  checkUserEmailUrl:'http://192.168.100.15:8080/checkUserEmail',
//  updatePasswordUrl:'http://192.168.100.15:8080/updatePassword',
//  Rings_URL: './assets/data/Rings.json',
//  Earrings_url:'./assets/data/earrings.json',
//  NewArrivals_url:"./assets/data/newarrivals.json",
//  goldcoins_url:"./assets/data/goldcoins.json",
//  gold_url:"./assets/data/gold.json",
// // navigation_url:"./assets/data/newfile.json",
// navigation_url:'http://192.168.100.15:8080/catalog_dir',
// ProductListUrl:'http://192.168.100.15:8080/ec/catalog',
// productDetailListUrl:"./assets/data/productDetail.json",
// createOrderUrl:'http://192.168.100.15:8080/EcommerceApp/createOrder2',
// updateOrderUrl:'http://192.168.100.15:8080/EcommerceApp/updateOrder',
// getProductFromCartUrl:'http://192.168.100.15:8080/EcommerceApp/viewOrder?order_id=',
// applyCouponCodeUrl:'http://192.168.100.15:8080/EcommerceApp/applyCouponCode',
// addShippingAddressUrl:'http://192.168.100.15:8080/EcommerceApp/addShippingAddress',
// getShippingAddressesUrl:'http://192.168.100.15:8080/EcommerceApp/viewShippingAddresses?customerId=',
// getPaymentDetailsUrl:'http://192.168.100.15:8080/EcommerceApp/getDetails?paymentId='






// apiUrl:'http://192.168.100.27:8080/loginDetails',
// Registration_Url:'http://192.168.100.27:8080/register',
// verificationEmail_Url:'http://192.168.100.27:8080/registerEmail',
// getUserUrl:'http://192.168.100.27:8080/userLogin',
// resetPasswordUrl:'http://192.168.100.27:8080/resetPassword',
// checkUserEmailUrl:'http://192.168.100.27:8080/checkUserEmail',
// updatePasswordUrl:'http://192.168.100.27:8080/updatePassword',
// Rings_URL: './assets/data/Rings.json',
// Earrings_url:'./assets/data/earrings.json',
// NewArrivals_url:"./assets/data/newarrivals.json",
// goldcoins_url:"./assets/data/goldcoins.json",
// gold_url:"./assets/data/gold.json",
// // navigation_url:"./assets/data/newfile.json",
// navigation_url:'http://192.168.100.27:8080/catalog_dir',
// ProductListUrl:'http://192.168.100.27:8080/ec/catalog',
// productDetailListUrl:"./assets/data/productDetail.json",
// createOrderUrl:'http://192.168.100.27:8080/EcommerceApp/createOrder2',
// updateOrderUrl:'http://192.168.100.27:8080/EcommerceApp/updateOrder'
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
