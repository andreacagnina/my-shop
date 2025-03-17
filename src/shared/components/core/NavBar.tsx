import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../../assets/laptop.png';
import { CartPanel } from "./CartPanel";
import { selectCartIsEmpty, selectTotalCartItems, useCart, useCartPanel } from "../../../services/cart";
import { useAuth } from "../../../services/auth";
import { IfLogged } from "../auth/IfLogged";

// Funzione per applicare una classe CSS attiva ai link della navbar
const isActive = (obj: { isActive: boolean; }) => {
    return obj.isActive ? 'text-xl text-sky-400 font-bold' : 'text-xl text-white';
};

export function NavBar() {
    // Recuperiamo lo stato del pannello del carrello
    const isCartPanelOpened = useCartPanel(state => state.open);
    const toggleCartPanel = useCartPanel(state => state.toggle);

    // Recuperiamo il numero totale di prodotti nel carrello e se il carrello è vuoto
    const totalCartItems = useCart(selectTotalCartItems);
    const isEmpty = useCart(selectCartIsEmpty);

    // Recuperiamo la funzione di logout dal sistema di autenticazione
    const logout = useAuth(state => state.logout);

    // Hook per la navigazione programmatica
    const navigate = useNavigate();

    function logoutHandler() {
        // Esegue il logout dell'utente
        logout();

        // Reindirizza alla pagina di login
        navigate('/login');
    }

    return (
        // Navbar fissata in alto, con ombreggiatura e z-index per essere sempre visibile
        <div className="fixed top-0 left-0 right-0 shadow-2xl z-10">
            <div className="bg-slate-900 flex justify-between items-center h-20 text-white p-3">
                <div className="flex items-center gap-3">
                    {/* Logo del negozio */}
                    <img src={logo} alt="my logo" className="w-16" />

                    {/* Link allo shop */}
                    <NavLink to="shop" className={isActive}>SHOP</NavLink>
                </div>

                {/* Se il carrello non è vuoto, mostra il pulsante per aprire il pannello */}
                {!isEmpty &&
                    <div>
                        <button className="btn accent lg" onClick={toggleCartPanel} >Cart: {totalCartItems}</button>
                    </div>
                }

                {/* Mostra il pannello del carrello se lo stato è aperto */}
                {isCartPanelOpened && <CartPanel />}

                <div className="fixed bottom-2 right-2 p-5">
                    {/* Pulsante per accedere alla sezione CMS */}
                    <NavLink to="cms" className='btn accent lg'>cms</NavLink>

                    {/* Se l'utente è loggato, mostra il pulsante di logout, altrimenti mostra il link di login */}
                    <IfLogged else={
                        <NavLink to="login" className="btn accent lg">login</NavLink>
                    }>
                        <button className="btn primary lg" onClick={logoutHandler}>logout</button>
                    </IfLogged>
                </div>
            </div>
        </div>
    );
}
