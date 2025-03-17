import { pb } from '../../pocketbase';

/**
 * **auth.api.ts** gestisce le operazioni di autenticazione con PocketBase.
 *
 * **Funzionalità:**
 * - `login(username, password)`: Effettua il login utilizzando username e password.
 * - `logout()`: Pulisce il token di autenticazione e disconnette l'utente.
 * - `getToken()`: Restituisce il token JWT attuale dell'utente.
 * - `isLogged()`: Controlla se l'utente è autenticato.
 *
 * **Vantaggi dell'uso di questo file API:**
 * - Mantiene separata la logica di autenticazione dalla UI e dallo stato globale.
 * - Facilita la sostituzione del backend senza dover modificare la logica dell'app.
 * - Semplifica l'interazione con PocketBase.
 */

/**
 * Effettua il login di un utente utilizzando username e password.
 * 
 * @param {string} username - Username dell'utente.
 * @param {string} password - Password dell'utente.
 * @returns {Promise<any>} - Restituisce i dati dell'utente autenticato.
 */
export function login(username: string, password: string) {
    return pb.collection('users').authWithPassword(username, password); // ✅ CORRETTO
}

/**
 * Effettua il logout dell'utente, eliminando il token di autenticazione.
 */
export function logout() {
    pb.authStore.clear();
}

/**
 * Recupera il token di autenticazione attuale.
 * 
 * @returns {string | null} - Restituisce il token JWT se presente, altrimenti `null`.
 */
export function getToken() {
    return pb.authStore.token;
}

/**
 * Verifica se l'utente è autenticato.
 * 
 * @returns {boolean} - Restituisce `true` se l'utente è autenticato, `false` altrimenti.
 */
export function isLogged() {
    return pb.authStore.isValid;
}
