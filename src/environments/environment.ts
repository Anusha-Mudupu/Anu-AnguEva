// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getAllProductsURL: 'http://localhost:8085/getAllProducts',
  getAllVendorsURL: 'http://localhost:8085/getAllManufacturers',
  saveProductURL: 'http://localhost:8085/addproduct',
  getProductByIdURL: 'http://localhost:8085/getProduct/?productId=',
  getProductSkuByIdURL: 'http://localhost:8085/getAllProductSkus?productId=',
  
  getproductSkuById:'http://localhost:8085/getByProductSkusId?skuId=',
 updateProductSku:'http://localhost:8085/editSku/'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
