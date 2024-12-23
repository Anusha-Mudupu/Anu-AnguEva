/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment1 = {
  production: false,
  googleAnalyticsId: 'G-3M2P3DV09Y'  // Replace with your actual Tracking/Measurement ID
};
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/loginDetails',
  Registration_Url: 'http://localhost:8080/register',
  verificationEmail_Url: 'http://localhost:8080/registerEmail',
  getUserUrl: 'http://localhost:8080/userLogin',
  resetPasswordUrl: 'http://localhost:8080/resetPassword',
  resetPasswordLinkUrl: 'http://localhost:8080/resetPasswordLink?email=',
  resetPasswordOTPUrl: 'http://localhost:8080/resetPasswordOTP?email=',
  checkUserEmailUrl: 'http://localhost:8080/checkUserEmail',
  updatePasswordUrl: 'http://localhost:8080/updatePassword',
  Rings_URL: './assets/data/Rings.json',
  Earrings_url: './assets/data/earrings.json',
  NewArrivals_url: "./assets/data/newarrivals.json",
  goldcoins_url: "./assets/data/goldcoins.json",
  gold_url: "./assets/data/gold.json",
  navigation_url: 'http://localhost:8080/catalog_dir',
  ProductListUrl: 'http://localhost:8080/ec/catalog',
  productDetailListUrl: "http://localhost:8080/ec/catalogParam",
  createOrderUrl: 'http://localhost:8080/EcommerceApp/createOrder2',
  updateOrderUrl: 'http://localhost:8080/EcommerceApp/updateOrder',
  getProductFromCartUrl: 'http://localhost:8080/EcommerceApp/viewOrder?order_id=',
  applyCouponCodeUrl: 'http://localhost:8080/EcommerceApp/applyCouponCode',
  addShippingAddressUrl: 'http://localhost:8080/EcommerceApp/addShippingAddress',
  getShippingAddressesUrl: 'http://localhost:8080/EcommerceApp/viewShippingAddresses?userId=',
  getPaymentDetailsUrl: 'http://localhost:8080/EcommerceApp/getPayment?paymentId=',
  createRazorPayOrderUrl: 'http://localhost:8080/EcommerceApp/createRazorPayOrder',
  getFilterProductListUrl: 'http://localhost:8080/allcatalog/{catalogId}?catalogId=',
  getOrderStatusUrl: 'http://localhost:8080/EcommerceApp/getOrderStatus?orderId=',
  verifyOTP_Url: 'http://localhost:8080/mobilenumbers/otp',
  validateOtp_Url: 'http://localhost:8080/validateOtp?otpnum=',
  addrating_Url: 'http://localhost:8080/productRatings',
  getviewordersurl: 'http://localhost:8080/EcommerceApp/getOpenOrdersByUserId?userId=',
  deleteItemUrl: 'http://localhost:8080/EcommerceApp/deleteItem',
  addToWishListUrl: 'http://localhost:8080/EcommerceApp/savewishlist',
  contactusUrl: 'http://localhost:8080/custcontact',
  bannerUrl: 'http://localhost:8080/ec/getBannerData',
  getWishlistUrl: 'http://localhost:8080/EcommerceApp/getWishlist?userId=',
  getReviewUrl: 'http://localhost:8080/ec/getReview?productSkuId=',
  getAllReviewsUrl: 'http://localhost:8080/ec/getAllReview',
  getOpenOrderUrl: 'http://localhost:8080/EcommerceApp/getOpenOrderByCustomerId?CustomerId=',
  getOrderIdUrl: 'http://localhost:8080/EcommerceApp/getOpenOrderId',
  getViewOrderUrl: 'http://localhost:8080/EcommerceApp/viewOrder?order_id=',
  cartimgUrl: 'http://localhost:8080/getproductByOrderId?id=',
  cartUserId: 'http://localhost:8080/EcommerceApp/getOpenOrderId?userId=',
  cardProductId: 'http://localhost:8080/getproductByOrderId?id=',
  orderItemId: 'http://localhost:8080/EcommerceApp/viewOrder?order_id=',
  getOrderItemImg: 'http://localhost:8080/getproductByOrderId?id=',

  getUserDetailsUrl: 'http://localhost:8080/getUser?user_id=',
  delWishlistUrl: 'http://localhost:8080/EcommerceApp/deleteWishlist',
  getFavouritesUrl: 'http://localhost:8080/EcommerceApp/getFavourites?userId=',
  getWishlistDetailsUrl: 'http://localhost:8080/EcommerceApp/getWishListDetails/',
  delShippAddrUrl: 'http://localhost:8080/ec/delShippAddr/',
  updateTotalAmtUrl: 'http://localhost:8080/EcommerceApp/updateTotalAmount',
  saveUserProfileUrl: 'http://localhost:8080/saveUserProfile',
  getUserProfileUrl: 'http://localhost:8080/getUserProfile/',
  downloadInvoiceUrl: 'http://localhost:8080/downloadInvoice/',
  custOrderDetailsUrl: 'http://localhost:8080/EcommerceApp/getUserOrdersByUserId?userId=',
  imageBaseURL: `http://localhost:8080/`,
  getProductSkuById: 'http://localhost:8080/getproductSkuBySkuId/',
  cartDetails: 'http://localhost:8080/getproductByOrderId/',
  emailWithAttachmentUrl: 'http://localhost:8080/sendEmail',
  selectShippingAddressUrl: 'http://localhost:8080/ec/selectShippAddr',
  userEmailIdUrl: 'http://localhost:8080/emailAddress/',
  getOrderStatusUrl2: 'http://localhost:8080/EcommerceApp/getOrderStatus2/',
  emailWithOrderConfirmationUrl: 'http://localhost:8080/sendEmailWithOrderConfirmation',
  viewOrderSubDetailsUrl: 'http://localhost:8080/EcommerceApp/viewOrderDetailsSub/',
  cancelOrderUrl: 'http://localhost:8080/EcommerceApp/cancelOrderRequest/',
  validateOTPandRegUserUrl: 'http://localhost:8080/valOTPAndRegUser?otpnum=',
  getOrderItemIdUrl: 'http://localhost:8080/EcommerceApp/getOrderItemId',
  returnOrderItemUrl: 'http://localhost:8080/EcommerceApp/returnOrderItem',
  TrendProdUrl: 'http://localhost:8080/TrendProd',
  FBLoginUrl: 'http://localhost:8080/FaceBookLogin',
  GoogleLoginUrl: 'http://localhost:8080/googleLogin',
  getUserDetailsByEmail: 'http://localhost:8080/getUser/emailId?email_id=',

  couponCheckURL: 'http://localhost:8080/EcommerceApp/applyCouponCode',
  imagesBaseUrl: `http://localhost:8080/`,
  elasticSearchUrl: 'http://103.12.1.168:9200',
  refundDetailsURL: 'http://localhost:8080/EcommerceApp/refundorder',
  getMenuIconsDetails: 'http://localhost:8080/menuIcondetails/{catalogId}?catalogId=',
  getMenuIcons: 'http://localhost:8080/getMenuIcons',
  whatsappNotificationUrl:'http://localhost:8080/sendmessage',
  emailSubscriptionUrl:'http://localhost:8080/userSubscription'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
