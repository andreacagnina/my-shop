import { useEffect, useState } from "react";

export function Loader() {
    const [show, setShow] = useState(false);

    useEffect(() => {

        const debounce = setTimeout(() => { setShow(true); }, 300);

        return () => clearTimeout(debounce);
    }, []); //Usiamo useEffect senza dipendenze per fare triggerare il Loader solo quando viene montato. Impostiamo un setTimeout perchè è inutile mostrare uno spinner se la connessione è molto veloce perchè non avrebbe il tempo di caricare completamente. Alla fine puliamo il timeout

    return (show ?
        <div className="flex w-full justify-center my-4">
            <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
        </div> : null
    );
};
