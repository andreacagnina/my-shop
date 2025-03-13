import { create } from 'zustand';

export interface CartStateOverlay {
    open: boolean;
    toggle: () => void;
    openOverlay: () => void;
    closeOverlay: () => void;
}

export const useCartPanel = create<CartStateOverlay>((set, get) => ({
    open: false,
    toggle: () => set({ open: !get().open }),
    openOverlay: () => set({ open: true }),
    closeOverlay: () => set({ open: false }),
}))

// gestiamo l'apertura del pannello cart tipizzando con una intefaccia cartstateoverlay open in booleano e gli altri in metodi per modificare questo valore. Dobbiamo usare set e get come parametri che riceviamo dalla funzione create per leggere e modificare lo stato