import { useEffect } from "react";
import { useOrdersService } from "../../../services/orders";
import { Loader, ServerError } from "../../../shared";

export function CMSOrdersPage() {

    const { state, getOrders, deleteOrder, toggleOrderStatus } = useOrdersService();

    useEffect(() => {
        getOrders();
    }, []);


    return (
        <div>
            {state.pending && <Loader />}
            {state.error && <ServerError message={state.error} />}

            <table className="border-collaps table-auto w-full my-12">
                <thead>
                    <tr>
                        <th className="text-left">CLIENT / DATE</th>
                        <th className="text-left">ORDER INFO</th>
                        <th className="text-center">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {state.orders.map(item => {
                        return (<tr className="h-24" key={item.id}>
                            <td>
                                <div className="text-xl font-bold">{item.user.name}</div>
                                <div>{new Date(item.created).toDateString()}</div>
                            </td>
                            <td className="text-left">
                                <div>Total: &euro; {item.total}</div>
                                <div>{item.order.length} products</div>
                            </td>
                            <td className="text-center">
                                {item.status === 'pending' && <button className="btn primary" onClick={() => toggleOrderStatus(item.id, 'done')}>Mark as Done</button>}
                                <button className="btn danger" onClick={() => deleteOrder(item.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
}