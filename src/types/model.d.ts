export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string | string[];
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        results: T[]
    }

    interface IRegister {
        _id: string;
        // access_token: string;
    }

    interface IUserLogin {
        user: {
            email: string;
            _id: string;
            name: string;
            role: string;
            address: any;
            avatar: string;
            phone: string;
        };
        access_token: string;
    }

    interface ITopRestaurant {
        _id: string;
        name: string;
        phone: string;
        address: string;
        email: string;
        rating: number;
        image: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IRestaurant {
        _id: string;
        name: string;
        phone: string;
        address: string;
        email: string;
        rating: number;
        image: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;

        menu: IMenu[];
        isLike: boolean;
    }

    interface IMenu {
        _id: string;
        restaurant: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        menuItem: IMenuItem[]
    }

    interface IMenuItem {
        _id: string;
        menu: string;
        title: string;
        description: string;
        basePrice: number,
        image: string;
        options: {
            title: string;
            description: string;
            additionalPrice: number;
        }[],
        createdAt: Date;
        updatedAt: Date;
    }

    interface ICart {
        [key: string]: {
            sum: number;
            quantity: number;
            items: {
                [key: string]: {
                    quantity: number;
                    data: IMenuItem;
                    extra?: {
                        [key: string]: number;
                    }
                }
            }
        }
    }

    // cart: {
    //     "id-cua-hang-1": {
    //         sum: 123,
    //         quantity: 10,
    //         items: {
    //             "san-pham-1": {
    //                 quantity: 2,
    //                 data: {},
    //                 extra: {
    //                    "size L":  1,
    //                    "size M":  1
    //                 }
    //             }
    //         }
    //     }
    // }

    interface IOrderHistory {
        _id: string;
        restaurant: IRestaurant;
        user: string;
        status: string;
        totalPrice: number;
        totalQuantity: number;
        orderTime: Date;
        detail: {
            image: string;
            title: string;
            option: string;
            price: number;
            quantity: number;
        }[]
        createdAt: Date;
        updatedAt: Date;
    }

}
