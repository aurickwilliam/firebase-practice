import { useState } from "react";
import { auth, googleProvide} from "../config/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithPopup} from "firebase/auth";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // console.log(auth?.currentUser?.email);

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Signed Up");
        } catch (err) {
            console.error(err);
        }
    };

    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvide);
            alert("Signed Up Google");
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input type="text" name="email" id="email" placeholder="Email..."
            onChange={(e) => (setEmail(e.target.value))}/>    
            <input type="password" name="password" id="password" placeholder="Password..."
            onChange={(e) => (setPassword(e.target.value))}/>    
            
            <button onClick={signUp}>Sign Up</button>
            <button onClick={signUpWithGoogle}>Sign Up With Google</button>
            <button onClick={logOut}>Sign Out</button>
        </div>  
    );
}