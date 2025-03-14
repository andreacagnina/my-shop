import { useNavigate } from "react-router-dom";
import { selectCartList, selectTotalCartCost, useCart, useCartPanel } from "../../../services/cart";

export function CartPanel() {
    // USENAVIGATE è un Hook fornito da REACTROUTER che ci permette di navigare in altre pagine. salviamo l'hook in una variabile navigate
    const navigate = useNavigate();
    const closeCartPanel = useCartPanel(state => state.closeOverlay);

    const list = useCart(selectCartList);
    const totalCartCost = useCart(selectTotalCartCost);

    // funzione per andare nella pagina CART che passiamo come parametro
    function goToCart() {
        navigate('cart')
        closeCartPanel()
    }

    return (
        <div className="fixed bg-pink-500 right-4 top-24 p-3 rounded-xl shadow-2xl w-96">
            <ul className="flex flex-col gap-4">

                {
                    list.map(p => {
                        return (
                            <li key={p.product.id} className="flex justify-between items-center border-b border-slate-600">
                                <div>{p.product.name}</div>
                                <div className="flex gap-3">
                                    <div>
                                        ({p.qty} x &euro; {p.product.cost})
                                    </div>
                                    <div>
                                        &euro; {p.qty * p.product.cost}
                                    </div>
                                </div>
                            </li>

                        )
                    })}

            </ul>
            <div className="flex justify-end text-xl font-bold my-3">
                Total: € {totalCartCost}
            </div>
            <div className="flex justify-center">
                <button className="btn primary" onClick={goToCart}>Go to Cart</button>
            </div>
        </div >
    )
}