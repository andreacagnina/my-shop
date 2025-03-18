import { useEffect } from "react";
import { useProductsService } from "../../../services/products";
import { Loader, ServerError } from "../../../shared";
import { CMSProductsList } from "./components/CMSProductsList";
import { CMSProductForm } from "./components/CMSProductForm";

/**
 * **CMSProductsPage** è la pagina dedicata alla gestione dei prodotti nel CMS.
 * 
 * **Funzionalità:**
 * - Recupera lo stato e le azioni dal servizio `useProductsService()`.
 * - Carica automaticamente i prodotti quando il componente viene montato.
 * - Mostra un indicatore di caricamento durante il recupero dei dati.
 * - Gestisce eventuali errori nella richiesta API e li visualizza all'utente.
 * - Permette di eliminare un prodotto con un'icona di eliminazione.
 */
export function CMSProductsPage() {
    const { state, actions } = useProductsService(); // Stato e azioni del servizio prodotti

    // Effettua il recupero dei prodotti quando il componente viene montato
    useEffect(() => { actions.getProducts(); }, []);

    return (
        <div>
            <h1 className="title">&nbsp;CMS</h1>

            {/* Mostra il messaggio di caricamento se la richiesta è in corso */}
            {state.pending && <Loader />}

            {/* Mostra un messaggio di errore se la richiesta fallisce */}
            {state.error && <ServerError message={state.error} />}

            <CMSProductForm activeItem={state.activeItem} onClose={actions.resetActiveItem} onAdd={actions.addProduct} onEdit={actions.editProduct} />

            <CMSProductsList items={state.products} activeItem={state.activeItem} onEditItem={actions.setActiveItem} onDeleteItem={actions.deleteProduct
            } />

            <button className="btn primary" onClick={() => actions.setActiveItem({})}>ADD NEW</button>
        </div >
    );
}
