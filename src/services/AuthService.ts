import { auth } from './../FirebaseConfig';
import * as firebaseAuth from 'firebase/auth'

export default class AuthService {
    async login(email: string, password: string) {
        return firebaseAuth.signInWithEmailAndPassword(
            auth, email, password
        )
            .then(user => {
                return user;
            })
            .catch(error => {
                console.log('error', error)
                return Promise.reject(error)
            })
    }

    async register(email: string, password: string) {
        return firebaseAuth.createUserWithEmailAndPassword(
            auth, email, password
        )
    }

    logout(){
        return firebaseAuth.signOut(auth)
    }
    getLoggedUser(){
        return new Promise(resolve=>{
            firebaseAuth.onAuthStateChanged(auth,(user:any)=>{
                resolve(user);
            })
        })
    }

    

}


