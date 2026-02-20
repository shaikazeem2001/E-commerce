export interface Product {
    id: number;
    name: string;
    category: 'men' | 'women' | 'kids';
    image: string;
    new_price: number;
    old_price: number;
}

export interface CartItems {
    [key: number]: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
}

export interface AuthResponse {
    success: boolean;
    user?: User;
    error?: string;
}
