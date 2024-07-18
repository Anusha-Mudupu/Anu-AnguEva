/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
export const environment = {
  production: true,


  getAllProductsURL: 'http://103.12.1.167:30163/getAllProducts',
  getAllVendorsURL: 'http://103.12.1.167:30163/getAllManufacturers',
  saveProductURL: 'http://103.12.1.167:30163/addProduct',
  getProductByIdURL: 'http://103.12.1.167:30163/getProduct/?productId=',
  getAllProductskusIdURL: 'http://103.12.1.167:30163/getAllProductSkus?productId=',
  getproductSkuById: 'http://103.12.1.167:30163/api/getByProductSkusId?skuId=',
  //  updateProductSku:'http://103.12.1.167:30163/ecomm/updateByProductSkuId?skuId=', 
  updateProductSku: 'http://103.12.1.167:30163/updateProductSkuById/{skuId}?id=',
  imagesBaseUrl: `http://103.12.1.167:30163/`,
  getImageBySkuId: `http://103.12.1.167:30163/getImageSkuId/{id}?id=`,
  uploadImageBySkuId: 'http://103.12.1.167:30163/api/file/upload/',

  deleteImgByImgId: 'http://103.12.1.167:30163/api/file/delete?id=',
  //  getOptionsBySkuId:'http://103.12.1.167:30163/getOptionBySkuId?skuId=',  
  // getOptionUrl:'http://103.12.1.167:30163/api/getOptionSkuId?skuId=', 
  addNewOption: 'http://103.12.1.167:30163/addOption',
  getAllOrders: 'http://103.12.1.167:30163/getAllOrders',
  getOrderItemDetails: 'http://103.12.1.167:30163/getOrderItemsByOrderId?orderId=',

  updateOrderStatus: 'http://103.12.1.167:30163/updateOrderStatus',
  Orderstatushistory: 'http://103.12.1.167:30163/getOrderStatusHistory?orderId=',
  getAllcatalogs: 'http://103.12.1.167:30163/api/getAllCatalog',
  Addnewcatalog: 'http://103.12.1.167:30163/addCatalog',
  getstafflistUrl: 'http://103.12.1.167:30163/getStaff',
  addstaffurl: 'http://103.12.1.167:30163/addStaff',
  getstaffBystaffCd: 'http://103.12.1.167:30163/getStaffById?staffId=',
  updateStaff: 'http://103.12.1.167:30163/updateStaff?staffId=',
  updateproduct: 'http://103.12.1.167:30163/api/updateProduct?productId=',
  downloadinvoice: 'http://103.12.1.167:30163/downloadInvoice/',

  getAllParentCatalogs: 'http://103.12.1.167:30163/api/getParentCatalogs',
  getAllOptionsdata: 'http://103.12.1.167:30163/api/getOptions',
  getStaffRoles: 'http://103.12.1.167:30163/getRoles',
  getOptionsOnProdcut: 'http://103.12.1.167:30163/getOptions',
  getOptionValuesByProductId: 'http://103.12.1.167:30163/api/getOptions?productId=',


  addproduct: 'http://103.12.1.167:30163/ecomm/addProduct',
  getAllGStcodes: ' http://103.12.1.167:30163/getAllGstCode',
  addProductSku: "http://103.12.1.167:30163/addproductsku",
  addProductSkuImage: "http://103.12.1.167:30163/addImages",
  // addimagetoPsku: 'http://103.12.1.167:30163/api/file/upload/'
  addimagetoPsku:'http://localhost:8085/api/strapi/upload?skuId=',
  getAllStrapiImages:'http://localhost:8085/api/strapi/getImages'
};
