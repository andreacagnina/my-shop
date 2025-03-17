import { PropsWithChildren } from "react";
import { selectAuthIsLogged, useAuth } from "../../../services/auth";
import { Navigate } from "react-router-dom";

export function PrivateRoute(props: PropsWithChildren) {
    // Recuperiamo lo stato di autenticazione dell'utente
    const isLogged = useAuth(selectAuthIsLogged);

    return (
        <>
            {/* Se l'utente è autenticato, mostriamo i figli (componenti interni) */}
            {/* Altrimenti, reindirizziamo alla pagina di login */}
            {isLogged ? props.children : <Navigate to="/login" />}
        </>
    );
}
