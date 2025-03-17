import { useNavigate } from "react-router-dom";
import { selectCartList, selectTotalCartCost, useCart, useCartPanel } from "../../../services/cart";

export function CartPanel() {
    // Hook di React Router per la navigazione programmatica
    const navigate = useNavigate();

    // Funzione per chiudere il pannello del carrello
    const closeCartPanel = useCartPanel(state => state.closeOverlay);

    // Recuperiamo la lista degli oggetti nel carrello
    const list = useCart(selectCartList);

    // Recuperiamo il costo totale del carrello
    const totalCartCost = useCart(selectTotalCartCost);

    // Funzione per navigare alla pagina del carrello e chiudere il pannello
    function goToCart() {
        navigate('cart');
        closeCartPanel();
    }

    return (
        // Pannello del carrello fisso con sfondo rosa e ombreggiatura
        <div className="fixed bg-pink-500 right-4 top-24 p-3 rounded-xl shadow-2xl w-96">
            <ul className="flex flex-col gap-4">
                {
                    list.map(p => {
                        return (
                            <li key={p.product.id} className="flex justify-between items-center border-b border-slate-600">
                                {/* Nome del prodotto */}
                                <div>{p.product.name}</div>

                                {/* Quantità, prezzo singolo e prezzo totale */}
                                <div className="flex gap-3">
                                    <div>
                                        ({p.qty} x &euro; {p.product.cost})
                                    </div>
                                    <div>
                                        &euro; {p.qty * p.product.cost}
                                    </div>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>

            {/* Totale del carrello */}
            <div className="flex justify-end text-xl font-bold my-3">
                Total: € {totalCartCost}
            </div>

            {/* Pulsante per navigare alla pagina del carrello */}
            <div className="flex justify-center">
                <button className="btn primary" onClick={goToCart}>Go to Cart</button>
            </div>
        </div>
    );
}
