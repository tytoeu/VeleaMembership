import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useAppSelector } from ".";
import { assets } from "../../assets";
import { Alert, Image } from "react-native";
import { IMembership, IOnboard } from "./interface/IDashboard";
const appConfig = assets.config
const STALE_TIME = 1000 * 60 * 5 // 5mn



const useDashbaord = () => {
    const { auth } = useAppSelector(state => state.cache)

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const fetchMemberInfo = async () => {
        const url = `${appConfig.api}fetch-dashboard?membership_id=${auth?.id}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        const result = await response.json();
        return result?.user as IMembership;
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

    return {
        fetchMemberInfoMutation,
        infiniteQuery, onboard
    }
}

export default useDashbaord