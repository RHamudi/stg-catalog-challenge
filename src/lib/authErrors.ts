export const getAuthErrorMessage = (errorMessage: string): string => {
    if (errorMessage.includes('Invalid login credentials')) {
        return "Email ou senha incorretos";
    }
    if (errorMessage.includes('Email not confirmed')) {
        return "Confirme seu email antes de fazer login";
    }
    if (errorMessage.includes('Too many requests')) {
        return "Muitas tentativas. Tente novamente em alguns minutos";
    }

    return "Erro no login. Verifique suas credenciais";
};

export const getSignUpErrorMessage = (errorMessage: string): string => {
    if (errorMessage.includes('User already registered')) {
        return "Este email já está cadastrado";
    }
    if (errorMessage.includes('Password should be at least')) {
        return "Senha muito fraca. Use pelo menos 6 caracteres";
    }
    if (errorMessage.includes('Invalid email')) {
        return "Formato de email inválido";
    }
    if (errorMessage.includes('Signup is disabled')) {
        return "Cadastros temporariamente desabilitados";
    }

    return "Erro no cadastro. Verifique os dados e tente novamente";
};