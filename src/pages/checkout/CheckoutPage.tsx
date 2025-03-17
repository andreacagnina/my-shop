import { clsx } from "clsx";
import { useCheckout } from "./hooks/useCheckout";

/**
 * **CheckoutPage** gestisce il processo di checkout dell'utente.
 * 
 * **Funzionalità:**
 * - Mostra il totale del carrello.
 * - Gestisce il form con validazione in tempo reale.
 * - Invia l'ordine al server quando il form è valido.
 *
 * **Vantaggi dell'uso di `useCheckout()`:**
 * - Separa la logica del form dallo stato della UI.
 * - Rende il codice più leggibile e riutilizzabile.
 */
export function CheckoutPage() {
    const { validators, actions, totalCartCost, user, dirty } = useCheckout();

    return (
        <div className="max-w-sm mx-auto">
            <h1 className="title">CHECKOUT</h1>

            {/* Mostra il totale del carrello */}
            <div className="text-xl my-3 border-b">&euro; {totalCartCost}</div>

            {/* Form per l'inserimento dei dati utente */}
            <form action="" className="flex flex-col gap-3" onSubmit={actions.sendOrder}>
                {/* Input per il nome */}
                <label htmlFor="name">Your Name:</label>
                <input
                    className={clsx({ 'error': !validators.isNameValid && dirty })}
                    type="text"
                    placeholder="Your name"
                    name="name"
                    id="name"
                    value={user.name}
                    onChange={actions.changeHandler}
                />

                {/* Input per l'email */}
                <label htmlFor="email">Your Email:</label>
                <input
                    className={clsx({ 'error': !validators.isEmailValid && dirty })}
                    type="email"
                    placeholder="Your email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={actions.changeHandler}
                />

                {/* Pulsante di conferma ordine */}
                <button
                    type="submit"
                    className={clsx('btn', { primary: !validators.isValid, success: validators.isValid })}
                    disabled={!validators.isValid}
                >
                    Confirm Order
                </button>
            </form>
        </div>
    );
}
