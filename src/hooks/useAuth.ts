import { useMutation } from "@tanstack/react-query";
import { ISignin } from "./interface/ISignin";
import { assets } from "../../assets";
import { Alert } from "react-native";
import { loginAction } from "../redux/cache";
import { useAppDispatch } from ".";

const appConfig = assets.config

const headerOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': ''
};

const signin = async (auth: ISignin) => {
    const url = `${appConfig.api}login`;

    const response = await fetch(url, {
        method: 'POST',
        headers: headerOptions,
        body: JSON.stringify(auth)
    });

    return response.json();
};

const useAuth = () => {
    const dispatch = useAppDispatch()

    // Mutation for Creating a Post
    const signinMutation = useMutation({
        mutationFn: signin,
        onSuccess: (data) => {
            if (data.success === 1) {
                const user = {
                    access_token: data.access_token,
                    name: data.user.name,
                    email: data.user.email,
                    id: data.user.id,
                }
                dispatch(loginAction(user));
            } else {
                Alert.alert('Warning', data.message);
            }
        },
        onError: (error) => {
            Alert.alert('Error', 'Something went wrong! ' + error?.message);
        }
    });

    return { signinMutation };
};

export default useAuth;