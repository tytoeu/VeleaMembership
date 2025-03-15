export const formatNumber = (value: string) => {
    new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parseFloat(value));
}

export const formCurrent = (numberString: string) => {
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}