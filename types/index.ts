export interface IUser {
    uid: string;
    email: string | null;
    displayName: string | null;
}

export interface ICategory {
    id: string;
    name: string;
    slug: string;
    icon?: string;
    subCategories?: ICategory[];
}

export interface IAd {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: 'TL' | 'USD' | 'EUR';
    categoryId: string;
    sellerId: string;
    images: string[];
    location: string;
    date: any; 
    status: 'active' | 'sold' | 'inactive';
    brand?: string | null;
    series?: string | null;
    model?: string | null;
    year?: string | null;
    km?: string | null;
    fuelType?: string | null;
    power?: string | null;
    gear?: string | null;
    color?: string | null;
    fromWho?: string | null;
    sellerName?: string;
    sellerPhone?: string;
    paramGuvende?: boolean;
    features?: string[];
    [key: string]: any; 
}

export interface IFavorite {
    id: string; 
    adId: string;
    addedAt: any;
}

export interface IOrder {
    id?: string;
    productId: string;
    productTitle: string;
    price: number;
    serviceFee: number;
    totalAmount: number;
    buyerEmail?: string;
    buyerId?: string;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: any;
}
