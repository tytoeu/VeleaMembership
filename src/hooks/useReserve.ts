import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from ".";
import { assets } from "../../assets";
import { IBooking, IBookingCancel } from "./interface/IBooking";
import { Alert } from "react-native";

const appConfig = assets.config
const useReserve = () => {
    const { auth } = useAppSelector(state => state.cache)
    const { tempAuth } = useAppSelector(state => state.temp)

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const fetchTags = async () => {
        const url = `${appConfig.api}booking-tags`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };
    const fetchBooking = async () => {
        const url = `${appConfig.api}fetch-booking?phone=${tempAuth?.phone}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const postBooking = async (booking: IBooking) => {
        const url = `${appConfig.api}booking-online`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(booking) });
        return await response.json();
    };

    const cancelBooking = async (booking: IBookingCancel) => {
        const url = `${appConfig.api}booking-cancel`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(booking) });
        return await response.json();
    };

    const tagUseQuery = useQuery({ queryKey: ['tags'], queryFn: fetchTags });

    const postBookingMutation = useMutation({
        mutationFn: postBooking,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });
    const cancelBookingMutation = useMutation({
        mutationFn: cancelBooking,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const usedItemsInfiniteQuery = useQuery({ queryKey: ['fetch-booking'], queryFn: fetchBooking });

    return { tagUseQuery, postBookingMutation, usedItemsInfiniteQuery, cancelBookingMutation }
}

export default useReserve