import clsx from "clsx";
import { Product } from "../../../../model/product";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCloudinary } from "../../../../shared/hooks/useCloudinary";

export interface CMSProductFormProps {
    activeItem: Partial<Product> | null;
    onClose: () => void;
    onAdd: (product: Partial<Product>) => void;
    onEdit: (product: Partial<Product>) => void;
}

// Stato iniziale del form
const initialState: Partial<Product> = {
    name: '', cost: 0, description: '', tmb: '', img: '',
};

export function CMSProductForm(props: CMSProductFormProps) {
    const [formData, setFormData] = useState(initialState);
    const [dirty, setDirty] = useState<boolean>(false);

    const { openWidget } = useCloudinary(); // Inizializza il widget di Cloudinary per il caricamento delle immagini

    useEffect(() => {
        if (props.activeItem?.id) {
            setFormData({ ...props.activeItem }); // Carica i dati dell'elemento attivo se esiste
        } else {
            setFormData(initialState); // Resetta il form se non c'è un elemento attivo
        }
    }, [props.activeItem]);

    function changeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormData(s => ({ ...s, [name]: value })); // Aggiorna lo stato con il nuovo valore
        setDirty(true); // Imposta lo stato "dirty" per la validazione
    }

    function saveHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (props.activeItem?.id) {
            props.onEdit(formData); // Se l'elemento è attivo, modifica il prodotto
        } else {
            props.onAdd(formData); // Altrimenti, aggiungi un nuovo prodotto
        }
    }

    function uploadHandler() {
        openWidget()
            .then(res => {
                setFormData(s => ({ ...s, ...res })); // Aggiorna il form con l'immagine caricata
            })
            .catch(error => console.error("Upload failed:", error)); // Gestisce eventuali errori nell'upload
    }

    // Validazione dei campi del form
    const isNameValid = (formData.name ?? '').length > 0;
    const isCostValid = formData.cost! > 0;
    const isDescValid = (formData.description ?? '').length > 0;
    const isValid = isNameValid && isCostValid && isDescValid;

    return (
        <div className={clsx("fixed bg-slate-200 z-10 text-black top-0 w-96 h-full transition-all overflow-auto", { '-right-96': !props.activeItem, 'right-0': props.activeItem })} >
            <form onSubmit={saveHandler}>
                <div className="flex justify-around h-16">
                    <button type="submit" className="text-white w-1/2 bg-green-500 hover:bg-green-600 disabled:opacity-30" disabled={!isValid}>SAVE</button>
                    <button type="button" className="text-white w-1/2 bg-slate-500 hover:bg-slate-600" onClick={props.onClose}>CLOSE</button>
                </div>

                {formData.img && <img src={formData.img} alt={formData.name} />} {/* Mostra l'immagine caricata */}

                <div className="flex flex-col gap-3 mx-3 mt-16">
                    Product Name:
                    <input className={clsx({ 'error': !isNameValid && dirty })} type="text" value={formData?.name} onChange={changeHandler} name="name" />
                    Product Cost:
                    <input className={clsx({ 'error': !isCostValid && dirty })} type="number" value={formData?.cost} onChange={changeHandler} name="cost" />
                    Description:
                    <textarea className={clsx('mb-3', { 'error': !isDescValid && dirty })} value={formData.description} onChange={changeHandler} name="description"></textarea>
                    <button type="button" className="btn primary" onClick={uploadHandler}>UPLOAD</button> {/* Pulsante per caricare un'immagine */}
                </div>
            </form>
        </div>
    );
}
