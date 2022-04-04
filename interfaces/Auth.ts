
export type Auth = {
    user?: {
        uid?: number | null;
        firstname?: string | null;
        lastname?: string | null;
        email?: string | null;
        image?: string | null,
    },
    tokens?: {
        accessToken: string | null;
    };
    status?: boolean;
}

export const defaultAuth: Auth = {
    status: false
}

export default interface IAuth {
    authState: typeof defaultAuth,
    setAuthState: (a: Auth) => void
}