import { Alert } from 'react-native'
import { assets } from '../../assets';
import { useAppSelector } from '.';
import { IAddress } from './interface/IAddress';
import { useMutation, useQuery } from '@tanstack/react-query';

const apiConfig = assets.config

const useAddress = () => {

    const { auth } = useAppSelector((state) => state.cache);

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const postAddress = async (data: IAddress) => {
        const url = `${apiConfig.api}create-location`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(data) });
        return response.json();
    }

    const updateDefaultAddress = async (data: { addressId: number }) => {
        const url = `${apiConfig.api}update-default-location`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(data) });
        return response.json();
    }

    const fetchLabelLocation = async () => {
        const url = `${apiConfig.api}get-label-location`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const fetchLocation = async () => {
        const url = `${apiConfig.api}get-location?id=${auth?.id}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const postAddressMutation = useMutation({
        mutationFn: postAddress,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const updateDefaultAddressMutation = useMutation({
        mutationFn: updateDefaultAddress,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    const fetchLabelLocationInfiniteQuery = useQuery({ queryKey: ['fetch-label-location'], queryFn: fetchLabelLocation });

    const fetchLocationInfiniteQuery = useQuery({ queryKey: ['fetch-location'], queryFn: fetchLocation });

    return {
        postAddressMutation,
        updateDefaultAddressMutation,
        fetchLabelLocationInfiniteQuery,
        fetchLocationInfiniteQuery
    }
}

export default useAddress