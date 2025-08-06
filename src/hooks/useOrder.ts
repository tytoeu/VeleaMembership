import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppSelector } from ".";
import { assets } from "../../assets";
import { IItemInCart, IOrderMaster, ISummery } from "./interface/IMenu"
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { IVoucherDiscount } from "./interface/IItem";
import { ToastMessage } from "../components/ToastMessage";

const STALE_TIME = 1000 * 60 * 5 // 5mn
const appConfig = assets.config

const useOrder = (data: IItemInCart[]) => {
    const { auth } = useAppSelector(state => state.cache)
    const { addressSeleted } = useAppSelector((state) => state.temp)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [voucherDiscount, setVoucherDiscount] = useState<IVoucherDiscount | null>(null)

    const headerOptions = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.access_token!}`
    };

    const subTotal = () => (data.reduce((total, item) => (total + item.total), 0))

    const grandTotal = (data: ISummery): number => {
        const totalSub = subTotal()

        if (!data) return totalSub

        const tax = data.tax;
        const deliveryFee = data.shipfee

        return (tax + deliveryFee + totalSub) - discountAmount;
    }

    const subTotalItemNotDiscount = (): number => {
        return data.reduce((total, item) => {
            // If itemDisType is not 'None', skip this item
            if (item.itemDisType !== 'None') {
                return total;
            }
            // Ensure amount is defined before adding to total
            const price = item.total || 0;
            return total + price;
        }, 0);
    }

    const calculateTotalDiscountPrice = (): number => {
        return data.reduce((total, item) => {
            // If itemDisType is not 'Promotion', skip this item
            if (item.itemDisType === 'Promotion') {
                return total;
            }
            // Ensure amount is defined before adding to total
            const price = item.total || 0;
            return total + price;
        }, 0);
    };

    const calculateTotalPromotion = (): number => {
        return data.reduce((total, item) => {
            // If itemDisType is not 'Discount', skip this item
            if (item.itemDisType === 'Discount') {
                return total;
            }

            // Ensure amount is defined before adding to total
            const price = item.total || 0;
            return total + price;
        }, 0);
    };

    const culculateDiscount = (voucherDiscount: IVoucherDiscount | null) => {
        setVoucherDiscount(null)
        // set variable
        const subTotalNotDiscount = subTotalItemNotDiscount()
        const dicountType = voucherDiscount?.voucherType || ''
        const applyType = voucherDiscount?.applyType || ''
        const maxDiscount = voucherDiscount?.max_Discount || 0
        const minAmount = voucherDiscount?.min_Amount || 0
        const discountOffer = voucherDiscount?.voucherOffer || 0
        const isPromotion = voucherDiscount?.includePromotion || 0
        const isDiscount = voucherDiscount?.includeDiscount || 0
        let discount = 0

        //condition
        if (applyType == 'Coupon') {
            if (subTotalNotDiscount >= minAmount) {
                if (dicountType == 'Amount') {
                    if (discountOffer > subTotalNotDiscount) {
                        discount = subTotalNotDiscount
                    } else {
                        discount = discountOffer
                    }
                }
                else if (dicountType == 'Percent') {
                    discount = (subTotalNotDiscount * discountOffer) / 100

                    if (discount >= maxDiscount && maxDiscount !== 0) discount = maxDiscount
                }
                setVoucherDiscount(voucherDiscount)
            }
            else {
                const forDiscount = minAmount - subTotalNotDiscount
                ToastMessage(`Sorry your sub total not enought for apply discount! Please add ${forDiscount}$ more or grater then to get discount.`)
            }
        } else if (applyType === 'Manual') {
            // disType: Amount
            if (dicountType == 'Amount') {
                // subTotal - disRate
                discount = discountOffer
            }
            else if (dicountType == 'Percent') {

                // Discount=true and promotion = true
                if (isPromotion && isDiscount) {
                    // subtotal include promotion and discount item
                    const subTotalItem = subTotal()

                    // subTotal - (subtotal- disCountRate/100)
                    discount = (subTotalItem * discountOffer) / 100
                }

                // Discount=true and promotion = false
                else if (!isPromotion && isDiscount) {
                    // subTotal include discount and not promotion
                    const subTotalItem = calculateTotalDiscountPrice()

                    // subTotal  * (disCountRate / 100)
                    discount = (subTotalItem * discountOffer) / 100
                }

                // Discount=false and promotion = true
                else if (isPromotion && !isDiscount) {
                    // subTotal include not discount and promotion
                    const subTotalItem = calculateTotalPromotion()

                    // subTotal  * (disCountRate / 100)
                    discount = (subTotalItem * discountOffer) / 100
                }
                else {
                    // subTotal none item discount and promotion
                    const subTotalItem = subTotalItemNotDiscount()

                    // subTotal  * (disCountRate / 100)
                    discount = (subTotalItem * discountOffer) / 100
                }
            }
            setVoucherDiscount(voucherDiscount)
        }

        setDiscountAmount(discount)
    }

    const fetchSummery = async ({ addressId }: { addressId: number }) => {
        const url = `${appConfig.api}order/get-summary?addressId=${addressId}&membershipId=${auth?.id}&subTotal=${subTotal().toFixed(2)}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const scanVoucher = async ({ voucherCode, applyType }: { voucherCode: string, applyType: string }) => {
        const url = `${appConfig.api}order/scan-voucher?voucherCode=${voucherCode}&applyType=${applyType}`;
        const response = await fetch(url, { method: 'GET', headers: headerOptions });
        return await response.json();
    };

    const placedOrder = async (data: IOrderMaster) => {
        //order/placed-order
        const url = `${appConfig.api}order/placed-order`;
        const response = await fetch(url, { method: 'POST', headers: headerOptions, body: JSON.stringify(data) });
        return response.json();
    }

    const summeryCartInfiniteQuery = useQuery({
        queryKey: ['fetch-summery', addressSeleted?.addressId],
        queryFn: () => fetchSummery({ addressId: addressSeleted?.addressId! }),
        staleTime: STALE_TIME,
        enabled: !!addressSeleted?.addressId
    });
    const scanVoucherMutation = useMutation({
        mutationFn: scanVoucher,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });
    const placeOrderMutation = useMutation({
        mutationFn: placedOrder,
        onError: (error) => Alert.alert('Error', 'Something went wrong! ' + error?.message)
    });

    return {
        subTotal,
        summeryCartInfiniteQuery,
        grandTotal,
        discountAmount,
        scanVoucherMutation,
        culculateDiscount,
        voucherDiscount,
        placeOrderMutation
    }
}

export default useOrder