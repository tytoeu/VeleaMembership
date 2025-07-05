export interface IMenu {
    key: number;
    itemId: number;
    itemCode: string;
    itemNameEn: string;
    itemNameKh: string;
    description: string | null
    barcode: string | null
    image: string | null
    size: string
    skuSap: string
    price: number
    package: number
    typeDis: string
    itemDisType: string
    discountRat: number
    priceAfterDis: number
    priceId: number
    categoryName: string
    subCategoryName: string
    feature: string,
    qty: number;
    increaseKey: number;
    itemPrices: ItemPrices[];
    additionals: Additionals[]
}

export interface ItemPrices {
    id: number;
    skuSap: string;
    size: string;
    price: number;
    typeDis: string;
    itemDisType: string;
    discountRat: number;
    priceAfterDis: number;
    remarkDiscount: string;
}

export interface Additionals {
    id: string;
    description: string;
}

export interface ICategory {
    categoryId: number;
    name: string;
    image: string | null;
    itemCount: number
}
export interface ISubCategory {
    subId: number;
    name: string;
    image: string | null;
    itemCount: number
}

export interface IItemAdd {
    customerId: number;
    itemId: number;
    itemCode: string;
    itemNameEn: string;
    itemNameKh: string;
    size: string;
    unitPrice: number;
    qty: number;
    typeDis: string;
    discountRate: number;
    priceAfterDis: number;
    total: number;
    package: number;
    itemDisType: string;
    remark: string;
    additionalNoted: string;
}

export interface IItemInCart extends IItemAdd {
    additionalName: string;
    branchId: number;
    image: string | null;
    increaseKey: number;
    appCartId: number;
}

export interface IItemInCartUpdate {
    itemId: number;
    appCartId: number;
    qty: number;
}