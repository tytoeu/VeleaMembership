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
    feature: string
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