import { ChangeEvent, useState } from "react";

export function useLogin() {
    const [formData, setFormData] = useState({ username: '', password: '' });



    function changeHandler(event: ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setFormData(s => ({ ...s, [name]: value }))
    }

    const isValid = formData.username.length && formData.password.length

    return {
        formData,
        isValid,
        changeHandler
    }
}