import { NavLink, Outlet } from "react-router-dom";

/**
 * **CMSPage** è la pagina principale della sezione CMS.
 * 
 * **Funzionalità:**
 * - Contiene i link di navigazione per accedere alla gestione dei prodotti e degli ordini.
 * - Utilizza `Outlet` per mostrare il contenuto della sottopagina attualmente selezionata.
 */

// Funzione per applicare classi CSS dinamicamente ai link attivi
const isActive = (obj: { isActive: boolean; }) => {
    return obj.isActive ? 'btn primary' : 'btn';
};

export function CMSPage() {
    return (
        <div>
            {/* Link per navigare tra le sezioni del CMS */}
            <NavLink to="/cms/products" className={isActive}> Products</NavLink>
            <NavLink to="/cms/orders" className={isActive}> Orders</NavLink>

            {/* Outlet per visualizzare le sottopagine del CMS */}
            <Outlet />
        </div>
    );
}
