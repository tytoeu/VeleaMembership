export interface ISignin {
    email: string;
    password: string
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    access_token: string;
}