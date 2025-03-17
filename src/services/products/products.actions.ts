import { Product } from "../../model/product";

/**
 * **products.actions.ts** definisce i tipi di azioni che possono essere utilizzate nel reducer dei prodotti.
 * Questo approccio migliora la sicurezza del codice e garantisce che solo azioni valide vengano utilizzate.
 *
 * **Vantaggi:**
 * - Assicura che ogni azione sia ben definita e contenga i dati corretti.
 * - Migliora la manutenibilità del codice, poiché è più facile aggiungere nuove azioni.
 * - Sfrutta il controllo statico di TypeScript per ridurre gli errori.
 */

/**
 * Azione che viene dispatchata quando il caricamento dei prodotti è avvenuto con successo.
 * Contiene un array di prodotti.
 */
export type ProductsGetSuccess = { type: 'productsGetSuccess', payload: Product[]; };

/**
 * Azione che viene dispatchata quando un prodotto è stato eliminato con successo.
 * Contiene l'ID del prodotto eliminato.
 */
export type ProductDeleteSuccess = { type: 'productDeleteSuccess', payload: string; };

/**
 * Azione che viene dispatchata quando un nuovo prodotto viene aggiunto con successo.
 * Contiene l'oggetto del prodotto aggiunto.
 */
export type ProductAddSuccess = { type: 'productAddSuccess', payload: Product; };

/**
 * Azione che viene dispatchata quando un prodotto viene modificato con successo.
 * Contiene l'oggetto del prodotto aggiornato.
 */
export type ProductEditSuccess = { type: 'productEditSuccess', payload: Product; };

/**
 * Azione per impostare un prodotto come "attivo", utile per la modifica o la visualizzazione dettagliata.
 * Accetta un prodotto parziale o `null` per resettare lo stato.
 */
export type ProductSetActive = { type: 'productSetActive', payload: Partial<Product> | null; };

/**
 * Azione per gestire errori.
 * Contiene un messaggio di errore.
 */
export type Error = { type: 'error', payload: string; };

/**
 * Azione per impostare lo stato "pending", utile per mostrare un caricamento in corso.
 */
export type Pending = { type: 'pending', payload: boolean; };

/**
 * **ProductsActions** è un'unione di tutti i tipi di azioni disponibili per la gestione dei prodotti.
 * Questo garantisce che solo azioni valide possano essere dispatchate al reducer.
 */
export type ProductsActions =
    | ProductsGetSuccess
    | ProductDeleteSuccess
    | ProductAddSuccess
    | ProductEditSuccess
    | ProductSetActive
    | Error
    | Pending;
