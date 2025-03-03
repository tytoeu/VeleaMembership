import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { assets } from "../../assets";
import { useAppSelector } from ".";

const apiConfig = assets.config

const useMenu = () => {
    const queryClient = useQueryClient();
    const { auth } = useAppSelector((state) => state.cache)
    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const fetchMenu = async (page: number = 1) => {
        const url = `${apiConfig.api}fetch-menu-list?cateId=3&cateId=&subId=&page=${page}&search=`;

        const response = await fetch(url, {
            method: 'GET',
            headers: headerOptions
        });
        return await response.json();
    };

    // Infinite Query for Pagination
    const infiniteQuery = useInfiniteQuery({
        queryKey: ['menu'],
        queryFn: async ({ pageParam = 1 }) => await fetchMenu(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length === 0) return undefined;
            return allPages.length + 1;
        }
    });

    return { infiniteQuery };
};

export default useMenu;