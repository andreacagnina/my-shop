import { useReducer } from "react";
import { initialState, ordersReducer } from "./orders.reducer";
import { OrderForm, OrderStatus } from "../../model/order-from";
import * as OrdersService from './orders.api';

export function useOrdersService() {
    const [state, dispatch] = useReducer(ordersReducer, initialState);

    async function getOrders() {
        dispatch({ type: 'pending', payload: true });
        try {
            const res = await OrdersService.get();
            dispatch({ type: 'ordersGetSuccess', payload: res.items });
        } catch (e) {
            dispatch({ type: 'error', payload: 'Order not loaded' });
            return e;
        }
    }

    async function deleteOrder(id: string) {
        dispatch({ type: 'pending', payload: true });

        try {
            await OrdersService.remove(id);
            dispatch({ type: 'orderDeleteSuccess', payload: id });
        } catch (e) {
            dispatch({ type: 'error', payload: 'Order not deleted' });
            return e;
        }
    }

    async function addOrder(order: OrderForm) {
        dispatch({ type: 'pending', payload: true });

        try {
            return await OrdersService.add(order);
        } catch (e) {
            dispatch({ type: 'error', payload: 'Order not Added' });
            return e;
        }
    }

    async function toggleOrderStatus(id: string, status: OrderStatus) {
        dispatch({ type: 'pending', payload: true });
        try {
            const res = await OrdersService.toggleStatus(id, status);
            dispatch({ type: 'orderToggleStatusSuccess', payload: res });
        } catch (e) {
            dispatch({ type: 'error', payload: 'Order not deleted' });
            return e;
        }
    }

    return {
        getOrders, deleteOrder, addOrder, toggleOrderStatus, state
    };
}