import { Product } from "../../model/product";
import { ProductsActions } from "./products.actions";

export interface ProductsState {
    products: Product[];
    pending: boolean;
    error: string | null;
    activeItem: Partial<Product> | null;
}

export const initialState = { products: [], pending: false, error: null, activeItem: null };

export function productsReducer(state: ProductsState, action: ProductsActions) {

    const { type, payload } = action;
    switch (type) {
        case 'productsGetSuccess':
            return { ...state, error: null, pending: false, products: payload };
        case 'productDeleteSuccess':
            return { ...state, products: state.products.filter(item => item.id !== payload), error: null, pending: false, activeItem: null, };
        case 'productAddSuccess':
            return { ...state, products: [...state.products, payload], activeItem: null, error: null, pending: false };
        case 'productEditSuccess':
            return { ...state, products: state.products.map(item => item.id === payload.id ? payload : item), error: null, pending: false };
        case 'productSetActive':
            return { ...state, activeItem: payload };
        case 'pending':
            return { ...state, pending: payload, error: null };
        case 'error':
            return { ...state, error: payload, pending: false };
    }
    return state;
}

