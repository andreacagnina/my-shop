import { create } from "zustand";
import * as AuthService from './auth.api';

export interface AuthState {
    token: string | null;
    isLogged: boolean;
    error: boolean;
    login: (username: string, passoword: string) => void;
    logout: () => void;
}
export const useAuth = create<AuthState>((set) => ({
    error: false,
    // LocalStorage
    token: AuthService.getToken(),
    isLogged: false,
    login:
        async (username, password) => {
            set({ isLogged: false, error: false });
            try {
                await AuthService.login(username, password)
                set({ isLogged: AuthService.isLogged(), token: AuthService.getToken() })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                set({ error: true, isLogged: false })
            }
        },
    logout: () => {
        AuthService.logout();
        set({ isLogged: false, token: null })
    },
})) 