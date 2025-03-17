import { ChangeEvent, useState } from "react";

/**
 * **useLogin** è un custom hook che gestisce il form di login.
 *
 * **Funzionalità:**
 * - Gestisce lo stato dei dati di login (username e password).
 * - Fornisce una funzione `changeHandler` per aggiornare i campi del form.
 * - Valida il form assicurandosi che entrambi i campi siano compilati.
 *
 * **Vantaggi:**
 * - Rende il codice più modulare e riutilizzabile.
 * - Mantiene separata la logica dello stato dalla UI.
 */
export function useLogin() {
    // Stato per memorizzare i dati del form (username e password)
    const [formData, setFormData] = useState({ username: '', password: '' });

    /**
     * Gestisce il cambiamento dei campi del form.
     * 
     * @param {ChangeEvent<HTMLInputElement>} event - L'evento di input.
     */
    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        // Aggiorna lo stato mantenendo i dati precedenti
        setFormData(s => ({ ...s, [name]: value }));
    }

    /**
     * Verifica se entrambi i campi sono compilati.
     * Restituisce `true` se il form è valido, altrimenti `false`.
     */
    const isValid = formData.username.length > 0 && formData.password.length > 0;

    return {
        formData,
        isValid,
        changeHandler
    };
}
