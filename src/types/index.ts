export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
}

export interface ICart {
    id?: string;
    user_id: string;
    product_id: string;
    quantity: number;
}

export interface ICartReturn extends ICart {
    products: IProduct;
}

// Interfaces para autenticação
export interface ILoginForm extends Record<string, string> {
    email: string;
    password: string;
}

export interface IRegisterForm extends ILoginForm {
    confirmPassword: string;
    name?: string;
}

export interface IAuthResponse {
    success: boolean;
    data?: any;
    error?: string;
}

// Interfaces para componentes
export interface IInputProps {
    label: string;
    type: 'email' | 'password' | 'text';
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    icon?: React.ComponentType;
    required?: boolean;
    error?: string;
}

export interface IButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export interface IOrders {
    id: string,
    created_at: string,
    total_amount: number,
    shipping: string,
    notes: string,
    items: IOrder_items[],
    customer_name: string,
    customer_email: string,
}

export interface IOrder_items {
    id: string,
    product_name: string,
    quantity: number,
    unit_price: number,
    total_price: number
}

export interface IOrdersSubmit {
    total_amount: number,
    shipping: string,
    notes: string,
    customer_name: string,
    customer_email: string,
}