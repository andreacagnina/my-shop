import { create } from "zustand";

/**
 * **useCartPanel** è uno store Zustand per gestire l'apertura e chiusura del pannello del carrello.
 *
 * **Funzioni disponibili:**
 * - `toggle`: Alterna lo stato aperto/chiuso del pannello.
 * - `openOverlay`: Apre esplicitamente il pannello.
 * - `closeOverlay`: Chiude esplicitamente il pannello.
 *
 * **Vantaggi di Zustand:**
 * - Più leggero e semplice da usare rispetto a Redux.
 * - Non necessita di boilerplate complessi.
 * - Lo stato è accessibile da qualsiasi componente senza dover passare props.
 */

interface CartPanelState {
    open: boolean; // Indica se il pannello è aperto
    toggle: () => void; // Alterna lo stato aperto/chiuso
    openOverlay: () => void; // Forza l'apertura del pannello
    closeOverlay: () => void; // Forza la chiusura del pannello
}

export const useCartPanel = create<CartPanelState>((set) => ({
    open: false, // Il pannello è chiuso di default

    toggle: () => set((state) => ({ open: !state.open })), // Alterna tra aperto e chiuso

    openOverlay: () => set({ open: true }), // Apre il pannello (utile per azioni esplicite, es. clic su un pulsante)

    closeOverlay: () => set({ open: false }) // Chiude il pannello
}));
