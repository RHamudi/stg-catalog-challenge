'use client';
import { UserAuth } from "@/context/authContext";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { signInUser } = UserAuth();

    const handleSingIn = async (e: any) => {
        e.preventDefault();
        const { data, error } = await signInUser(email, password);

        if (error) {
            console.log(error)
        }

        if (data) {
            console.log(data)
        }
    }

    return (
        <div>
            <form onSubmit={handleSingIn}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" >Login</button>
            </form>
        </div>
    );
}