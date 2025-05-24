export interface ISignin {
    phone_number: string;
    password: string
}

export interface IUser {
    id: number;
    full_name: string;
    phone_number: string;
    access_token: string;
    dob: string;
    password: string;
    avatar: string;
}

export interface OTP {
    phone_number: string,
    device_id: string,
    calling_code: string,
    verify_date: string
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