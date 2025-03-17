import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CartPage, CheckoutPage, CMSOrdersPage, CMSPage, CMSProductsPage, LoginPage, ShopPage, ThanksPage } from './pages';
import { NavBar, PrivateRoute } from './shared';

function App() {
    return (
        // BrowserRouter avvolge tutta l'app e abilita la gestione della navigazione client-side
        <BrowserRouter>
            {/* NavBar è un componente condiviso visibile su tutte le pagine */}
            <NavBar />

            <div className="page">
                {/* Definizione delle route */}
                <Routes>
                    {/* Pagina principale dello shop */}
                    <Route path="shop" element={<ShopPage />} />

                    {/* Pagina del carrello */}
                    <Route path="cart" element={<CartPage />} />

                    {/* Pagina di checkout */}
                    <Route path="checkout" element={<CheckoutPage />} />

                    {/* Pagina di ringraziamento dopo un acquisto */}
                    <Route path="thanks" element={<ThanksPage />} />

                    {/* Pagina di login */}
                    <Route path="login" element={<LoginPage />} />

                    {/* Sezione CMS riservata agli amministratori */}
                    <Route path="cms" element={<PrivateRoute> <CMSPage /> </PrivateRoute>}>
                        {/* Sottopagina dei prodotti nel CMS */}
                        <Route path="products" element={<CMSProductsPage />} />

                        {/* Sottopagina degli ordini nel CMS */}
                        <Route path="orders" element={<CMSOrdersPage />} />

                        {/* Se l'utente accede a "/cms" senza specificare una sottopagina, viene reindirizzato a "/cms/products" */}
                        <Route index element={<Navigate to="products" />} />
                    </Route>

                    {/* Catch-all: Se l'utente tenta di accedere a un percorso non definito, viene reindirizzato a "/shop" */}
                    <Route path="*" element={<Navigate to="shop" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
