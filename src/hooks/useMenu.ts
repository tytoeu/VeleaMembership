import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assets } from "../../assets";
import { useAppSelector } from ".";
import { IItemAdd, IItemInCart, IItemInCartUpdate } from "./interface/IMenu";
import { Alert } from "react-native";
import { IMethodPayment } from "./interface/IItem";

const apiConfig = assets.config
const STALE_TIME = 1000 * 60 * 5 // 5mn

const useMenu = () => {
    const queryClient = useQueryClient();
    const { auth } = useAppSelector((state) => state.cache);
    const { cateId, subCateId, search } = useAppSelector(state => state.menu)

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const headerOptionNonAuth = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': apiConfig.token
    };

    const fetchMenu = async ({ cateId, subId, page = 1, search }: { cateId?: number; subId?: number; page?: number, search: string | null }) => {
        const url = `${apiConfig.api}fetch-menu-list?cateId=${cateId}&subId=${subId}&page=${page}&search=${search}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptionNonAuth });
        return await response.json();
    };

    const fetchCategory = async () => {
        const url = `${apiConfig.api}fetch-cate-list`;
        const response = await fetch(url, { method: 'GET', headers: headerOptionNonAuth });
        return await response.json();
    };

    const fetchSubCategory = async (cateId?: number) => {
        if (!cateId) return [];
        const url = `${apiConfig.api}fetch-sub-list?cateId=${cateId}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptionNonAuth });
        return await response.json();
    };

    const postAddToCart = async (data: IItemAdd) => {
        const url = `${apiConfig.api}add-to-cart`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(data) });
        return response.json();
    }

    const listCart = async () => {
        const url = `${apiConfig.api}get-item-cart?id=${auth?.id}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        const data: IItemInCart[] = await response.json();
        return data
    }
    const methodPayment = async (id: number) => {
        const url = `${apiConfig.api}order/method-payment`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        const data: IMethodPayment[] = await response.json();
        return data
    }

    const updateQuality = async (data: IItemInCartUpdate) => {
        const url = `${apiConfig.api}item-item-qty`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(data) });
        return response.json();
    }

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['menu', cateId, subCateId, search],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => await fetchMenu({ cateId: cateId, subId: subCateId, page: pageParam, search }),
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

    const postAddToCartMutation = useMutation({
        mutationFn: postAddToCart,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });
    const listCartInfiniteQuery = useQuery({ queryKey: ['list-to-cart'], queryFn: listCart });

    const updateQualityMutation = useMutation({
        mutationFn: updateQuality,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });
    const methodPaymentMutation = useMutation({
        mutationFn: methodPayment,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    return {
        infiniteQuery,
        categoryQuery,
        subCategoryQuery,
        updateQuality,
        listCartInfiniteQuery,
        postAddToCartMutation,
        updateQualityMutation,
        methodPaymentMutation
    };
};

export default useMenu;
