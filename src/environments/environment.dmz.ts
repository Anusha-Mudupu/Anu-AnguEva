/*
 *   Copyright (c) 2024 Dmantz Technologies private limited
 *   All rights reserved.
 */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const GlobalVariables = Object.freeze({
  BACKEND_BASE_URL: 'http://103.105.177.130:8080',
  ELASTIC_ENGINE_URL:'http://103.105.177.130:44'
});

export const environment = {
  production: false,
  /* Registration_Url:'http://192.168.0.174:8080/register`,
   getUserUrl:'http://192.168.0.174:8080/getUser/emailId`,
   Rings_URL: './assets/data/Rings.json`,
   Earrings_url:'./assets/data/earrings.json`,
   NewArrivals_url:"./assets/data/newarrivals.json",
   goldcoins_url:"./assets/data/goldcoins.json",
   gold_url:"./assets/data/gold.json",
 // navigation_url:"./assets/data/newfile.json",
  navigation_url:'http://192.168.0.174:8080/catalog_dir`,
  ProductListUrl:'http://192.168.0.174:8080/ec/catalog`,
  productDetailListUrl:"./assets/data/productDetail.json",
  createOrderUrl:'http://192.168.0.174:8080/EcommerceApp/createOrder2`,
  updateOrderUrl:'http://192.168.0.174:8080/EcommerceApp/updateOrder'*/
  apiUrl: `${GlobalVariables.BACKEND_BASE_URL}/loginDetails`,
  Registration_Url: `${GlobalVariables.BACKEND_BASE_URL}/register`,
  verificationEmail_Url: `${GlobalVariables.BACKEND_BASE_URL}/registerEmail`,
  getUserUrl: `${GlobalVariables.BACKEND_BASE_URL}/userLogin`,
  resetPasswordUrl: `${GlobalVariables.BACKEND_BASE_URL}/resetPassword`,
  checkUserEmailUrl: `${GlobalVariables.BACKEND_BASE_URL}/checkUserEmail`,
  updatePasswordUrl: `${GlobalVariables.BACKEND_BASE_URL}/updatePassword`,
  Rings_URL: './assets/data/Rings.json',
  Earrings_url: './assets/data/earrings.json',
  NewArrivals_url: "./assets/data/newarrivals.json",
  goldcoins_url: "./assets/data/goldcoins.json",
  gold_url: "./assets/data/gold.json",
  navigation_url: `${GlobalVariables.BACKEND_BASE_URL}/catalog_dir`,
  ProductListUrl: `${GlobalVariables.BACKEND_BASE_URL}/ec/catalog`,
  productDetailListUrl: `${GlobalVariables.BACKEND_BASE_URL}/ec/catalogParam`,
  createOrderUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/createOrder2`,
  updateOrderUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/updateOrder`,
  getProductFromCartUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/viewOrder?order_id=`,
  applyCouponCodeUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/applyCouponCode`,
  addShippingAddressUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/addShippingAddress`,
  getShippingAddressesUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/viewShippingAddresses?userId=`,
  getPaymentDetailsUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/getPayment?paymentId=`,
  createRazorPayOrderUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/createRazorPayOrder`,
  getFilterProductListUrl: `${GlobalVariables.BACKEND_BASE_URL}/allcatalog/{catalogId}?catalogId=`,
  getOrderStatusUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/getOrderStatus?orderId=`,
  verifyOTP_Url: `${GlobalVariables.BACKEND_BASE_URL}/mobilenumbers/otp`,
  validateOtp_Url: `${GlobalVariables.BACKEND_BASE_URL}/validateOtp?otpnum=`,
  addrating_Url: `${GlobalVariables.BACKEND_BASE_URL}/productRatings`,
  getviewordersurl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/getOrdersByCustomerId?CustomerId=`,
  deleteItemUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/deleteItem`,
  addToWishListUrl: `${GlobalVariables.BACKEND_BASE_URL}/ec/addToWL`,
  contactusUrl: `${GlobalVariables.BACKEND_BASE_URL}/custcontact`,
  bannerUrl: `${GlobalVariables.BACKEND_BASE_URL}/ec/getBannerData`,
  getWishlistUrl: `${GlobalVariables.BACKEND_BASE_URL}/ec/getWL/`,
  getReviewUrl:`${GlobalVariables.BACKEND_BASE_URL}/ec/getReview?productSkuId=`,
  getAllReviewsUrl:`${GlobalVariables.BACKEND_BASE_URL}/ec/getAllReview`,
  getOpenOrderUrl:`${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/getOpenOrderByCustomerId?CustomerId=`,
  getOrderIdUrl:`${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/getOpenOrderId`,
  getViewOrderUrl:`${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/viewOrder?order_id=`,
  getUserDetailsUrl:`${GlobalVariables.BACKEND_BASE_URL}/getUser?user_id=`,
  delWishlistUrl:`${GlobalVariables.BACKEND_BASE_URL}/ec/delFromWL`,
  getWishlistDetailsUrl:`${GlobalVariables.BACKEND_BASE_URL}/ec/getWishListDetails?userId=`,
  delShippAddrUrl:`${GlobalVariables.BACKEND_BASE_URL}/ec/delShippAddr/`,
  updateTotalAmtUrl:`${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/updateTotalAmount`,
  saveUserProfileUrl:`${GlobalVariables.BACKEND_BASE_URL}/saveUserProfile`,
  getUserProfileUrl:`${GlobalVariables.BACKEND_BASE_URL}/getUserProfile/`,
  downloadInvoiceUrl:`${GlobalVariables.BACKEND_BASE_URL}/downloadInvoice/`,
  custOrderDetailsUrl:`${GlobalVariables.BACKEND_BASE_URL}/viewOrderDetails/`,
  emailWithAttachmentUrl:`${GlobalVariables.BACKEND_BASE_URL}/sendEmail/`,
  selectShippingAddressUrl: `${GlobalVariables.BACKEND_BASE_URL}/ec/selectShippAddr`,
  userEmailIdUrl: `${GlobalVariables.BACKEND_BASE_URL}/emailAddress/`,
  getOrderStatusUrl2: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/getOrderStatus2/`,
  emailWithOrderConfirmationUrl: `${GlobalVariables.BACKEND_BASE_URL}/sendEmailWithOrderConfirmation`,
  viewOrderSubDetailsUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/viewOrderDetailsSub/`,
  cancelOrderUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/cancelOrderRequest/`,
  validateOTPandRegUserUrl: `${GlobalVariables.BACKEND_BASE_URL}/valOTPAndRegUser?otpnum=`,
  resetPasswordLinkUrl: `${GlobalVariables.BACKEND_BASE_URL}/resetPasswordLink?email=`,
  resetPasswordOTPUrl: `${GlobalVariables.BACKEND_BASE_URL}/resetPasswordOTP?email=`,
  getOrderItemIdUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/getOrderItemId`,
  returnOrderItemUrl: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/returnOrderItem`,
  TrendProdUrl: `${GlobalVariables.BACKEND_BASE_URL}/TrendProd`,
  FBLoginUrl: `${GlobalVariables.BACKEND_BASE_URL}/FaceBookLogin`,
  GoogleLoginUrl: `${GlobalVariables.BACKEND_BASE_URL}/googleLogin`,
  getUserDetailsByEmail: `${GlobalVariables.BACKEND_BASE_URL}/getUser/emailId?email_id=`,
  couponCheckURL: `${GlobalVariables.BACKEND_BASE_URL}/EcommerceApp/getCouponStatus&Reason`,
  imagesBaseUrl: `${GlobalVariables.BACKEND_BASE_URL}/`,
  elasticSearchUrl: `${GlobalVariables.ELASTIC_ENGINE_URL}`

  //wishlistUrl: 'http://localhost:3000/wishlist`,



  //  apiUrl:'http://192.168.100.15:8080/loginDetails`,
  //  Registration_Url:'http://192.168.100.15:8080/register`,
  //  verificationEmail_Url:'http://192.168.100.15:8080/registerEmail`,
  //  getUserUrl:'http://192.168.100.15:8080/userLogin`,
  //  resetPasswordUrl:'http://192.168.100.15:8080/resetPassword`,
  //  checkUserEmailUrl:'http://192.168.100.15:8080/checkUserEmail`,
  //  updatePasswordUrl:'http://192.168.100.15:8080/updatePassword`,
  //  Rings_URL: './assets/data/Rings.json`,
  //  Earrings_url:'./assets/data/earrings.json`,
  //  NewArrivals_url:"./assets/data/newarrivals.json",
  //  goldcoins_url:"./assets/data/goldcoins.json",
  //  gold_url:"./assets/data/gold.json",
  // // navigation_url:"./assets/data/newfile.json",
  // navigation_url:'http://192.168.100.15:8080/catalog_dir`,
  // ProductListUrl:'http://192.168.100.15:8080/ec/catalog`,
  // productDetailListUrl:"./assets/data/productDetail.json",
  // createOrderUrl:'http://192.168.100.15:8080/EcommerceApp/createOrder2`,
  // updateOrderUrl:'http://192.168.100.15:8080/EcommerceApp/updateOrder`,
  // getProductFromCartUrl:'http://192.168.100.15:8080/EcommerceApp/viewOrder?order_id=`,
  // applyCouponCodeUrl:'http://192.168.100.15:8080/EcommerceApp/applyCouponCode`,
  // addShippingAddressUrl:'http://192.168.100.15:8080/EcommerceApp/addShippingAddress`,
  // getShippingAddressesUrl:'http://192.168.100.15:8080/EcommerceApp/viewShippingAddresses?customerId=`,
  // getPaymentDetailsUrl:'http://192.168.100.15:8080/EcommerceApp/getDetails?paymentId='






  // apiUrl:'http://192.168.100.27:8080/loginDetails`,
  // Registration_Url:'http://192.168.100.27:8080/register`,
  // verificationEmail_Url:'http://192.168.100.27:8080/registerEmail`,
  // getUserUrl:'http://192.168.100.27:8080/userLogin`,
  // resetPasswordUrl:'http://192.168.100.27:8080/resetPassword`,
  // checkUserEmailUrl:'http://192.168.100.27:8080/checkUserEmail`,
  // updatePasswordUrl:'http://192.168.100.27:8080/updatePassword`,
  // Rings_URL: './assets/data/Rings.json`,
  // Earrings_url:'./assets/data/earrings.json`,
  // NewArrivals_url:"./assets/data/newarrivals.json",
  // goldcoins_url:"./assets/data/goldcoins.json",
  // gold_url:"./assets/data/gold.json",
  // // navigation_url:"./assets/data/newfile.json",
  // navigation_url:'http://192.168.100.27:8080/catalog_dir`,
  // ProductListUrl:'http://192.168.100.27:8080/ec/catalog`,
  // productDetailListUrl:"./assets/data/productDetail.json",
  // createOrderUrl:'http://192.168.100.27:8080/EcommerceApp/createOrder2`,
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
