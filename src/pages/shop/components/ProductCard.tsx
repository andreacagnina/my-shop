import { Product } from "../../../model/product";

/**
 * **ProductCard** è un componente che visualizza un singolo prodotto nello shop.
 *
 * **Funzionalità:**
 * - Mostra le informazioni di un prodotto (immagine, nome, costo, descrizione).
 * - Permette di aggiungere il prodotto al carrello tramite una funzione passata dal componente padre.
 */

// Interfaccia per tipizzare le props del componente
interface ProductCardProps {
    /**
     * Il prodotto da visualizzare. Usiamo `Partial<Product>` perché
     * alcuni campi potrebbero essere opzionali nel database.
     */
    product: Partial<Product>;
    /**
     * Funzione per aggiungere il prodotto al carrello.
     * Accetta come parametro un oggetto `Partial<Product>` e non restituisce nulla (`void`).
     */
    onAddToCart: (product: Partial<Product>) => void;
}

export function ProductCard(props: ProductCardProps) {
    // Destrutturazione delle props per un accesso più comodo
    const { product: p, onAddToCart } = props;

    return (
        <div className='bg-white text-black shadow-2xl rounded-xl overflow-hidden'>
            {/* Se il prodotto ha un'immagine, la mostriamo */}
            {p.img && <img src={p.img} alt={p.name} className='h-64 w-full object-cover' />}

            {/* Nome e prezzo del prodotto */}
            <div className="flex justify-between items-center gap-3 p-3 text-xl font-bold">
                <div>{p.name}</div>
                <div>&euro; {p.cost}</div>
            </div>

            {/* Descrizione del prodotto */}
            <p className="p-3">{p.description}</p>

            {/* Pulsante per aggiungere il prodotto al carrello */}
            <button
                className="bg-sky-600 text-white hover:bg-slate-800 transition font-bold w-full text-center p-3"
                onClick={() => onAddToCart(p)}
            >
                ADD TO CART
            </button>
        </div>
    );
}
