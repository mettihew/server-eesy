import axios from "axios"
import {URL} from "../../utils/URL"


const order = async(data) =>{
    const response = await axios.post(`${URL}order/order`,data)
    return response.data
}
const getOrder = async() =>{
    const response = await axios.post(`${URL}order/get-order`)
    return response.data
}

const deleteCart = async() =>{
    const response = await axios.delete(`${URL}order/delete-cart`)
    return response.data
}

export const orderService = {
    order,
    getOrder,
    deleteCart
}

export default orderService