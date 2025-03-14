import { clsx } from "clsx";
import { useCheckout } from "./hooks/useCheckout";

export function CheckoutPage() {
    const { validators, actions, totalCartCost, user, dirty } = useCheckout()

    return (
        <div className="max-w-sm mx-auto">
            <h1 className="title">CHECKOUT</h1>
            <div className="text-xl my-3 border-b">&euro; {totalCartCost}</div>

            <form action="" className="flex flex-col gap-3" onSubmit={actions.sendOrder}>
                <label htmlFor="name">Your Name:</label>
                <input className={clsx({ 'error': !validators.isNameValid && dirty })} type="text" placeholder="Your name" name="name" id="name" value={user.name} onChange={actions.changeHandler} />
                <label htmlFor="email">Your Email:</label>
                <input className={clsx({ 'error': !validators.isEmailValid && dirty })} type="email" placeholder="Your email" name="email" id="email" value={user.email} onChange={actions.changeHandler} />
                <button type="submit" className={clsx('btn', { primary: !validators.isValid, success: validators.isValid })} disabled={!validators.isValid}>Confirm Order</button>
            </form>
        </div>
    );
}