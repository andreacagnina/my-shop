import { Product } from './product';

/**
 * **CartItem** rappresenta un singolo elemento all'interno del carrello.
 * 
 * **Campi:**
 * - `product`: Oggetto di tipo `Product` che rappresenta il prodotto nel carrello.
 * - `qty`: Quantità di quel prodotto aggiunta al carrello.
 */
export interface CartItem {
    product: Product; // Dettagli del prodotto
    qty: number; // Quantità del prodotto nel carrello
}
