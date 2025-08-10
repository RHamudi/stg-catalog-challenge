'use client';
import { UserAuth } from "@/context/authContext";
import { LockKeyhole, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useFormValidation, validationRules } from "@/hooks/useFormValidation";
import { ILoginForm } from "@/types";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { signInUser } = UserAuth();

    const initialValues: ILoginForm = {
        email: "",
        password: ""
    };

    const rules = {
        email: validationRules.email,
        password: validationRules.password
    };

    const {
        validateForm,
        getFieldProps,
        getFormValues,
        hasErrors
    } = useFormValidation(initialValues, rules);

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Por favor, corrija os erros no formulário');
            return;
        }

        setLoading(true);
        const formValues = getFormValues();

        try {
            const { success, data, error } = await signInUser(formValues.email, formValues.password);

            if (error) {
                toast.error(error);
                return;
            }

            if (data) {
                toast.success('Usuário logado com sucesso!');
                router.push('/products');
            }
        } catch (error) {
            toast.error('Erro inesperado. Tente novamente.');
        } finally {
            setLoading(false);
        }
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

                <form onSubmit={handleSignIn} className="space-y-5">
                    {/* Email */}
                    <Input
                        label="Email"
                        type="email"
                        placeholder="exemplo@email.com"
                        icon={Mail}
                        required
                        {...getFieldProps('email')}
                    />

                    {/* Senha */}
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="********"
                        icon={LockKeyhole}
                        required
                        {...getFieldProps('password')}
                    />

                    {/* Esqueceu a senha */}
                    <div className="flex justify-end">
                        <Link href="#" className="text-sm text-green-600 hover:underline">
                            Esqueceu a senha?
                        </Link>
                    </div>

                    {/* Botão Entrar */}
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        loading={loading}
                        disabled={hasErrors}
                        className="w-full"
                    >
                        <LogIn className="w-5 h-5" />
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
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
                <p className="text-center text-lg text-gray-600">
                    Não tem uma conta? <Link href="/register" className="text-green-600 font-medium hover:underline">Criar conta gratuita</Link>
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