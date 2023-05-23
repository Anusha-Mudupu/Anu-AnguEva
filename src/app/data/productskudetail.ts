export interface ProductSkudetails{
    productSkuId: number,
  imageUrl: string,
  productSkuCd: string,
  count: number,
  status: string,
  discount: number,
  price: number,
  listPrice: number,
  skuDescription:string,
  productId: number,
  barCode: string,
  avgCustomerRating: string,
  ratingCount: number,
  trendingProductFlg: string,
  gstId: number,
  gstCode: number,
  igst: number
  images:image[]
}

export interface image{
    productSkuImage: string,
    productSkuId: number,
    productSkuImageId: number,
    options:option[]
}

export interface option{
    optionName: string,
      optionValue: number,
      optionId: number
}