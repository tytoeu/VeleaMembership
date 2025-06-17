import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useAppSelector } from ".";
import { assets } from "../../assets";
import { Alert } from "react-native";
import { IDashboard, IOnboard } from "./interface/IDashboard";
const appConfig = assets.config
const STALE_TIME = 1000 * 60 * 5 // 5mn



const useDashbaord = () => {
    const { auth } = useAppSelector(state => state.cache)

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };
    const headerOptionNonAuth = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ``
    };

    const fetchMemberInfo = async () => {
        const url = `${appConfig.api}fetch-dashboard?membership_id=${auth?.id}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        const result = await response.json();
        return result as IDashboard;
    };

    const fetchOnboarding = async () => {
        const url = `${appConfig.api}onboard`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        const data = await response.json();
        const onboard: IOnboard[] = data.onboard
        return onboard
    }

    const fetchPromotion = async ({ page = 1 }: { page?: number }) => {
        const url = `${appConfig.api}fetch-promotion?page=${page}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const fetchNotification = async ({ page = 1 }: { page?: number }) => {
        const url = `${appConfig.api}member/fetch-notify/${auth?.id}?page=${page}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const fetchGeneralNotification = async ({ page = 1 }: { page?: number }) => {
        const url = `${appConfig.api}notify-general?page=${page}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptionNonAuth });
        return await response.json();
    };

    const fetchMemberInfoMutation = useMutation({
        mutationFn: fetchMemberInfo,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    })

    const onboard = useMutation({
        mutationFn: fetchOnboarding,
        onError: error => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    })

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['promotion'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchPromotion({ page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage?.data?.length === 0) ? undefined : allPages.length + 1),
        staleTime: STALE_TIME
    });
    const notificationInfiniteQuery = useInfiniteQuery({
        queryKey: ['fetch-notification'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchNotification({ page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage?.length === 0) ? undefined : allPages.length + 1)
    });

    const generalNotificationInfiniteQuery = useInfiniteQuery({
        queryKey: ['general-notification'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchGeneralNotification({ page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage?.data.length === 0) ? undefined : allPages.length + 1)
    });

    return {
        fetchMemberInfoMutation,
        infiniteQuery, onboard,
        notificationInfiniteQuery,
        generalNotificationInfiniteQuery
    }
}

export default useDashbaord