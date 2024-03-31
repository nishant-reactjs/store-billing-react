import ordersService from "../../services/orders.service"
import { RETRIEVE_ORDER } from "./types";

export const retrieve_orders = () => async (dispatch) => {
    try {
        const response = await ordersService.getList();
        dispatch({
            type: RETRIEVE_ORDER,
            payload: response.data
        });
        return Promise.resolve(response.data)
    } catch (error) {
        console.log('RETRIEVE ORDER CATCH BLOCK ERROR : ', error)
        return Promise.reject(error)
    }
}