import { create } from "zustand";
import { CartItem } from "../../model/cart-item";
import { Product } from "../../model/product";

/**
 * **useCart** è uno store Zustand per gestire lo stato del carrello.
 * 
 * **Vantaggi di Zustand:**
 * - Più leggero e semplice rispetto a Redux.
 * - Consente di centralizzare la gestione dello stato senza passare props tra componenti.
 * - Supporta metodi di modifica dello stato in modo intuitivo.
 */

export interface CartState {
    list: CartItem[]; // Lista degli oggetti nel carrello
    addToCart: (product: Product) => void; // Aggiunge un prodotto al carrello
    removeFromCart: (productId: string) => void; // Rimuove un prodotto dal carrello
    increaseQty: (productId: string) => void; // Aumenta la quantità di un prodotto
    decreaseQty: (productId: string) => void; // Diminuisce la quantità di un prodotto
    clearCart: () => void; // Svuota il carrello
}

export const useCart = create<CartState>((set, get) => ({
    list: [], // Carrello inizialmente vuoto

    /**
     * Aggiunge un prodotto al carrello.
     * - Se il prodotto esiste già, aumenta la quantità.
     * - Altrimenti, lo aggiunge come nuovo elemento con quantità 1.
     */
    addToCart: (product: Product) => {
        const found = get().list.find(item => item.product.id === product.id);
        if (found) {
            get().increaseQty(product.id);
        } else {
            const item: CartItem = { product, qty: 1 };
            set({ list: [...get().list, item] });
        }
    },

    /**
     * Rimuove un prodotto completamente dal carrello.
     */
    removeFromCart: (productId: string) => {
        set(state => ({ list: state.list.filter(item => item.product.id !== productId) }));
    },

    /**
     * Aumenta la quantità di un prodotto nel carrello.
     */
    increaseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId);
        if (found) {
            found.qty++;
            set(state => ({
                list: state.list.map(item => item.product.id === found.product.id ? found : item)
            }));
        }
    },

    /**
     * Diminuisce la quantità di un prodotto nel carrello.
     * - Se la quantità arriva a 0, il prodotto viene rimosso.
     */
    decreaseQty: (productId: string) => {
        const found = get().list.find(item => item.product.id === productId);
        if (found?.qty === 1) {
            get().removeFromCart(productId);
        } else if (found && found.qty > 0) {
            found.qty--;
            set(state => ({
                list: state.list.map(item => item.product.id === found.product.id ? found : item)
            }));
        }
    },

    /**
     * Svuota completamente il carrello.
     */
    clearCart: () => {
        set({ list: [] });
    }
}));
