import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { assets } from "../../assets";
import { useAppSelector } from ".";

const apiConfig = assets.config
const STALE_TIME = 1000 * 60 * 5 // 5mn

const useMenu = () => {
    const queryClient = useQueryClient();
    const { auth } = useAppSelector((state) => state.cache);
    const { cateId, subCateId } = useAppSelector(state => state.menu)

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const fetchMenu = async ({ cateId, subId, page = 1 }: { cateId?: string; subId?: string; page?: number }) => {
        const url = `${apiConfig.api}fetch-menu-list?cateId=${cateId ?? ""}&subId=${subId ?? ""}&page=${page}&search=`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const fetchCategory = async () => {
        const url = `${apiConfig.api}fetch-cate-list`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const fetchSubCategory = async (cateId?: string) => {
        if (!cateId) return [];
        const url = `${apiConfig.api}fetch-sub-list?cateId=${cateId}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['menu', cateId, subCateId],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchMenu({ cateId: cateId, subId: subCateId, page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage?.response?.data?.length === 0) ? undefined : allPages.length + 1),
        staleTime: STALE_TIME
    });

    const categoryQuery = useQuery({
        queryKey: ["category"],
        queryFn: fetchCategory,
        staleTime: STALE_TIME
    });

    const subCategoryQuery = useQuery({
        queryKey: ["subcategory", cateId],
        queryFn: () => fetchSubCategory(cateId),
        staleTime: STALE_TIME,
        enabled: !!cateId
    });

    const setSelectedCategory = (categoryId: string) => {
        queryClient.removeQueries({ queryKey: ['menu'] });
        queryClient.invalidateQueries({ queryKey: ['subcategory'] });
    };

    return { infiniteQuery, categoryQuery, subCategoryQuery };
};

export default useMenu;
