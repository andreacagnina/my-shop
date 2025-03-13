import { Product } from "../../../model/product";

// creo un interfaccia per tipizzare le props
interface ProductCardProps {
    // Visto che non è detto che il Prodotto abbia tutti i campi nel db, usiamo Partial in modo che tutte le proprietà di product sono potenzialmente undefiend / non definite. Partial è una UtilityType. Senza avremmo potuto recuperare con dot anche proprietà che un singolo prodotto potrebbe non avere.
    product: Partial<Product>;
    // 2)***
    onAddToCart: (product: Partial<Product>) => void;
}
export function ProductCard(props: ProductCardProps) {
    // DESTRUTTURAZIONE PROPS PER UTILIZZARE P NEL NOSTRO JSX
    // 3)***
    const { product: p, onAddToCart } = props;
    return (
        <div className='bg-white text-black shadow-2xl rounded-xl overflow-hidden'>
            {/* SE L'IMMAGINE ESISTE (VISTO CHE NEL DB NON è REQUIRED, ALLORA AGGIUNGI IL TAG IMG) */}
            {p.img && <img src={p.img} alt={p.name} className='h-64 w-full object-cover' />}
            <div className="flex justify-between items-center gap-3 p-3 text-xl font-bold">
                <div>{p.name}</div>
                <div>&euro; {p.cost}</div>
            </div>
            <p className="p-3">{p.description}</p>
            {/* con questo pulsante il prodotto deve essere aggiunto al carrello, ma la funzione si trova nel Parent */}
            {/* 4)*** */}
            <button className="bg-sky-600 text-white hover:bg-slate-800 transition font-bold w-full text-center p-3" onClick={() => onAddToCart(p)}>ADD TO CART</button>
        </div>
    )
}
