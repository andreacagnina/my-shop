import { Product } from "../../model/product";
import { pb } from "../../pocketbase";

/**
 * **products.api.ts** gestisce tutte le chiamate API relative ai prodotti utilizzando **PocketBase**.
 *
 * Questo file funge da **service API**, isolando la logica di interazione con il database
 * dalla UI e dalla gestione dello stato.
 *
 * **Vantaggi:**
 * - Separa la logica di rete dalla gestione dello stato (migliore organizzazione).
 * - Facile da modificare in caso di cambio di backend (ad es. passaggio a Firebase o un'API REST personalizzata).
 * - Rende il codice più leggibile e manutenibile.
 */

/**
 * Recupera la lista di prodotti dalla collezione 'products' su PocketBase.
 *
 * @returns {Promise<Product[]>} - Ritorna un array di prodotti.
 */
export function get() {
    return pb.collection('products').getList<Product>();
}

/**
 * Elimina un prodotto specifico dalla collezione.
 *
 * @param {string} id - ID del prodotto da eliminare.
 * @returns {Promise<void>} - Non restituisce alcun valore.
 */
export function remove(id: string) {
    return pb.collection('products').delete(id);
}

/**
 * Aggiunge un nuovo prodotto alla collezione.
 *
 * @param {Partial<Product>} product - Dati del prodotto (parziali, perché alcuni campi potrebbero essere opzionali).
 * @returns {Promise<Product>} - Restituisce il prodotto appena creato.
 */
export function add(product: Partial<Product>) {
    return pb.collection('products').create<Product>(product);
}

/**
 * Modifica un prodotto esistente nella collezione.
 *
 * @param {Partial<Product>} product - Dati aggiornati del prodotto.
 * @returns {Promise<Product>} - Restituisce il prodotto aggiornato.
 */
export function edit(product: Partial<Product>) {
    return pb.collection('products').update<Product>(product.id!, product);
}
