/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getAllProductsURL: 'http://localhost:8085/getAllProducts',
  getAllVendorsURL: 'http://localhost:8085/getAllManufacturers',
  saveProductURL: 'http://localhost:8085/addProduct',
  getProductByIdURL: 'http://localhost:8085/getProduct/?productId=',
  getAllProductskusIdURL: 'http://localhost:8085/getAllProductSkus?productId=',
  
  getproductSkuById:'http://localhost:8085/api/getByProductSkusId?skuId=',
//  updateProductSku:'http://localhost:8085/ecomm/updateByProductSkuId?skuId=',
updateProductSku:'http://localhost:8085/updateProductSkuById/{skuId}?id=',
  imagesBaseUrl: `http://localhost:8085/`,

   getImageBySkuId: `http://localhost:8085/getImageSkuId/{id}?id=`,
   uploadImageBySkuId:'http://localhost:8085/api/file/upload/',
   deleteImgByImgId:'http://localhost:8085/api/file/delete?id=',
  //  getOptionsBySkuId:'http://localhost:8085/getOptionBySkuId?skuId=',
   
    // getOptionUrl:'http://localhost:8085/api/getOptionSkuId?skuId=',
   addNewOption:'http://localhost:8085/addOption' ,
   getAllOrders:'http://localhost:8085/getAllOrders',
   getOrderItemDetails:'http://localhost:8085/getOrderItemsByOrderId?orderId=',
   updateOrderStatus:'http://localhost:8085/updateOrderStatus',
  Orderstatushistory:'http://localhost:8085/getOrderStatusHistory?orderId=' ,
  getAllcatalogs:'http://localhost:8085/api/getAllCatalog',
  Addnewcatalog:'http://localhost:8085/addCatalog',
  getstafflistUrl:'http://localhost:8085/getStaff',
  addstaffurl:'http://localhost:8085/addStaff',
  getstaffBystaffCd:'http://localhost:8085/getStaffById?staffId=',
  updateStaff:'http://localhost:8085/updateStaff?staffId=',
  updateproduct:'http://localhost:8085/api/updateProduct?productId=',
  downloadinvoice:'http://localhost:8085/downloadInvoice/',
  getAllParentCatalogs:'http://localhost:8085/api/getParentCatalogs',
  // getAllOptionsdata:'http://localhost:8085/api/getOptions',
  getOptionValuesByProductId:'http://localhost:8085/api/getOptions?productId=',
  getStaffRoles:'http://localhost:8085/getRoles',
 getOptionsOnProdcut:'http://localhost:8085/getOptions',
 
addproduct:'http://localhost:8085/ecomm/addProduct',
getAllGStcodes:' http://localhost:8085/getAllGstCode',
addProductSku : "http://localhost:8085/addproductsku",
 addProductSkuImage : "http://localhost:8085/addImages",
 addimagetoPsku:'http://localhost:8085/api/file/upload/'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
