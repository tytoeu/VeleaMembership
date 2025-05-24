
export interface IMembership {
    id: number;
    name: string
    phone: string;
    gender: string;
    dob: string;
    balance: number;
    point: number;
    created_at: string
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