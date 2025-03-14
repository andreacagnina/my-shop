import { Product } from '../../model/product';
import { useEffect, useState } from 'react';
import { pb } from '../../pocketbase';
import { ProductCard } from './components/ProductCard';
import { ServerError, Loader } from '../../shared';
import { useCart, useCartPanel } from '../../services/cart';


export function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    // stato pending per gestire le connessioni + lente. tipizziamo come booleano e inizializziamo a false
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const openCartPanel = useCartPanel(state => state.openOverlay);
    const addToCart = useCart(state => state.addToCart);

    // RENDIRIZZIAMO SOLO ALL'INIZIO LA FUNZIONE LOADDATA CHE OTTIENE I DATI DAL NOSTRO DB IN POCKETBASE PD
    //     PD.collection('PRODUCTS') ACCEDE ALLA COLLEZIONE PRODOTTI, .GETLIST<Product>() E' UNA PROMISE E RICHIAMA TUTTI GLI ELEMENTI DELLA COLLEZIONE  ELI TIPIZZA COME ProductCard, QUANDO I DATI SONO PRONTI .THEN(RES => {} MODIFICA IL NOSTRO ARRAY INIZIALMENTE VUOTO ANDANDO AD INSERIRE i prodotti ricevuti RES.ITEMS)
    useEffect(() => { loadData() }, [])

    // appena riceviamo i dati pending passa a false
    function loadData() {
        setError(false);
        setPending(true);
        pb.collection('products').getList<Product>().then(res => {
            setProducts(res.items);
            // setPending(false);
        })
            .catch(() => {
                setError(true);
                // setPending(false);
            })
            // visto che a riga 21 e 25 il pending viene cmq messo a false, usiamo finally
            .finally(() => { setPending(false) })
    };

    // function addToCart(product: Partial<Product>) {
    //     openCartPanel();
    // }


    return (
        <div>
            <h1 className="title">SHOP</h1>
            {pending && <Loader />}
            {error && <ServerError />}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-16 p-3'>
                {products.map(p => {
                    return (
                        // AD OGNI CICLO DOBBIAMO METTERE UNA KEY
                        <ProductCard key={p.id} product={p} onAddToCart={() => { openCartPanel(); addToCart(p); }} />
                    );
                }
                )}
            </div>
        </div>
    )
}

// GIRO DI BOA: 1)tramite props passo onAddToCart al componente ProductCard.La reference passa la funzione addToCart specificata nel Genitore.Questa funzione accetta come parametro un product con una utilitytype Partial.

// 2)sintonizziamo il componente figlio per ricevere la props passata dal padre.specificando che è una funzione tipizzata con la utilitype Partial che restituisce void perchè stiamo facendo un consolelog

// 3)aggiungo alla destrutturazione onAddToCart

// 4)creo un evento click con una funzione anonima ()=>onAddToCart per fare in modo che l'evento avvenga solo al click e non al rendering del componente visto che stiamo passnado un parametro p che rappresenta ogni singolo prodotto grazie alla destrutturazione di riga 13 del comp figlio
