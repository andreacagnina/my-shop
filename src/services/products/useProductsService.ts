/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer } from "react";
import * as ProductsApi from "./products.api";
import { initialState, productsReducer } from "./products.reducer";
import { Product } from "../../model/product";

/**
 * **useProductsService** è un custom hook che gestisce le operazioni CRUD sui prodotti.
 * 
 * Usa `useReducer` per gestire lo stato dei prodotti e le chiamate API.
 * Questo approccio permette di centralizzare la logica dello stato e delle operazioni asincrone.
 *
 * **Vantaggi di questo approccio:**
 * - Mantiene separata la logica di stato dalla UI.
 * - Rende il codice più scalabile e manutenibile.
 * - Migliora la gestione dello stato con `useReducer` invece di `useState`, utile per stati complessi.
 */
export function useProductsService() {
    // Inizializza lo stato con il reducer dedicato ai prodotti
    const [state, dispatch] = useReducer(productsReducer, initialState);

    /**
     * Recupera la lista dei prodotti dal server.
     * Mette lo stato in "pending" prima della chiamata API e aggiorna lo stato con i prodotti ricevuti.
     */
    async function getProducts() {
        dispatch({ type: 'pending', payload: true });
        try {
            const res = await ProductsApi.get();
            dispatch({ type: 'productsGetSuccess', payload: res.items });
        } catch (e) {
            dispatch({ type: 'error', payload: 'Products not loaded' });
        }
    }

    /**
     * Cancella un prodotto dal server tramite il suo ID.
     */
    async function deleteProduct(id: string) {
        dispatch({ type: 'pending', payload: true });
        try {
            await ProductsApi.remove(id);
            dispatch({ type: 'productDeleteSuccess', payload: id });
        } catch (e) {
            dispatch({ type: 'error', payload: 'Products not deleted' });
        }
    }

    /**
     * Aggiunge un nuovo prodotto al database.
     */
    async function addProduct(product: Partial<Product>) {
        dispatch({ type: 'pending', payload: true });
        try {
            const res = await ProductsApi.add(product);
            dispatch({ type: 'productAddSuccess', payload: res });
        } catch (e) {
            dispatch({ type: 'error', payload: 'Products not added' });
        }
    }

    /**
     * Modifica un prodotto esistente.
     */
    async function editProduct(product: Partial<Product>) {
        dispatch({ type: 'pending', payload: true });
        try {
            const res = await ProductsApi.edit(product);
            dispatch({ type: 'productEditSuccess', payload: res });
        } catch (e) {
            dispatch({ type: 'error', payload: 'Products not edited' });
        }
    }

    /**
     * Imposta un prodotto come attivo nel contesto dell'applicazione.
     */
    function setActiveItem(product: Product | object) {
        dispatch({ type: 'productSetActive', payload: product });
    }

    /**
     * Resetta il prodotto attivo.
     */
    function resetActiveItem() {
        dispatch({ type: 'productSetActive', payload: null });
    };

    /**
     * Restituisce le azioni disponibili e lo stato corrente.
     */
    return {
        actions: {
            getProducts,
            deleteProduct,
            addProduct,
            editProduct,
            setActiveItem,
            resetActiveItem
        },
        state
    };
}
