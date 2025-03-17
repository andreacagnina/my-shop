import { AuthState } from "./useAuth";

/**
 * **auth.selectors.ts** contiene funzioni per estrarre informazioni dallo stato di autenticazione.
 *
 * **Vantaggi dei Selectors:**
 * - Separano la logica di accesso ai dati dallo stato globale.
 * - Riducono la ripetizione del codice e migliorano la leggibilità.
 * - Se lo stato cambia struttura, è sufficiente modificare i selectors senza impattare il resto dell'app.
 */

/**
 * Restituisce il token di autenticazione salvato nello stato.
 */
export const selectAuthToken = (state: AuthState) => state.token;

/**
 * Restituisce lo stato di errore durante l'autenticazione.
 */
export const selectAuthError = (state: AuthState) => state.error;

/**
 * Restituisce `true` se l'utente è autenticato, altrimenti `false`.
 */
export const selectAuthIsLogged = (state: AuthState) => state.isLogged;
