import { ChangeEvent, useState } from "react";
import { selectCartList, selectTotalCartCost, useCart } from "../../../services/cart";
import { useNavigate } from "react-router-dom";
import { OrderForm } from "../../../model/order-from";
import { useOrdersService } from "../../../services/orders";
import { ClientResponseError } from "pocketbase";

/**
 * **Regex per la validazione delle email**
 * Verifica che l'indirizzo email sia conforme a un formato valido.
 */
export const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * **useCheckout** è un custom hook che gestisce il processo di checkout.
 *
 * **Funzionalità:**
 * - Recupera il carrello e il totale del costo.
 * - Gestisce lo stato del form utente (nome ed email).
 * - Valida i dati in tempo reale.
 * - Invia l'ordine e reindirizza alla pagina di ringraziamento.
 */
export function useCheckout() {
    const order = useCart(selectCartList); // Recupera la lista di prodotti nel carrello
    const totalCartCost = useCart(selectTotalCartCost); // Recupera il costo totale del carrello
    const clearCart = useCart(state => state.clearCart); // Funzione per svuotare il carrello dopo l'ordine

    const { state, addOrder } = useOrdersService();

    // Stato per i dati dell'utente
    const [user, setUser] = useState({ name: '', email: '' });

    // Stato per verificare se l'utente ha iniziato a modificare il form
    const [dirty, setDirty] = useState(false);

    const navigate = useNavigate(); // Hook per la navigazione

    /**
     * **Gestisce il cambiamento degli input nel form**
     * - Aggiorna lo stato dell'utente con i valori inseriti.
     * - Imposta `dirty` a `true` per abilitare la validazione in tempo reale.
     */
    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setUser(state => ({ ...state, [name]: value }));
        setDirty(true);
    }

    /**
     * **Invia l'ordine**
     * - Previene il comportamento predefinito del form.
     * - Crea un oggetto con i dettagli dell'ordine.
     * - Svuota il carrello e reindirizza alla pagina di ringraziamento.
     */
    function sendOrder(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const orderInfo: OrderForm = {
            user,
            order,
            status: 'pending',
            total: totalCartCost
        };

        addOrder(orderInfo).then((res) => {
            if (!(res instanceof ClientResponseError)) {
                // chiamata al server
                clearCart();
                navigate('/thanks');
            }
        });

    }

    // **Validazione dei dati**
    const isNameValid = user.name.length; // Controlla che il nome non sia vuoto
    const isEmailValid = user.email.match(EMAIL_REGEX); // Verifica se l'email corrisponde alla regex
    const isValid = isNameValid && isEmailValid; // L'ordine può essere inviato solo se entrambi i campi sono validi

    return {
        validators: {
            isNameValid,
            isEmailValid,
            isValid,
        },
        actions: {
            sendOrder,
            changeHandler,
        },
        totalCartCost,
        user,
        dirty,
        error: state.error
    };
}
