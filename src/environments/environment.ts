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
  
  getproductSkuById:'http://localhost:8085/ecomm/getByProductSkuId?skuId=',
 updateProductSku:'http://localhost:8085/ecomm/updateByProductSkuId?skuId=',
  imagesBaseUrl: `http://localhost:8085/`,

   getImageBySkuId: `http://localhost:8085/getImageSkuId/{id}?id=`,
   uploadImageBySkuId:'http://localhost:8085/api/file/upload/',
   deleteImgByImgId:'http://localhost:8085/api/file/delete?id=',
  //  getOptionsBySkuId:'http://localhost:8085/getOptionBySkuId?skuId=',
   
    // getOptionUrl:'http://localhost:8085/api/getOptionSkuId?skuId=',
   addNewOption:'http://localhost:8085/addOption' 

   

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
