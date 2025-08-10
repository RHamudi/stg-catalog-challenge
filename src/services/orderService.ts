import { supabase } from "@/lib/supabase";
import { ICartReturn, IOrder_items, IOrders, IOrdersSubmit } from "@/types";

export const saveOrder = async (orders: IOrdersSubmit, items: ICartReturn[]) => {
    const { data: orderCreate, error: erroOrder } = await supabase.from('orders')
    .insert({
      customer_name: orders.customer_name,
      customer_email: orders.customer_email,
      shipping: orders.shipping,
      total_amount: orders.total_amount,
      notes: orders.notes
    }).select().single();

    if (erroOrder) {
        console.error("Error saving order:", erroOrder);
        return;
    }

    for (const i of items) {
    const { error: itemError } = await supabase
      .from('order_items')
      .insert([{
        order_id: orderCreate.id,
        product_name: i.products.name,
        quantity: i.quantity,
        unit_price: i.products.price,
        total_price: i.quantity * i.products.price
      }]);

        if (itemError) {
            console.error(`Error saving item ${i.products.name}:`, itemError);
        }
    }
}

export async function getOrdersByEmail(customerEmail: string): Promise<IOrders[]> {
  try {
    // Busca pedidos com os itens relacionados
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(*)
      `)
      .eq('customer_email', customerEmail)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Mapeia os resultados para o formato desejado
    return orders.map(order => ({
      id: order.id,
      created_at: order.created_at,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      total_amount: order.total_amount,
      shipping: order.shipping,
      notes: order.notes,
      items: order.order_items.map((item: IOrder_items) => ({
        id: item.id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price
      }))
    }));

  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return [];
  }
}