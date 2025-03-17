import { NavLink } from 'react-router-dom';
import { useCart } from '../../services/cart';
import { selectCartIsEmpty, selectCartList, selectTotalCartCost } from '../../services/cart/cart.selectors';

/**
 * **CartPage** gestisce la visualizzazione del carrello.
 * 
 * **Funzionalità:**
 * - Mostra la lista dei prodotti nel carrello.
 * - Permette di aumentare o diminuire la quantità di ciascun prodotto.
 * - Mostra il costo totale del carrello.
 * - Se il carrello non è vuoto, permette di procedere al checkout.
 */
export function CartPage() {
    const list = useCart(selectCartList); // Recupera la lista di prodotti nel carrello
    const totalCost = useCart(selectTotalCartCost); // Calcola il totale del carrello
    const isEmpty = useCart(selectCartIsEmpty); // Controlla se il carrello è vuoto
    const increaseQty = useCart(state => state.increaseQty); // Aumenta la quantità di un prodotto
    const decreaseQty = useCart(state => state.decreaseQty); // Diminuisce la quantità di un prodotto

    return (
        <div>
            <h1 className="title">CART</h1>

            <ul>
                {list.map(p => (
                    <li key={p.product.id} className='flex flex-col sm:flex-row justify-between items-center gap-3 my-3 border-b border-blue-400 py-3'>
                        <div className='flex items-center gap-3'>
                            {/* Mostra l'immagine del prodotto */}
                            <img src={p.product.tmb} alt={p.product.name} className='w-24 rounded-xl' />

                            {/* Nome del prodotto */}
                            <div className="font-bold">{p.product.name}</div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4 items-center'>
                            <div className='flex items-center gap-3'>
                                {/* Pulsanti per aumentare o diminuire la quantità del prodotto */}
                                <button className="btn primary" onClick={() => decreaseQty(p.product.id)}>-</button>
                                <div>qty: {p.qty}</div>
                                <button className="btn primary" onClick={() => increaseQty(p.product.id)}>+</button>
                            </div>

                            {/* Costo totale del prodotto in base alla quantità */}
                            <div className='w-20 text-center'>
                                <div>cost: &euro; {p.product.cost * p.qty}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Totale del carrello */}
            <div className="text-4xl text-right my-4 mr-4">Total: &euro; {totalCost}</div>

            {/* Pulsante per procedere al checkout se il carrello non è vuoto */}
            {!isEmpty && (
                <div className="flex justify-center">
                    <NavLink to='/checkout' className='btn primary lg'>Confirm Order</NavLink>
                </div>
            )}
        </div>
    );
}
