"use client";

import { AuthProvider, AuthProviderProps } from "react-oidc-context";

//https://auth.snowse.duckdns.org/realms/advanced-frontend/.well-known/openid-configuration
const oldConfig: AuthProviderProps = {
    authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
    client_id: "luris-client",
    redirect_uri: "http://localhost:5173/",
    // redirect_uri: "https://luris-directory-order.duckdns.org/",
    onSigninCallback: async (user) => {
        console.log("sign in in callback");
        const newUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, newUrl);

        const expirationDate = new Date(new Date().getTime() + (user?.expires_in ?? 500) * 1000).toUTCString();
        document.cookie = `jwt_token=${user?.access_token}; expires=${expirationDate}`;
    },
    onRemoveUser: async() => {
        console.log("remove")
        document.cookie = "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
}
export default function Providers({children}: {children: React.ReactNode}){
    return <AuthProvider {...oldConfig}>{children}</AuthProvider>
}