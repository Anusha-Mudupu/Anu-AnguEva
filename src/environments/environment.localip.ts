// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const GlobalVariable = Object.freeze({
  BACKEND_BASE_URL: 'http://192.168.0.168:8080',
  ELASTIC_ENGINE_URL:'http://103.105.177.130:44'
});

export const environment1 = {
  production: false,
  googleAnalyticsId: 'G-3M2P3DV09Y'  // Replace with your actual Tracking/Measurement ID
};

export const environment = {
  production: false,
  apiUrl: `${GlobalVariable.BACKEND_BASE_URL}/loginDetails`,
  Registration_Url: `${GlobalVariable.BACKEND_BASE_URL}/register`,
  verificationEmail_Url: `${GlobalVariable.BACKEND_BASE_URL}/registerEmail`,
  getUserUrl: `${GlobalVariable.BACKEND_BASE_URL}/userLogin`,
  resetPasswordUrl: `${GlobalVariable.BACKEND_BASE_URL}/resetPassword`,
  resetPasswordLinkUrl: `${GlobalVariable.BACKEND_BASE_URL}/resetPasswordLink?email=`,
  resetPasswordOTPUrl: `${GlobalVariable.BACKEND_BASE_URL}/resetPasswordOTP?email=`,
  checkUserEmailUrl: `${GlobalVariable.BACKEND_BASE_URL}/checkUserEmail`,
  updatePasswordUrl: `${GlobalVariable.BACKEND_BASE_URL}/updatePassword`,
  Rings_URL: `./assets/data/Rings.json`,
  Earrings_url: `./assets/data/earrings.json`,
  NewArrivals_url: "./assets/data/newarrivals.json",
  goldcoins_url: "./assets/data/goldcoins.json",
  gold_url: "./assets/data/gold.json",
  navigation_url: `${GlobalVariable.BACKEND_BASE_URL}/catalog_dir`,
  ProductListUrl: `${GlobalVariable.BACKEND_BASE_URL}/ec/catalog`,
  productDetailListUrl: `${GlobalVariable.BACKEND_BASE_URL}/ec/catalogParam`,
  createOrderUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/createOrder2`,
  updateOrderUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/updateOrder`,
  getProductFromCartUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/viewOrder?order_id=`,
  applyCouponCodeUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/applyCouponCode`,
  addShippingAddressUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/addShippingAddress`,
  getShippingAddressesUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/viewShippingAddresses?userId=`,
  getPaymentDetailsUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getPayment?paymentId=`,
  createRazorPayOrderUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/createRazorPayOrder`,
  getFilterProductListUrl: `${GlobalVariable.BACKEND_BASE_URL}/allcatalog/{catalogId}?catalogId=`,
  getOrderStatusUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getOrderStatus?orderId=`,
  verifyOTP_Url: `${GlobalVariable.BACKEND_BASE_URL}/mobilenumbers/otp`,
  validateOtp_Url: `${GlobalVariable.BACKEND_BASE_URL}/validateOtp?otpnum=`,
  addrating_Url: `${GlobalVariable.BACKEND_BASE_URL}/productRatings`,
  getviewordersurl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getOpenOrdersByUserId?userId=`,
  deleteItemUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/deleteItem`,
  addToWishListUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/savewishlist`,
  contactusUrl: `${GlobalVariable.BACKEND_BASE_URL}/custcontact`,
  bannerUrl: `${GlobalVariable.BACKEND_BASE_URL}/ec/getBannerData`,
  getWishlistUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getWishlist?userId=`,
  getReviewUrl: `${GlobalVariable.BACKEND_BASE_URL}/ec/getReview?productSkuId=`,
  getAllReviewsUrl: `${GlobalVariable.BACKEND_BASE_URL}/ec/getAllReview`,
  getOpenOrderUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getOpenOrderByCustomerId?CustomerId=`,
  getOrderIdUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getOpenOrderId`,
  getViewOrderUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/viewOrder?order_id=`,
  cartimgUrl: `${GlobalVariable.BACKEND_BASE_URL}/getproductByOrderId?id=`,
  cartUserId: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getOpenOrderId?userId=`,
  cardProductId: `${GlobalVariable.BACKEND_BASE_URL}/getproductByOrderId?id=`,
  orderItemId: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/viewOrder?order_id=`,
  getOrderItemImg: `${GlobalVariable.BACKEND_BASE_URL}/getproductByOrderId?id=`,

  getUserDetailsUrl: `${GlobalVariable.BACKEND_BASE_URL}/getUser?user_id=`,
  delWishlistUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/deleteWishlist`,
  getFavouritesUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getFavourites?userId=`,
  getWishlistDetailsUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getWishListDetails/`,
  delShippAddrUrl: `${GlobalVariable.BACKEND_BASE_URL}/ec/delShippAddr/`,
  updateTotalAmtUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/updateTotalAmount`,
  saveUserProfileUrl: `${GlobalVariable.BACKEND_BASE_URL}/saveUserProfile`,
  getUserProfileUrl: `${GlobalVariable.BACKEND_BASE_URL}/getUserProfile/`,
  downloadInvoiceUrl: `${GlobalVariable.BACKEND_BASE_URL}/downloadInvoice/`,
  custOrderDetailsUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getUserOrdersByUserId?userId=`,
  imageBaseURL: `${GlobalVariable.BACKEND_BASE_URL}/`,
  getProductSkuById: `${GlobalVariable.BACKEND_BASE_URL}/getproductSkuBySkuId/`,
  cartDetails: `${GlobalVariable.BACKEND_BASE_URL}/getproductByOrderId/`,
  emailWithAttachmentUrl: `${GlobalVariable.BACKEND_BASE_URL}/sendEmail`,
  selectShippingAddressUrl: `${GlobalVariable.BACKEND_BASE_URL}/ec/selectShippAddr`,
  userEmailIdUrl: `${GlobalVariable.BACKEND_BASE_URL}/emailAddress/`,
  getOrderStatusUrl2: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getOrderStatus2/`,
  emailWithOrderConfirmationUrl: `${GlobalVariable.BACKEND_BASE_URL}/sendEmailWithOrderConfirmation`,
  viewOrderSubDetailsUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/viewOrderDetailsSub/`,
  cancelOrderUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/cancelOrderRequest/`,
  validateOTPandRegUserUrl: `${GlobalVariable.BACKEND_BASE_URL}/valOTPAndRegUser?otpnum=`,
  getOrderItemIdUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/getOrderItemId`,
  returnOrderItemUrl: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/returnOrderItem`,
  TrendProdUrl: `${GlobalVariable.BACKEND_BASE_URL}/TrendProd`,
  FBLoginUrl: `${GlobalVariable.BACKEND_BASE_URL}/FaceBookLogin`,
  GoogleLoginUrl: `${GlobalVariable.BACKEND_BASE_URL}/googleLogin`,
  getUserDetailsByEmail: `${GlobalVariable.BACKEND_BASE_URL}/getUser/emailId?email_id=`,

  couponCheckURL: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/applyCouponCode`,
  imagesBaseUrl: `${GlobalVariable.BACKEND_BASE_URL}/`,
  elasticSearchUrl: `http://103.12.1.168:9200`,
  refundDetailsURL: `${GlobalVariable.BACKEND_BASE_URL}/EcommerceApp/refundorder`,
  getMenuIconsDetails: `${GlobalVariable.BACKEND_BASE_URL}/menuIcondetails/{catalogId}?catalogId=`,
  getMenuIcons: `${GlobalVariable.BACKEND_BASE_URL}/getMenuIcons`,
  whatsappNotificationUrl:`${GlobalVariable.BACKEND_BASE_URL}/sendmessage`,
  emailSubscriptionUrl:`${GlobalVariable.BACKEND_BASE_URL}/userSubscription`
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import `zone.js/plugins/zone-error`;  // Included with Angular CLI.
