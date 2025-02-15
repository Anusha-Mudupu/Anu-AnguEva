/*
 *   Copyright (c) 2023 Dmantz Technologies private limited
 *   All rights reserved.
 */
export const environment1 = {
  production: false,
  googleAnalyticsId: 'G-3M2P3DV09Y'  // Replace with your actual Tracking/Measurement ID
};
export const environment = {
  production: true,
  apiUrl: 'http://103.12.1.167:30180/loginDetails',
  Registration_Url: 'http://103.12.1.167:30180/register',
  verificationEmail_Url: 'http://103.12.1.167:30180/registerEmail',
  getUserUrl: 'http://103.12.1.167:30180/userLogin',
  resetPasswordUrl: 'http://103.12.1.167:30180/resetPassword',
  resetPasswordLinkUrl: 'http://103.12.1.167:30180/resetPasswordLink?email=',
  resetPasswordOTPUrl: 'http://103.12.1.167:30180/resetPasswordOTP?email=',
  checkUserEmailUrl: 'http://103.12.1.167:30180/checkUserEmail',
  updatePasswordUrl: 'http://103.12.1.167:30180/updatePassword',
  Rings_URL: './assets/data/Rings.json',
  Earrings_url: './assets/data/earrings.json',
  NewArrivals_url: "./assets/data/newarrivals.json",
  goldcoins_url: "./assets/data/goldcoins.json",
  gold_url: "./assets/data/gold.json",
  navigation_url: 'http://103.12.1.167:30180/catalog_dir',
  ProductListUrl: 'http://103.12.1.167:30180/ec/catalog',
  productDetailListUrl: "http://103.12.1.167:30180/ec/catalogParam",
  createOrderUrl: 'http://103.12.1.167:30180/EcommerceApp/createOrder2',
  updateOrderUrl: 'http://103.12.1.167:30180/EcommerceApp/updateOrder',
  getProductFromCartUrl: 'http://103.12.1.167:30180/EcommerceApp/viewOrder?order_id=',
  applyCouponCodeUrl: 'http://103.12.1.167:30180/EcommerceApp/applyCouponCode',
  addShippingAddressUrl: 'http://103.12.1.167:30180/EcommerceApp/addShippingAddress',
  getShippingAddressesUrl: 'http://103.12.1.167:30180/EcommerceApp/viewShippingAddresses?userId=',
  getPaymentDetailsUrl: 'http://103.12.1.167:30180/EcommerceApp/getPayment?paymentId=',
  createRazorPayOrderUrl: 'http://103.12.1.167:30180/EcommerceApp/createRazorPayOrder',
  getFilterProductListUrl: 'http://103.12.1.167:30180/allcatalog/{catalogId}?catalogId=',
  getOrderStatusUrl: 'http://103.12.1.167:30180/EcommerceApp/getOrderStatus?orderId=',
  verifyOTP_Url: 'http://103.12.1.167:30180/mobilenumbers/otp',
  validateOtp_Url: 'http://103.12.1.167:30180/validateOtp?otpnum=',
  addrating_Url: 'http://103.12.1.167:30180/productRatings',
  getviewordersurl: 'http://103.12.1.167:30180/EcommerceApp/getOpenOrdersByUserId?userId=',
  deleteItemUrl: 'http://103.12.1.167:30180/EcommerceApp/deleteItem',
  addToWishListUrl: 'http://103.12.1.167:30180/EcommerceApp/savewishlist',
  contactusUrl: 'http://103.12.1.167:30180/custcontact',
  bannerUrl: 'http://103.12.1.167:30180/ec/getBannerData',
  getWishlistUrl: 'http://103.12.1.167:30180/EcommerceApp/getWishlist?userId=',
  getReviewUrl: 'http://103.12.1.167:30180/ec/getReview?productSkuId=',
  getAllReviewsUrl: 'http://103.12.1.167:30180/ec/getAllReview',
  getOpenOrderUrl: 'http://103.12.1.167:30180/EcommerceApp/getOpenOrderByCustomerId?CustomerId=',
  getOrderIdUrl: 'http://103.12.1.167:30180/EcommerceApp/getOpenOrderId',
  getViewOrderUrl: 'http://103.12.1.167:30180/EcommerceApp/viewOrder?order_id=',
  cartimgUrl: 'http://103.12.1.167:30180/getproductByOrderId?id=',
  cartUserId: 'http://103.12.1.167:30180/EcommerceApp/getOpenOrderId?userId=',
  cardProductId: 'http://103.12.1.167:30180/getproductByOrderId?id=',
  orderItemId: 'http://103.12.1.167:30180/EcommerceApp/viewOrder?order_id=',
  getOrderItemImg: 'http://103.12.1.167:30180/getproductByOrderId?id=',

  getUserDetailsUrl: 'http://103.12.1.167:30180/getUser?user_id=',
  delWishlistUrl: 'http://103.12.1.167:30180/EcommerceApp/deleteWishlist',
  getFavouritesUrl: 'http://103.12.1.167:30180/EcommerceApp/getFavourites?userId=',
  getWishlistDetailsUrl: 'http://103.12.1.167:30180/EcommerceApp/getWishListDetails/',
  delShippAddrUrl: 'http://103.12.1.167:30180/ec/delShippAddr/',
  updateTotalAmtUrl: 'http://103.12.1.167:30180/EcommerceApp/updateTotalAmount',
  saveUserProfileUrl: 'http://103.12.1.167:30180/saveUserProfile',
  getUserProfileUrl: 'http://103.12.1.167:30180/getUserProfile/',
  downloadInvoiceUrl: 'http://103.12.1.167:30180/downloadInvoice/',
  custOrderDetailsUrl: 'http://103.12.1.167:30180/EcommerceApp/getUserOrdersByUserId?userId=',
  imageBaseURL: `http://103.12.1.167:30180/`,
  getProductSkuById: 'http://103.12.1.167:30180/getproductSkuBySkuId/',
  cartDetails: 'http://103.12.1.167:30180/getproductByOrderId/',
  emailWithAttachmentUrl: 'http://103.12.1.167:30180/sendEmail',
  selectShippingAddressUrl: 'http://103.12.1.167:30180/ec/selectShippAddr',
  userEmailIdUrl: 'http://103.12.1.167:30180/emailAddress/',
  getOrderStatusUrl2: 'http://103.12.1.167:30180/EcommerceApp/getOrderStatus2/',
  emailWithOrderConfirmationUrl: 'http://103.12.1.167:30180/sendEmailWithOrderConfirmation',
  viewOrderSubDetailsUrl: 'http://103.12.1.167:30180/EcommerceApp/viewOrderDetailsSub/',
  cancelOrderUrl: 'http://103.12.1.167:30180/EcommerceApp/cancelOrderRequest/',
  validateOTPandRegUserUrl: 'http://103.12.1.167:30180/valOTPAndRegUser?otpnum=',
  getOrderItemIdUrl: 'http://103.12.1.167:30180/EcommerceApp/getOrderItemId',
  returnOrderItemUrl: 'http://103.12.1.167:30180/EcommerceApp/returnOrderItem',
  TrendProdUrl: 'http://103.12.1.167:30180/TrendProd',
  FBLoginUrl: 'http://103.12.1.167:30180/FaceBookLogin',
  GoogleLoginUrl: 'http://103.12.1.167:30180/googleLogin',
  getUserDetailsByEmail: 'http://103.12.1.167:30180/getUser/emailId?email_id=',

  couponCheckURL: 'http://103.12.1.167:30180/EcommerceApp/applyCouponCode',
  imagesBaseUrl: `http://103.12.1.167:30180/`,
  elasticSearchUrl: 'http://103.12.1.168:9200',
  refundDetailsURL: 'http://103.12.1.167:30180/EcommerceApp/refundorder',
  getMenuIconsDetails: 'http://103.12.1.167:30180/menuIcondetails/{catalogId}?catalogId=',
  getMenuIcons: 'http://103.12.1.167:30180/getMenuIcons',
};
