import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    getToken: () => string;
    token: string;
    username: string;
    setToken: (token: { access_token: string, username: string, is_admin: boolean, is_view: boolean }) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            username: '',
            token: '',
            getToken: () => get().token ? get().token : localStorage.getItem('accessToken') || '',
            setToken: (token) => {
                set({
                    token: token.access_token,
                    username: token.username,
                })
                localStorage.setItem('accessToken', token.access_token);
            },
            logout: () => { set({ token: '', username: '' }); localStorage.removeItem('accessToken') },
        }),
        {
            name: 'user-storage',
        }
    )
)

