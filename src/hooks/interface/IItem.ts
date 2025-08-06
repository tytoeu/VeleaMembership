export interface IItem {
    id: number;
    item_name: string;
    item_code: string;
    item_type: string;
    item_id: number;
    min_point: number;
    description: string;
    image: string;
    expired: string;
}

export interface IChangeData {
    membership_id: number;
    redeem_id: number;
    change_point: number;
}

export interface IUserItems extends IItem {
    redeem_code: string
}

export interface IVoucherDiscount {
    voucherId: number;
    min_Amount: number;
    max_Discount: number;
    voucherOffer: number;
    voucherType: string;
    memberShipId: number;
    limitOffer: number;
    customerId: number;
    offerDiscount: number;
    includePromotion: number;
    includeDiscount: number;
    applyType: string;
}

export interface IMethodPayment {
    id: number;
    name: string;
    icon: string;
    io: string
    sub: string
    methodType: string;
}

export interface ITeamOrder {
    orderStatus: string;
    deliveryType: string;
    orderDate: string;
    subTotal: number;
    discount: number;
    taxRate: number;
    deliveryFee: number;
    grandTotal: number;
    payStatus: string;
    applyType: string;
    shipAddress: string;
    deliveryName: string;
    phoneNumber: string;
    orderNo: string;
    statusNumber: number;
    statusText: string;
    itemDetail: ItemDetail[]
}

export interface ItemDetail {
    itemNameEn: string;
    itemNameKh: string;
    size: string;
    qty: string;
    priceAfterDiscount: number;
    total: number;
    additionalName: string;
    image: string;
    package: number;
}