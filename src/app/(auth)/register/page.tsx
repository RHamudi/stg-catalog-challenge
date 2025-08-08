'use client';

import { UserAuth } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { signUpNewUser } = UserAuth();

    const handleSingUp = async (e: any) => {
        e.preventDefault();
        const { data, error } = await signUpNewUser(email, password, name);

        if (error) {
            console.log(error);
        }

        if (data) {
            router.push('/login')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
            <div className="bg-white rounded-3xl shadow-2xl px-8 py-12 w-full max-w-md">
                <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                    Criar Conta
                </h2>
                <form onSubmit={handleSingUp} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome
                        </label>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            placeholder="seuemail@email.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-300"
                    >
                        Registrar
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Já tem uma conta? <Link href="/login" className="text-green-600 font-medium hover:underline">Faça login</Link>
                </p>
            </div>
        </div>
    );
}