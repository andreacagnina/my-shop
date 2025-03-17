import { PropsWithChildren } from "react";
import { selectAuthIsLogged, useAuth } from "../../../services/auth";

// Interfaccia che definisce le proprietà opzionali per il componente IfLogged
interface IfLoggedProps {
    else?: React.ReactNode; // Componente opzionale da mostrare se l'utente non è loggato
}

/**
 * **IfLogged** è un componente condizionale che controlla se l'utente è autenticato.
 *
 * - Se l'utente è autenticato, renderizza i `children` (i componenti interni passati).
 * - Se l'utente **non è autenticato**, mostra il componente passato tramite la prop `else`.
 *
 * **Vantaggi di questo approccio:**
 * - Evita di scrivere ripetutamente lo stesso controllo `{isLogged ? ... : ...}` nei componenti.
 * - Rende il codice più leggibile e modulare.
 * - Permette una gestione chiara del fallback quando l'utente non è autenticato.
 *
 * **Esempio di utilizzo:**
 * ```tsx
 * <IfLogged else={<LoginButton />}>
 *     <LogoutButton />
 * </IfLogged>
 * ```
 * Se l'utente è loggato, verrà mostrato `<LogoutButton />`, altrimenti `<LoginButton />`.
 */
export function IfLogged(props: PropsWithChildren<IfLoggedProps>) {
    // Recuperiamo lo stato di autenticazione dell'utente
    const isLogged = useAuth(selectAuthIsLogged);

    return (
        <>
            {/* Se l'utente è autenticato, mostriamo i figli (componenti interni) */}
            {/* Altrimenti, mostriamo il componente alternativo passato tramite la prop "else" */}
            {isLogged ? props.children : props.else}
        </>
    );
}
