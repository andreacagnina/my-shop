import { PropsWithChildren } from "react";
import { selectAuthIsLogged, useAuth } from "../../../services/auth";

export function IfLogged(props: PropsWithChildren) {
    const isLogged = useAuth(selectAuthIsLogged)
    return (
        <>
            {isLogged && props.children}
        </>
    )

}