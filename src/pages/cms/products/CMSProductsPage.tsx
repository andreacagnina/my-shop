import { useEffect } from "react";
import { useProductsService } from "../../../services/products";
import { Loader, ServerError } from "../../../shared";

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

    useEffect(() => { actions.getProducts(); }, []); //Il componente viene caricato quando la relativa route del cms viene aperta


    return (
        <div>
            <h1 className="title">&nbsp;CMS</h1>

            {/* Mostra il messaggio di caricamento se la richiesta è in corso */}
            {state.pending && <Loader />}

            {/* Mostra un messaggio di errore se la richiesta fallisce */}
            {state.error && <ServerError message={state.error} />}

            <div className="mt-12">
                <table className="table-auto w-full hover">
                    <thead>
                        <tr>
                            <th className="text-left">PRODUCTS</th>
                            <th className="text-left">IMAGE</th>
                            <th>COST</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                product name
                            </td>
                            <td>
                                image
                            </td>
                            <td className="text-center">
                                cost
                            </td>
                            <td className="text-center">
                                <i className="fa fa-trash"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
