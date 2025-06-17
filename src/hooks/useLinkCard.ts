import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from ".";
import { assets } from "../../assets";
import { ICard } from "./interface/ILink";
import { Alert } from "react-native";
import { ICardInformation } from "./interface/ISignin";

const appConfig = assets.config

const useLinkCard = () => {
    const { auth } = useAppSelector(state => state.cache)
    const { tempAuth } = useAppSelector(state => state.temp)

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const linkCard = async (cardDAta: ICardInformation) => {
        const url = `${appConfig.api}membership-card/create`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(cardDAta) });
        return response.json();
    };

    const checkMamberCardInfor = async (card_number: string) => {
        const url = `${appConfig.api}membership-card/get-infor?card_number=${card_number}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return response.json();
    }
    const verifyInforCard = async (card_number: string) => {
        const url = `${appConfig.api}verify-infor-card?card_number=${card_number}&phone_number=${tempAuth?.phone}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return response.json();
    }
    const checkCardInfoMutation = useMutation({
        mutationFn: checkMamberCardInfor,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });
    const verifyInforCardMutation = useMutation({
        mutationFn: verifyInforCard,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const linkCardMutation = useMutation({
        mutationFn: linkCard,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    return { linkCardMutation, checkCardInfoMutation, verifyInforCardMutation }
}

export default useLinkCard