import clsx from "clsx";
import { Product } from "../../../../model/product";

interface CMSProductsListProps {
    items: Product[];
    activeItem: Partial<Product> | null;
    onEditItem: (product: Partial<Product>) => void;
    onDeleteItem: (id: string) => void;
}

export function CMSProductsList(props: CMSProductsListProps) {
    return (
        <div className="mt-12">
            <table className="table-auto w-full hover mb-3">
                <thead>
                    <tr>
                        <th className="text-left">PRODUCTS</th>
                        <th className="text-left">IMAGE</th>
                        <th>COST</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody className="hover">
                    {props.items.map((item) => {
                        // Classe condizionale per migliorare la leggibilità
                        const rowClasses = clsx('cursor-pointer', {
                            'bg-sky-200 text-black pointer-events-none': item.id === props.activeItem?.id
                        });

                        return (
                            <tr
                                key={item.id}
                                className={rowClasses}
                                onClick={() => props.onEditItem(item)} // Imposta l'elemento attivo quando viene cliccato
                            >
                                {/* Nome del prodotto */}
                                <td>
                                    {item.name}
                                </td>

                                {/* Miniatura del prodotto (se disponibile) */}
                                <td>
                                    {item.tmb ? (
                                        <img src={item.tmb} alt={item.name} className="h-16 rounded-xl" />
                                    ) : (
                                        <span>No Image</span> // Placeholder se non c'è immagine
                                    )}
                                </td>

                                {/* Prezzo del prodotto */}
                                <td className="text-center">
                                    {item.cost} &euro;
                                </td>

                                {/* Bottone per eliminare il prodotto, migliorato con accessibilità */}
                                <td className="text-center">
                                    <button
                                        className="fa fa-trash"
                                        aria-label="Delete product"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita la selezione dell'elemento durante l'eliminazione
                                            props.onDeleteItem(item.id); // Chiama l'azione di eliminazione
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
