import { create } from "zustand";
import { CartItem } from "../../model/cart-item";
import { Product } from "../../model/product";

export interface CartState {
    list: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    increaseQty: (productId: string) => void;
    decreaseQty: (productId: string) => void;
    clearCart: () => void;
}

export const useCart = create<CartState>((set, get) => ({
    list: [],
    addToCart: (product: Product) => {
        const found = get().list.find(item => item.product.id === product.id)
        // se un prodotto aggiunto al carrello già esiste nel carrello, incrementa la quantità e SCRIVERE nell'array la quantità nuova recuperando la precende lista e per ogni elemento della lista che iteriamo, andiamo a restituire se stesso, ma dobbiamo anche renderizzare e lo facciamo con SET .se l'elemento esiste già lo sostituiamo con found che è il prodotto con la quantità incrementata, altrimenti con il prodotto BASE la cui quantità di default è 1

        // ABBIAMO SPOSTATO IL CONTENUTO DENTRO LA FUNZIONE INCREASEQTY DI RIGA 33
        if (found) {
            get().increaseQty(product.id)

        } else {
            const item: CartItem = { product, qty: 1 };
            set({
                list: [...get().list, item]
            })
            // set(state => ({ list: [...state.list, item] }))
        }
    },
    removeFromCart: (productId: string) => { set(state => ({ list: state.list.filter(item => item.product.id !== productId) })) },
    increaseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId);
        if (found) {
            found.qty++;
            set(state => ({
                list: state.list.map(item => {
                    return item.product.id === found.product.id ? found : item;
                })
            }))
        }
    },
    decreaseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId);
        if (found?.qty === 1) {
            get().removeFromCart(productId)
        }
        if (found && found.qty > 0) {
            found.qty--;
            set(state => ({
                list: state.list.map(item => {
                    return item.product.id === found.product.id ? found : item;
                })
            }))
        }
    },
    clearCart: () => { set({ list: [] }) }
}))