import { FormEvent, useEffect } from "react";
import { useLogin } from "./hooks/useLogin";
import { selectAuthError, selectAuthIsLogged, useAuth } from "../../services/auth";
import { ServerError } from "../../shared";
import { useNavigate } from "react-router-dom";

/**
 * **LoginPage** è la pagina di login dell'applicazione.
 * 
 * **Funzionalità:**
 * - Permette all'utente di autenticarsi inserendo username e password.
 * - Controlla se l'utente è già loggato e lo reindirizza alla dashboard del CMS.
 * - Mostra eventuali errori di autenticazione.
 */
export function LoginPage() {
    const { formData, isValid, changeHandler } = useLogin(); // Hook per la gestione del form
    const login = useAuth(state => state.login); // Funzione per eseguire il login
    const error = useAuth(selectAuthError); // Seleziona lo stato di errore
    const isLogged = useAuth(selectAuthIsLogged); // Verifica se l'utente è loggato
    const navigate = useNavigate(); // Hook per la navigazione

    /**
     * Se l'utente è già loggato, viene automaticamente reindirizzato alla pagina CMS.
     */
    useEffect(() => {
        if (isLogged) {
            navigate('/cms');
        }
    }, [isLogged, navigate]);

    /**
     * Funzione che gestisce il login.
     * Impedisce il comportamento predefinito del form e chiama la funzione di autenticazione.
     */
    function doLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        login(formData.username, formData.password);
    }

    return (
        <div>
            <h1 className="title max">LOGIN</h1>

            {/* Se c'è un errore di login, mostra il componente di errore */}
            {error && <ServerError />}

            <div className="flex justify-center my-5">
                <form action="" className="flex flex-col gap-3" onSubmit={doLogin}>
                    {/* Input per username */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={changeHandler}
                        name="username"
                    />

                    {/* Input per password */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={changeHandler}
                        name="password"
                    />

                    {/* Pulsante di login, disabilitato se il form non è valido */}
                    <button
                        disabled={!isValid}
                        type="submit"
                        className="btn primary"
                    >
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
}
