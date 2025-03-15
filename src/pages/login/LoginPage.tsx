import { FormEvent, useEffect } from "react";
import { useLogin } from "./hooks/useLogin";
import { selectAuthError, selectAuthIsLogged, useAuth } from "../../services/auth";
import { ServerError } from "../../shared";
import { useNavigate } from "react-router-dom";

export function LoginPage() {

    const { formData, isValid, changeHandler } = useLogin();
    const login = useAuth(state => state.login);
    const error = useAuth(selectAuthError);
    const isLogged = useAuth(selectAuthIsLogged);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigate('/cms')
        }
    }, [isLogged, navigate])

    function doLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        login(formData.username, formData.password)
    }


    return (
        <div>
            <h1 className="title max">LOGIN</h1>

            {error && <ServerError />}
            <div className="flex justify-center my-5">

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
        </div>
    );
}