'use client';

import { UserAuth } from "@/app/context/authContext";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { signUpNewUser } = UserAuth();

    const handleSingUp = async (e: any) => {
        e.preventDefault();
        const { data, error } = await signUpNewUser(email, password, name);

        if (error) {
            console.log(error);
        }

        if (data) {
            console.log(data);
        }
    }

    return (
        <div>
            <form onSubmit={handleSingUp}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={loading}>Register</button>
            </form>
        </div>
    );
}