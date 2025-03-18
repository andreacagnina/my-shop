import { useEffect } from "react";
import { useProductsService } from "../../../services/products";
import { Loader, ServerError } from "../../../shared";

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
                        {state.products.map((item) => {
                            return (
                                <tr
                                    key={item.id}
                                    onClick={() => actions.setActiveItem(item)} // Imposta l'elemento attivo quando viene cliccato
                                >
                                    {/* Nome del prodotto */}
                                    <td>
                                        {item.name}
                                    </td>

                                    {/* Miniatura del prodotto (se disponibile) */}
                                    <td>
                                        {item.tmb && <img src={item.tmb} alt={item.name} className="h-16 rounded-xl" />}
                                    </td>

                                    {/* Prezzo del prodotto */}
                                    <td className="text-center">
                                        {item.cost} &euro;
                                    </td>

                                    {/* Icona per eliminare il prodotto */}
                                    <td className="text-center">
                                        <i
                                            className="fa fa-trash"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evita la selezione dell'elemento durante l'eliminazione
                                                actions.deleteProduct(item.id); // Chiama l'azione di eliminazione
                                            }}
                                        ></i>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
