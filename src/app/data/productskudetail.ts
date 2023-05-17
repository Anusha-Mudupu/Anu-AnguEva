export interface productSkudetails{
    productSkuId:number;
    imageUrl:string;
    price:number;
    skuDescription:string;
    status: string;
    count: number;
    discount: number;
    productId: number;
    productSkuCd:string;
    listPrice: number;
    barCode: number;
    options:Options[]
}
export interface Options{
    optionId: number;
    optionName:string;
    optionValue: number;
    images:Images[]
}
export interface Images{
    productSkuImageId: number,
      name:string
      mimetype:string
      productSkuId: number
      primaryImageFlg: string
      pic: string
}

export interface option{
    optionName:string;
    optionValue:string
}