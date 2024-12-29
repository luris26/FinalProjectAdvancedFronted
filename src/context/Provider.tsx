"use client";

import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import React from "react";

const oldConfig: AuthProviderProps = {
    //https://auth.snowse-ts.duckdns.org 
    authority: "https://auth.snowse-ts.duckdns.org/realms/advanced-frontend-ts/",
    // authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
    client_id: "luris-client",
    redirect_uri: "http://localhost:5173/",
    // redirect_uri: "https://final-project-luris.duckdns.org/",
    onSigninCallback: async (user) => {
        console.log("sign in in callback");
        const newUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, newUrl);

        const expirationDate = new Date(new Date().getTime() + (user?.expires_in ?? 500) * 1000).toUTCString();
        document.cookie = `jwt_token=${user?.access_token}; expires=${expirationDate}`;
    },
    onRemoveUser: async() => {
        window.location.replace('/login');
        console.log("remove")
        document.cookie = "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
}
export default function Providers({children}: {children: React.ReactNode}){
    return <AuthProvider {...oldConfig}>{children}</AuthProvider>
}