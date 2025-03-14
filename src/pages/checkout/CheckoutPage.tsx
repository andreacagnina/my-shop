import { ChangeEvent, useState } from "react";
import { selectTotalCartCost, useCart } from "../../services/cart";
import { clsx } from "clsx";

export function CheckoutPage() {
    const totalCartCost = useCart(selectTotalCartCost);
    const [user, setUser] = useState({ name: '', email: '' });

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setUser(state => ({ ...state, [name]: value }))
    }

    const isNameValid = user.name.length;
    const isEmailValid = user.email.length;
    const isValid = isNameValid && isEmailValid;

    return (
        <div className="max-w-sm mx-auto">
            <h1 className="title">CHECKOUT</h1>
            <div className="text-xl my-3 border-b">&euro; {totalCartCost}</div>

            <form action="" className="flex flex-col gap-3">
                <label htmlFor="name">Your Name:</label>
                <input className={clsx({ 'error': !isNameValid })} type="text" placeholder="Your name" name="name" id="name" value={user.name} onChange={changeHandler} />
                <label htmlFor="email">Your Email:</label>
                <input className={clsx({ 'error': !isEmailValid })} type="email" placeholder="Your email" name="email" id="email" value={user.email} onChange={changeHandler} />
                <button type="submit" className="btn primary" disabled={!isValid}>Confirm Order</button>
            </form>
        </div>
    );
}