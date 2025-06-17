
interface IMembership {
    id: number;
    name: string
    phone: string;
    gender: string;
    dob: string;
    balance: number;
    point: number;
    created_at: string
    avatar: string | null;
}

export interface IOnboard {
    id: 4;
    title: string;
    description: string;
    image: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface IDashboard {
    membership: IMembership;
    cards: ICard[];
}

export interface ICard {
    id: number;
    card_number: string;
    offer_discount: number;
    limit_type: string;
    limit_offer: number | 0
    expire_date: string;
    status: number;
    tier_name: string;
    tier_image: string | null;
}