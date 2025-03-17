import { Product } from "../../model/product";
import { ProductsActions } from "./products.actions";

/**
 * **ProductsState** rappresenta lo stato globale dei prodotti.
 * - `products`: Array di prodotti disponibili.
 * - `pending`: Booleano che indica se un'operazione è in corso.
 * - `error`: Messaggio di errore in caso di fallimento di un'operazione.
 * - `activeItem`: Prodotto attualmente selezionato.
 */
export interface ProductsState {
    products: Product[];
    pending: boolean;
    error: string | null;
    activeItem: Partial<Product> | null;
}

// Stato iniziale dell'applicazione per la gestione dei prodotti
export const initialState = { products: [], pending: false, error: null, activeItem: null };

/**
 * **productsReducer** gestisce le azioni relative ai prodotti e aggiorna lo stato di conseguenza.
 * Utilizza il pattern **Reducer** per mantenere lo stato centralizzato e scalabile.
 *
 * **Vantaggi:**
 * - Separazione della logica di gestione dello stato dalla UI.
 * - Predicibilità: ogni azione ha un effetto chiaro e prevedibile sullo stato.
 * - Scalabilità: facile aggiungere nuove azioni senza modificare la logica esistente.
 */
export function productsReducer(state: ProductsState, action: ProductsActions) {
    const { type, payload } = action;

    switch (type) {
        /**
         * Quando i prodotti vengono caricati con successo,
         * aggiorna lo stato con i nuovi dati e rimuove eventuali errori.
         */
        case 'productsGetSuccess':
            return { ...state, error: null, pending: false, products: payload };

        /**
         * Quando un prodotto viene eliminato con successo,
         * rimuove l'elemento dall'array dei prodotti.
         */
        case 'productDeleteSuccess':
            return {
                ...state,
                products: state.products.filter(item => item.id !== payload),
                error: null,
                pending: false,
                activeItem: null,
            };

        /**
         * Quando un nuovo prodotto viene aggiunto con successo,
         * lo aggiunge alla lista e resetta l'elemento attivo.
         */
        case 'productAddSuccess':
            return {
                ...state,
                products: [...state.products, payload],
                activeItem: null,
                error: null,
                pending: false
            };

        /**
         * Quando un prodotto viene modificato,
         * aggiorna l'elemento corrispondente nella lista.
         */
        case 'productEditSuccess':
            return {
                ...state,
                products: state.products.map(item => item.id === payload.id ? payload : item),
                error: null,
                pending: false
            };

        /**
         * Imposta un prodotto come "attivo", utile per la modifica o la visualizzazione dettagliata.
         */
        case 'productSetActive':
            return { ...state, activeItem: payload };

        /**
         * Imposta lo stato in "pending" per indicare un'operazione in corso.
         */
        case 'pending':
            return { ...state, pending: payload, error: null };

        /**
         * Gestisce gli errori aggiornando lo stato con un messaggio di errore.
         */
        case 'error':
            return { ...state, error: payload, pending: false };
    }

    // Se l'azione non è riconosciuta, restituisce lo stato corrente senza modifiche.
    return state;
}
