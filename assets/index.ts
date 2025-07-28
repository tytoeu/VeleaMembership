export const assets = {
    logo: {
        login: require('./logo/velea_gastropub.png')
    },
    img: {
        loading: require('./img/loading.png'),
        profile: require('./img/profile.jpg'),
        emptyCart: require('./img/empty-cart.png'),
        deliveryMan: require('./img/delivery-man.png'),
        pin: require('./img/pin.png'),
        discount: require('./img/discount.png'),
        orderSuccess: require('./img/order-success.png'),
    },
    // for production
    // config: {
    //     api: 'https://velea.asia/api/v1/',
    //     imagePath: 'http://pos.velea.asia/uploads/',
    //     token: 'Basic TWVtYmVydmVsZWEwNDA2MjVwQGdtYWlsLmNvbTpNYnZwQDA0MDYyNQ==',
    //     prxxy: 'https://velea.asia/image-proxy?url=',
    // },
    // for development
    config: {
        api: 'http://172.31.122.126/menu-degital/public/api/v1/',
        imagePath: 'http://pos.velea.asia/uploads/',
        token: 'Basic TWVtYmVydmVsZWEwNDA2MjVwQGdtYWlsLmNvbTpNYnZwQDA0MDYyNQ==',
        prxxy: 'https://velea.asia/image-proxy?url='
    }
}