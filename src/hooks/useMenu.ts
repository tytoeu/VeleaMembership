import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { assets } from "../../assets";
import { useAppSelector } from ".";
import { useState } from "react";

const apiConfig = assets.config

const useMenu = () => {
    const queryClient = useQueryClient();
    const { auth } = useAppSelector((state) => state.cache);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>('');

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const fetchMenu = async ({ cateId, subId, page = 1 }: { cateId?: string; subId?: string; page?: number }) => {
        const url = `${apiConfig.api}fetch-menu-list?cateId=${cateId ?? ""}&subId=${subId ?? ""}&page=${page}&search=`;
        console.log(url)
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
        queryKey: ['menu', selectedCategoryId, selectedSubCategoryId],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchMenu({ cateId: selectedCategoryId, subId: selectedSubCategoryId, page: pageParam }),
        getNextPageParam: (lastPage, allPages) => ((!lastPage || lastPage.length === 0) ? undefined : allPages.length + 1),
        staleTime: 1000 * 60 * 5,
    });

    const categoryQuery = useQuery({
        queryKey: ["category"],
        queryFn: fetchCategory,
        staleTime: 1000 * 60 * 5
    });

    const subCategoryQuery = useQuery({
        queryKey: ["subcategory", selectedCategoryId],
        queryFn: () => fetchSubCategory(selectedCategoryId),
        staleTime: 1000 * 60 * 5,
        enabled: !!selectedCategoryId
    });

    const setSelectedCategory = (categoryId: string) => {
        queryClient.removeQueries({ queryKey: ['menu'] });
        queryClient.invalidateQueries({ queryKey: ['subcategory'] });
    };

    return {
        infiniteQuery,
        categoryQuery,
        subCategoryQuery,
        setSelectedCategoryId,
        setSelectedSubCategoryId,
        setSelectedCategory,
        selectedCategoryId,
        selectedSubCategoryId
    };
};

export default useMenu;
