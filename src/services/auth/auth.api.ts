import { pb } from '../../pocketbase';
export function login(username: string, passowrd: string) {
    return pb.admins.authWithPassword(username, passowrd)
}

export function logout() {
    pb.authStore.clear();
}

export function getToken() {
    return pb.authStore.token;
}

export function isLogged() {
    return pb.authStore.isValid;
}