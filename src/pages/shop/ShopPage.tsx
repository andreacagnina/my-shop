import { Product } from '../../model/product';
import { useEffect, useState } from 'react';
import { pb } from '../../pocketbase';
import { ProductCard } from './components/ProductCard';
import { ServerError, Loader } from '../../shared';
import { useCart, useCartPanel } from '../../services/cart';

/**
 * **ShopPage** è il componente principale dello shop che mostra la lista di prodotti.
 * 
 * **Funzionalità:**
 * - Recupera la lista di prodotti da PocketBase.
 * - Mostra un **loader** durante il caricamento dei prodotti.
 * - Gestisce errori in caso di problemi di rete o server.
 * - Permette di aggiungere un prodotto al carrello e aprire il pannello del carrello.
 */
export function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]); // Stato per la lista di prodotti
    const [pending, setPending] = useState<boolean>(false); // Stato per il caricamento
    const [error, setError] = useState<boolean>(false); // Stato per eventuali errori

    const openCartPanel = useCartPanel(state => state.openOverlay); // Funzione per aprire il carrello
    const addToCart = useCart(state => state.addToCart); // Funzione per aggiungere prodotti al carrello

    /**
     * Carica i dati dei prodotti dal database al primo rendering.
     */
    useEffect(() => {
        loadData();
    }, []);

    /**
     * Funzione che recupera i prodotti da PocketBase.
     * - Imposta `pending` a `true` mentre i dati vengono caricati.
     * - Se la richiesta ha successo, salva i prodotti nello stato.
     * - Se fallisce, imposta `error` a `true`.
     */
    function loadData() {
        setError(false);
        setPending(true);
        pb.collection('products').getList<Product>()
            .then(res => {
                setProducts(res.items);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setPending(false);
            });
    }

    return (
        <div>
            <h1 className="title">SHOP</h1>

            {/* Mostra il loader se i prodotti stanno caricando */}
            {pending && <Loader />}

            {/* Mostra un errore se il caricamento fallisce */}
            {error && <ServerError />}

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-16 p-3'>
                {products.map(p => (
                    // Ad ogni ciclo dobbiamo specificare una key univoca
                    <ProductCard
                        key={p.id}
                        product={p}
                        onAddToCart={() => {
                            openCartPanel();
                            addToCart(p);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
