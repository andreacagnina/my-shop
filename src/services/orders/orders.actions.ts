import { Order } from "../../model/order";

/**
 * **orders.actions.ts** definisce i tipi di azioni che possono essere utilizzate nel reducer dei prodotti.
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
export type OrdersGetSuccess = { type: 'ordersGetSuccess', payload: Order[]; };

/**
 * Azione che viene dispatchata quando un ordine è stato eliminato con successo.
 * Contiene l'ID del ordine eliminato.
 */
export type OrderDeleteSuccess = { type: 'orderDeleteSuccess', payload: string; };

/**
 * Azione che viene dispatchata quando un viene dopo aver impostato uno stato di pending a Done in ordine e restituirà l'ordine completo con tutte le informazioni.
 */
export type OrderToggleStatusSuccess = { type: 'orderToggleStatusSuccess', payload: Order; };


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
 * **ordersActions** è un'unione di tutti i tipi di azioni disponibili per la gestione dei prodotti.
 * Questo garantisce che solo azioni valide possano essere dispatchate al reducer.
 */
export type OrdersActions =
    | OrdersGetSuccess
    | OrderDeleteSuccess
    | OrderToggleStatusSuccess
    | Error
    | Pending;
