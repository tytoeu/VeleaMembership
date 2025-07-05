export interface IAddress {
    id: number;
    labelName: string;
    labelIcon: string;
    address1: string;
    address2: string;
    address3: string;
    latitude: number;
    longitude: number;
    isDefault: number;
    contactName: string;
    contactPhone: string;
    addressId?: number;
}
export interface ILocation {
    addressId: number;
    customerId: number;
    labelName: string;
    labelIcon: string;
    address1: string;
    address2: string;
    address3: string;
    latitude: number;
    longitude: number;
    isDefault: number;
    contactName: string;
    contactPhone: string;
}