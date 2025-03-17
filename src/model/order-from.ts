import { CartItem } from "./cart-item";

/**
 * **OrderUser** rappresenta i dati dell'utente che effettua l'ordine.
 */
export interface OrderUser {
    name: string; // Nome dell'utente
    email: string; // Email dell'utente
}

/**
 * **OrderStatus** rappresenta lo stato dell'ordine.
 * - `pending`: Ordine in attesa di elaborazione.
 * - `done`: Ordine completato.
 */
export type OrderStatus = 'pending' | 'done';

/**
 * **OrderForm** rappresenta un ordine effettuato dall'utente.
 *
 * **Campi:**
 * - `user`: Dati dell'utente che ha effettuato l'ordine.
 * - `order`: Lista degli articoli nel carrello.
 * - `status`: Stato dell'ordine.
 * - `total`: Importo totale dell'ordine.
 */
export interface OrderForm {
    user: OrderUser; // Informazioni sull'utente
    order: CartItem[]; // Lista dei prodotti ordinati
    status: OrderStatus; // Stato dell'ordine (pending o done)
    total: number; // Costo totale dell'ordine
}
