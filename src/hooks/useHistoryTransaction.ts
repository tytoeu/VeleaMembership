import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assets } from '../../assets';
import { useAppSelector } from '.';

const apiConfig = assets.config
const STALE_TIME = 1000 * 60 * 5 // 5mn

const useHistoryTransaction = (type?: string) => {
    const { auth } = useAppSelector((state) => state.cache);

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const fetcHistory = async ({ id, type, page = 1 }: { id?: number; type?: string; page?: number }) => {
        const url = `${apiConfig.api}transaction-history?membership_id=${id ?? ""}&type=${type ?? ""}&page=${page}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    // Infinite Query for Pagination
    const infiniteQuery = useInfiniteQuery({
        initialPageParam: 1,
        staleTime: STALE_TIME,
        queryKey: ['history-transaction', auth?.id, type],
        queryFn: async ({ pageParam = 1 }) => await fetcHistory({ id: auth?.id, type, page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage?.data?.length === 0) ? undefined : allPages?.length + 1)
    });

    return {
        infiniteQuery
    };
};

export default useHistoryTransaction;
