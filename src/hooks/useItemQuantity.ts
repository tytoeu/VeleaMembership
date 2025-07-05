import { useCallback, useMemo, useState } from 'react';
import { ItemPrices } from './interface/IMenu';

export function useItemQuantity(itemPrices: ItemPrices[]) {
    /** --- 1. Core state --- */
    const [qty, setQty] = useState(1);
    const [selectedPrice, setSelectedPrice] = useState(
        () => itemPrices[0]         // default to first size
    );

    /** --- 2. Actions --- */
    const increment = useCallback(() => setQty(q => q + 1), []);
    const decrement = useCallback(() => setQty(q => Math.max(1, q - 1)), []);

    /** Choose a new size & price */
    const selectSize = useCallback(
        (id: number) => {
            const opt = itemPrices.find(p => p.id === id);
            if (opt) setSelectedPrice(opt);      // silently ignore bad ids
        },
        [itemPrices]
    );

    /** --- 3. Derived data --- */
    const total = useMemo(
        () => Number((qty * selectedPrice.priceAfterDis).toFixed(2)),
        [qty, selectedPrice]
    );

    /** --- 4. API surface --- */
    return { qty, total, increment, decrement, selectSize, selectedPrice };
}
