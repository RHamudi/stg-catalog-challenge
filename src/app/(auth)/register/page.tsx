'use client';

import { Button, Input } from "@/components/ui";
import { UserAuth } from "@/context/authContext";
import { useFormValidation, validationRules } from "@/hooks/useFormValidation";
import { IRegisterForm } from "@/types";
import { ListChecks, LockKeyhole, Mail, SquarePlus, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { signUpNewUser } = UserAuth();

    const initialValues: IRegisterForm = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const {
        validateForm,
        getFieldProps,
        getFormValues,
        hasErrors,
        fields
    } = useFormValidation(initialValues, {
        name: { required: true },
        email: validationRules.email,
        password: validationRules.password,
        confirmPassword: {
            required: true,
            custom: (value: string) => {
                const passwordValue = fields?.password?.value || '';
                if (value && passwordValue && value !== passwordValue) {
                    return 'As senhas não coincidem';
                }
                return null;
            }
        }
    })

    const handleSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Por favor, corrija os erros no formulário")
        }

        setLoading(true);
        const formValues = getFormValues();

        try {
            const { data, error } = await signUpNewUser(formValues.email, formValues.password, formValues.name);
            if (error) {
                toast.error(error);
                return
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
            <div className="bg-white rounded-3xl shadow-2xl px-8 py-12 w-full max-w-md">
                <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                    Criar Conta
                </h2>
                <form onSubmit={handleSingUp} className="space-y-5">
                    <div>
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Seu nome"
                            required
                            icon={User}
                            {...getFieldProps('name')}
                        />
                    </div>

                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="seuemail@email.com"
                            icon={Mail}
                            required
                            {...getFieldProps('email')}
                        />
                    </div>

                    <div>
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="********"
                            icon={LockKeyhole}
                            required
                            {...getFieldProps('password')}
                        />
                    </div>

                    <div>
                        <Input
                            label="Confirme a senha"
                            type="password"
                            placeholder="********"
                            icon={ListChecks}
                            required
                            {...getFieldProps('confirmPassword')}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full "
                        loading={loading}
                    >
                        {loading ? "Realizando cadastro..." : "Registrar"}
                    </Button>


                </form>

                <p className="mt-6 text-center text-lg text-gray-600">
                    Já tem uma conta? <Link href="/login" className="text-green-600 font-medium hover:underline">Faça login</Link>
                </p>
            </div>
        </div>
    );
}