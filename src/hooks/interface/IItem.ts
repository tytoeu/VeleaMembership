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