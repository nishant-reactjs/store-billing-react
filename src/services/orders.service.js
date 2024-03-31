import OrderData from '../data/order.json';
import call from './Call';

class OrdersService {
    getList() {
        const Orders = call({
            path:"/orders",
            method:"GET"
        })
        return {
            data: Orders
        };
    }
}

export default new OrdersService()