import { useProductsService } from "../../../services/products";


export function CMSProductsPage() {
    const { state, actions } = useProductsService();

    async function getProductsHandler() {
        actions.getProducts();
    }

    return (
        <div>
            <h1 className="title">&nbsp;CMS</h1>

            Pagina prodotti

            <hr className="my-8" />

            {state.pending && <div>Loading...</div>}
            {state.error
                && <div>{state.error}</div>}

            <button className="btn primary" onClick={getProductsHandler}>GET</button>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
}


