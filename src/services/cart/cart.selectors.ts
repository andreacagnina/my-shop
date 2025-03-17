import { CartState } from "./useCart";

/**
 * **cart.selectors.ts** contiene funzioni che estraggono specifici dati dallo stato del carrello.
 * 
 * **Vantaggi dell'uso dei selectors:**
 * - Evitano ripetizioni di codice nelle componenti.
 * - Migliorano la leggibilità e manutenibilità del codice.
 * - Se lo stato cambia struttura, si può aggiornare solo qui senza modificare il resto dell'app.
 */

/**
 * Restituisce l'elenco completo degli articoli nel carrello.
 */
export const selectCartList = (state: CartState) => state.list;

/**
 * Restituisce `true` se il carrello è vuoto, altrimenti `false`.
 */
export const selectCartIsEmpty = (state: CartState) => state.list.length === 0;

/**
 * Calcola il costo totale del carrello sommando `qty * cost` di ogni prodotto.
 */
export const selectTotalCartCost = (state: CartState) =>
    state.list.reduce((acc, item) => acc + (item.qty * item.product.cost), 0);

/**
 * Calcola il numero totale di articoli nel carrello (indipendentemente dai prodotti).
 */
export const selectTotalCartItems = (state: CartState) =>
    state.list.reduce((acc, item) => acc + item.qty, 0);
