export interface Product {
    collectionId: string; // ID della collezione a cui appartiene il prodotto
    collectionName: string; // Nome della collezione del prodotto
    cost: number; // Prezzo del prodotto
    created: string; // Data di creazione del prodotto
    description: string; // Descrizione del prodotto
    id: string; // Identificativo univoco del prodotto
    img: string; // URL dell'immagine principale del prodotto
    name: string; // Nome del prodotto
    tmb: string; // URL della miniatura del prodotto
    updated: string; // Data dell'ultimo aggiornamento del prodotto
}
