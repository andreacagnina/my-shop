/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import * as AuthService from './auth.api';

/**
 * **useAuth.ts** gestisce l'autenticazione degli utenti utilizzando Zustand.
 *
 * **Funzionalità principali:**
 * - Controlla se l'utente è autenticato.
 * - Gestisce il login e il logout.
 * - Salva il token di autenticazione nel localStorage.
 *
 * **Vantaggi dell'uso di Zustand:**
 * - Stato globale semplice e performante.
 * - Evita la necessità di passare props tra componenti.
 * - Più leggero rispetto a Redux.
 */

export interface AuthState {
    token: string | null; // Token di autenticazione
    isLogged: boolean; // Stato di autenticazione
    error: boolean; // Stato di errore durante il login
    login: (username: string, password: string) => void; // Funzione per effettuare il login
    logout: () => void; // Funzione per effettuare il logout
}

export const useAuth = create<AuthState>((set) => ({
    error: false,

    // Recupera il token di autenticazione dal localStorage all'inizio
    token: AuthService.getToken(),

    // Determina se l'utente è loggato
    isLogged: false,

    /**
     * Effettua il login chiamando il servizio di autenticazione.
     * - Se ha successo, aggiorna `isLogged` e salva il token.
     * - Se fallisce, imposta `error: true`.
     */
    login: async (username, password) => {
        set({ isLogged: false, error: false });
        try {
            await AuthService.login(username, password);
            set({ isLogged: AuthService.isLogged(), token: AuthService.getToken() });
        } catch (e) {
            set({ error: true, isLogged: false });
        }
    },

    /**
     * Effettua il logout, rimuovendo il token e resettando lo stato.
     */
    logout: () => {
        AuthService.logout();
        set({ isLogged: false, token: null });
    },
}));
