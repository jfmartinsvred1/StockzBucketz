import {Portfolio } from "../../models/types";
import AuthService from "../../services/AuthService";
import { AuthContext } from "./AuthContext"
import { useState,useEffect } from "react";
import * as firebaseAuth from 'firebase/auth'
import { auth } from "../../FirebaseConfig";
import { GetPortfolio } from "../../services/ApiService";

type AuthProviderProps = {
    authService:AuthService
    children: any
}

export default function AuthProvider(props: AuthProviderProps) {
    const [isLoadingLoggerUser, setIsLoadingLoggerUser] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged(auth,(user:any)=>{
            setIsLoadingLoggerUser(false);
            setUser(user)
            
        })
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoadingLoggerUser,user, authService: props.authService
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}