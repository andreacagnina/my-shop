export function useCloudinary() {

    function openWidget(): Promise<{ img: string, tmb: string; }> {
        return new Promise((resolve, reject) => {
            // Inizializza il widget di upload di Cloudinary
            const uploadWidget = window.cloudinary.openUploadWidget(
                {
                    cloudName: 'dpxksph97', // Nome del cloud su Cloudinary
                    uploadPreset: 'ml_default', // Preset di upload configurato su Cloudinary
                    sources: ['local', 'camera', 'url'] // Fonti disponibili per il caricamento
                },
                (error: any, result: any) => {
                    if (error) {
                        reject(error); // Gestione dell'errore per evitare crash inattesi
                        return;
                    }

                    // Se l'upload ha successo, estrae le informazioni dell'immagine
                    if (result.event === 'success') {
                        const img = result.info.secure_url; // URL sicuro dell'immagine
                        const tmb = result.info.thumbnail_url; // URL della miniatura dell'immagine
                        resolve({ img, tmb });
                    }
                }
            );

            uploadWidget.open(); // Apertura del widget per il caricamento dell'immagine
        });
    }

    return {
        openWidget // Espone la funzione per aprire il widget
    };
}
