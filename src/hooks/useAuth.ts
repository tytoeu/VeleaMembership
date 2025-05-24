import { useMutation } from "@tanstack/react-query";
import { IChangePassword, IResetPassword, ISignin, ISignup, IVerifyOtp, OTP } from "./interface/ISignin";
import { assets } from "../../assets";
import { Alert } from "react-native";
import { useAppSelector } from ".";

const appConfig = assets.config

const headerOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': ''
};

const useAuth = () => {

    const { auth } = useAppSelector(state => state.cache)

    const headerOptionsAuth = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const signin = async (auth: ISignin) => {
        const url = `${appConfig.api}login/member`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(auth) });
        return response.json();
    };
    const signup = async (auth: ISignup) => {
        const url = `${appConfig.api}register/member`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(auth) });
        return response.json();
    };

    const logout = async (_: null) => {
        const url = `${appConfig.api}logout/member`;
        const response = await fetch(url, { method: 'POST', headers: headerOptionsAuth, body: JSON.stringify(auth) });
        return response.json();
    };

    const sendOtp = async (opt: OTP) => {
        const url = `${appConfig.api}verify-otp/send`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(opt) });
        return response.json();
    }

    const verifyOtp = async (opt: IVerifyOtp) => {
        const url = `${appConfig.api}verify-otp/verify`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(opt) });
        return response.json();
    }

    const resetPasswordd = async (opt: IResetPassword) => {
        const url = `${appConfig.api}reset-password/member`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(opt) });
        return response.json();
    }
    const changePassword = async (auth: IChangePassword) => {
        const url = `${appConfig.api}member/change-password`;
        const response = await fetch(url, { method: 'POST', headers: headerOptionsAuth, body: JSON.stringify(auth) });
        return response.json();
    }

    // Mutation for 
    const signinMutation = useMutation({
        mutationFn: signin,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const sendOtpMutation = useMutation({
        mutationFn: sendOtp,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const verifyOtpMutation = useMutation({
        mutationFn: verifyOtp,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const signupMutation = useMutation({
        mutationFn: signup,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const resetPasswordMutation = useMutation({
        mutationFn: resetPasswordd,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });
    const changePasswordMutation = useMutation({
        mutationFn: changePassword,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    return {
        signinMutation,
        sendOtpMutation,
        verifyOtpMutation,
        signupMutation,
        logoutMutation,
        resetPasswordMutation,
        changePasswordMutation
    };
};

export default useAuth;