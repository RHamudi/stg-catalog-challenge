# 🛒 STG Catalog - E-commerce

# Tecnologias

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/supabase-green?style=for-the-badge)

## 📋 Descrição do Projeto

O sistema é uma solução para um e-commerce que contem as seguintes funcionalidades:

# FUNCIONALIDADES PRINCIPAIS

## Autenticação:

- **Autenticação**
- **Proteção de rotas**
- **LogOut funcional**

## Catálogo

- **Grid responsivo com 12+ produtos**
- **Busca/filtro por nome**
- **Visualização detalhada**
- **Adicionar ao carrinho**

## Carrinho

- **Lista de produtos**
- **Editar quantidades**
- **Finalizar via WhatsAp**

## WhatsApp Integration

- **Gerar mensagem formatada**
- **Link wa.me automático**
- **Limpar carrinho pós-envio**

## 🚀 Tecnologias Utilizadas

### **Frontend**

- **Next.js** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones SVG
- **Context API** - Gerenciamento de estado

### **Back End**

- **SupaBase**

### IA Utilizada

### **Cursor**

- Utilizei o cursor para me dar sugestoes durante a codificação, e tambem para me
  ajudar a identificar erros durante o desenvolvimento.

### **claude.ai**

- Utilizei a Cloude para me auxiliar na estilização com ideias de que padrão seguir dentro do meu site

### **ChatGPT**

- utilizei em alguns momentos para conseguir tirar duvidas e fazer pesquisas sobre codigos do supabase e sua utilização, por exemplos em como realizar consultas.
  P

## Como Rodar Localmente

## **Pré requisitos**

- Node.JS instalado
- npm
- Criar uma conta na supabase

### **Intalação**

1 - **Clone o repositorio**

```bash
    git clone https://github.com/RHamudi/stg-catalog-challenge
    cd stg-catalog-challenge
```

2 - **Atualize as dependencias**

```bash
    npm install
```

3 - **Adicione as variaveis de ambiente**

- Adicione as variaveis de ambiente no seu arquivo .env

```
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

3 - **Execute o projeto**

```bash
    npm run dev
```

4 - **Acesse o navegador**

```bash
    http://localhost:3000
```

### **Scripts Disponíveis**

```bash
    npm run dev      # Inicia o servidor de desenvolvimento
    npm run build    # Gera build de produção
    npm run start    # Inicia servidor de produção
    npm run lint     # Executa linting do código
```

## Links Funcionais

### Deploy: https://stg-catalog-challenge-fnjq.vercel.app/

### **Funcionalidades**

- 🔍 **Busca de produtos** - Pesquisa por nome/descrição
- 🏷️ **Filtros por categoria** - Electronics, Clothing, Home, Sports
- 📱 **Modal de produto** - Visualização detalhada
- 📞 **WhatsApp Integration** - Finalização via WhatsApp
- 📋 **Histórico de pedidos** - Acessível via menu do usuário
- 🌙 **Toggle tema** - Modo claro/escuro

## ✅ Checklist de Funcionalidades

### **🔐 Autenticação**

- [x] Sistema de login
- [x] Registro de novos usuários
- [x] Persistência de sessão ContextAPI
- [x] Logout com limpeza de dados
- [x] Proteção de rotas privadas

### **📦 Catálogo de Produtos**

- [x] Listagem de 12 produtos vindo da api
- [x] Busca por nome
- [x] Layout responsivo
- [x] Modal de detalhes do produto
- [x] Imagens placeholder dinâmicas
- [x] Loading State em todas as paginas

### **🛒 Carrinho de Compras**

- [x] Adicionar produtos ao carrinho
- [x] Atualizar quantidades
- [x] Remover itens individuais
- [x] Cálculo automático de totais
- [x] Persistência durante a sessão
- [x] Indicador visual na navbar
- [x] Página dedicada do carrinho
- [x] Cupom de desconto funcional

### **📞 Sistema de Pedidos**

- [x] Formulário de checkout completo
- [x] Validação de campos obrigatórios
- [x] Geração de mensagem WhatsApp formatada
- [x] Abertura do WhatsApp
- [x] Salvamento do pedido no histórico
- [x] Limpeza automática do carrinho

### **📊 Histórico de Pedidos**

- [x] Pagina de histórico acessível
- [x] Listagem de pedidos por usuário
- [x] Detalhes completos de cada pedido
- [x] Ordenação por data (mais recente primeiro)
- [x] Informações de contato e entrega

### **🎨 Interface e UX**

- [x] Design responsivo (mobile-first)
- [x] Modo escuro/claro com persistência
- [x] Componentes acessíveis
- [x] Notificações toast
- [x] Loading states
- [x] Estados vazios (carrinho/histórico)
- [x] Navegação intuitiva

### **⚡ Performance e Qualidade**

- [x] Componentes otimizados
- [x] Lazy loading de imagens
- [x] Código limpo e organizado
- [x] Tratamento de erros
- [x] Validação de formulários

# DIFERENCIAIS

- [x] Historicos de pedidos
- [x] Filtros
- [x] Animações
- [x] Otimização de imagens
- [x] Lazy Loading
