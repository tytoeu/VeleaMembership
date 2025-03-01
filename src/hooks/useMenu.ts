import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { assets } from "../../assets";

const apiConfig = assets.config

const headerOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': apiConfig.token
};

const fetchMenu = async (page: number = 1) => {
    const url = `https://jsonplaceholder.typicode.com/photos?_page=${page}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: headerOptions
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};

const useMenu = () => {
    const queryClient = useQueryClient();

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