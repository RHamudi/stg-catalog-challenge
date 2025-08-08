'use client';
import { UserAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { signInUser } = UserAuth();

    const handleSingIn = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const { success, data, error } = await signInUser(email, password);
        if (error) {
            console.log(error)
        }

        if (data) {
            toast.success('Successfully toasted!')
            router.push('/products')
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl px-8 py-12 sm:px-12">
                {/* Ícone topo */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-500 rounded-full p-4">
                        {/* Substitua com seu ícone */}
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z"></path>
                            <path d="M12 11V6a6 6 0 00-6 6v6h12v-6a6 6 0 00-6-6z"></path>
                        </svg>
                    </div>
                </div>

                {/* Título */}
                <h2 className="text-2xl font-bold text-center text-green-600">Bem-vindo de volta</h2>
                <p className="text-center text-gray-600 mb-8">Entre na sua conta para continuar sua jornada</p>

                <form onSubmit={handleSingIn} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">
                                📧
                            </span>
                            <input
                                type="email"
                                placeholder="exemplo@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                                required
                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">
                                🔒
                            </span>
                            <input
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
                                required
                            />
                            {/* Ícone olho aqui se quiser */}
                        </div>
                    </div>

                    {/* Lembrar-me + Esqueceu a senha */}
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox text-green-500" />
                            <span>Lembrar-me</span>
                        </label>
                        <a href="#" className="text-green-600 hover:underline">Esqueceu a senha?</a>
                    </div>

                    {/* Botão Entrar */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Entrando...
                            </div>
                        ) : (
                            <>
                                <span>👤</span>
                                Entrar
                            </>
                        )}
                    </button>
                </form>

                {/* Divider
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500 text-sm">ou continue com</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div> */}

                {/* Social login
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        Google
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50">
                        <img src="https://www.svgrepo.com/show/475700/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
                        Facebook
                    </button>
                </div> */}

                {/* Cadastro */}
                <p className="text-center text-sm text-gray-600">
                    Não tem uma conta? <a href="#" className="text-green-600 font-medium hover:underline">Criar conta gratuita</a>
                </p>

                {/* Rodapé SSL */}
                <div className="mt-8 text-xs text-center text-gray-500 flex items-center justify-center gap-2">
                    <span className="text-green-600">🛡️</span>
                    Seus dados estão protegidos com criptografia SSL
                </div>
            </div>
        </div>


    );
}