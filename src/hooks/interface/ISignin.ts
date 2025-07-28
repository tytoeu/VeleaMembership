export interface ISignin {
    phone_number: string;
    password: string
}

export interface ISigninCard {
    membership_id: number;
    password: string;
    card_number: string;
}

export interface IUser {
    id: number;
    access_token: string;
}

export interface OTP {
    phone_number: string,
    device_id: string,
    calling_code: string,
    verify_date: string;
    isforget: boolean | number
}

export interface IVerifyOtp {
    phone_number: string,
    otp_code: string
}

export interface ISignup {
    full_name: string,
    phone_number: string,
    password: string,
    dob: string,
    otp_code: string
}
export interface IResetPassword {
    phone_number: string,
    password: string,
    otp_code: string
}

export interface IChangePassword {
    id: number;
    password: string;
    old_password: string;
}

export interface IRegisterWithCard {
    membershipNumber: string,
    offerDiscount: number,
    limitOffer: number,
    limitType: string,
    expiredDate: string,
    membershipId: number,
    customerName: string,
    phone: string,
    dob: string,
    type: string;
    password: string;
}

export interface ICardInformation extends Omit<IRegisterWithCard, 'password'> {
    membership_id: number;
}

export interface IPersanlChange {
    id: number;
    name: string;
    dob: string;
    gender: string;
}

export interface IDeleteAccount extends Omit<ISigninCard, 'card_number'> { }

export interface IAvartar {
    id: number;
    image: string;
    filename: string;
}