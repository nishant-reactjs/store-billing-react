import call from "./Call";
import Call from "./Call"

class ItemService {
    getList() {
        const stockList = Call({
            path:"/items",
            method:"GET"
        })
        return {
            data: stockList
        };
    }

    getItem(id) {
        const stockDetail = call({
            path: `/itemEdit/${id}`,
            method: "GET",
        })
        return {
            data : stockDetail
        }
    }

    createItem(data) {
        const stockCreate = call({
            path: "/itemStore",
            method: "POST",
            data: data,
            
        })
        return {
            data : stockCreate
        }
    }

    updateItem(data) {
        const stockUpdate = call({
            path: "/itemUpdate",
            method: "POST",
            data: data,
        })
        return {
            data : stockUpdate
        }
    }

    deleteItem(data) {
        const stockCreate = call({
            path: "/itemDelete",
            method: "POST",
            data: data,
            
        })
        return {
            data : stockCreate
        }
    }

    bannerItem(data) {
        const stockCreate = call({
            path: "/deletehsbimg",
            method: "POST",
            data: data,
            
        })
        return {
            data : stockCreate
        }
    }


    allBanner() {
        const stockList = Call({
            path:"/getBanner",
            method:"GET"
        })
        return {
            data: stockList
        };
    }


}

export default new ItemService()