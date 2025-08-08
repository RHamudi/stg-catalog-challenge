import { ICartReturn } from '@/types';

interface Coupon {
    code: string;
    discount: number;
    type: 'percentage' | 'shipping';
}

export const finalizarCompra = (
    cartItems: ICartReturn[],
    appliedCoupon: Coupon | null,
    subtotal: number
) => {
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    let mensagem = '🛒 NOVO PEDIDO - STG CATALOG\n';
    mensagem += `📦 PRODUTOS:\n`;

    let total = 0;
    cartItems.forEach((item) => {
        const subtotal = item.products.price * item.quantity;
        total += subtotal;
        mensagem += `- ${item.products.name} - Qtd: ${item.quantity} - R$ ${subtotal.toFixed(2)}\n`;
    });

    // Aplicar desconto do cupom se existir
    if (appliedCoupon) {
        if (appliedCoupon.type === 'percentage') {
            const desconto = total * appliedCoupon.discount;
            total -= desconto;
            mensagem += `\n🎫 Cupom aplicado: ${appliedCoupon.code} (-${(appliedCoupon.discount * 100)}%)\n`;
        } else if (appliedCoupon.type === 'shipping') {
            mensagem += `\n🎫 Cupom aplicado: ${appliedCoupon.code} (Frete grátis)\n`;
        }
    }

    // Adicionar frete
    const frete = subtotal > 500 ? 0 : 29.99;
    if (frete > 0) {
        total += frete;
        mensagem += `🚚 Frete: R$ ${frete.toFixed(2)}\n`;
    } else {
        mensagem += `🚚 Frete: Grátis\n`;
    }

    mensagem += `\n💰 TOTAL: R$ ${total.toFixed(2)}\n`;
    mensagem += '---\nPedido via STG Catalog';

    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroWhatsApp = '71999756279'; // Coloque o número do destino aqui

    const link = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    window.open(link, '_blank');
};
