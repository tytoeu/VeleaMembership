import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useAppSelector } from '.';
import { assets } from '../../assets';
import { Alert } from 'react-native';
import { IChangeData } from './interface/IItem';

const appConfig = assets.config

const useRedeem = () => {

    const { auth } = useAppSelector(state => state.cache)

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const fetchRedeemItems = async ({ page = 1 }: { page: number }) => {
        const url = `${appConfig.api}redeem-point/fetch?id=${auth?.id}&page=${page}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const fetchUserItems = async ({ page = 1 }: { page: number }) => {
        const url = `${appConfig.api}redeem-point/user-items?id=${auth?.id}&page=${page}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const fetchUsedItems = async ({ page = 1 }: { page: number }) => {
        const url = `${appConfig.api}redeem-point/used-items?id=${auth?.id}&page=${page}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const changeRedeemItem = async (data: IChangeData) => {
        const url = `${appConfig.api}redeem-point/change`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(data) });
        return response.json();
    };

    const redeemItemsInfiniteQuery = useInfiniteQuery({
        queryKey: ['redeemItems'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchRedeemItems({ page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage?.data?.length === 0) ? undefined : allPages.length + 1)
    });

    const userItemsInfiniteQuery = useInfiniteQuery({
        queryKey: ['userItems'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchUserItems({ page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage?.length === 0) ? undefined : allPages.length + 1)
    });

    const usedItemsInfiniteQuery = useInfiniteQuery({
        queryKey: ['fetchUsedItems'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchUsedItems({ page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage?.length === 0) ? undefined : allPages.length + 1)
    });

    const changeRedeemItemMutation = useMutation({
        mutationFn: changeRedeemItem,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    return { redeemItemsInfiniteQuery, changeRedeemItemMutation, userItemsInfiniteQuery, usedItemsInfiniteQuery }
}

export default useRedeem