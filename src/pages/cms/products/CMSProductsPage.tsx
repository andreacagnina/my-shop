import { useProductsService } from "../../../services/products";

/**
 * **CMSProductsPage** è la pagina dedicata alla gestione dei prodotti nel CMS.
 * 
 * **Funzionalità:**
 * - Recupera lo stato e le azioni dal servizio `useProductsService()`.
 * - Permette di caricare i prodotti con un pulsante GET.
 * - Mostra un messaggio di caricamento mentre i dati vengono recuperati.
 * - Gestisce eventuali errori nella richiesta API.
 */
export function CMSProductsPage() {
    const { state, actions } = useProductsService(); // Stato e azioni del servizio prodotti

    /**
     * Richiama la funzione per ottenere i prodotti dal database.
     */
    async function getProductsHandler() {
        actions.getProducts();
    }

    return (
        <div>
            <h1 className="title">&nbsp;CMS</h1>

            Pagina prodotti

            <hr className="my-8" />

            {/* Mostra il messaggio di caricamento se la richiesta è in corso */}
            {state.pending && <div>Loading...</div>}

            {/* Mostra un messaggio di errore se la richiesta fallisce */}
            {state.error && <div>{state.error}</div>}

            {/* Pulsante per caricare i prodotti */}
            <button className="btn primary" onClick={getProductsHandler}>GET</button>

            {/* Mostra lo stato attuale in formato JSON per debugging */}
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
}
