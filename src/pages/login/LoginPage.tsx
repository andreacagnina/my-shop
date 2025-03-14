import { FormEvent } from "react";
import { useLogin } from "./hooks/useLogin";

export function LoginPage() {

    const { formData, isValid, changeHandler } = useLogin();

    function doLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

    }


    return (
        <div>
            <h1 className="title max">LOGIN</h1>

            <form action="" className="flex flex-col gap-3" onSubmit={doLogin}>
                <input type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={changeHandler}
                    name="username"
                />

                <input type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={changeHandler}
                    name="password"
                />

                <button disabled={!isValid} type="submit"
                    className="btn primary"

                >SIGN IN</button>
            </form>
        </div>
    );
}