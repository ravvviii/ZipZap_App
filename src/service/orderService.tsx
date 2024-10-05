import { appAxios } from "./apiinterceptors";

export const createOrder = async (items:any, totalPrice:number) => {
    try {
       
        const response = await appAxios.post(`/order`,{
            items:items,
            branch:'66e316640109abd5720c8815',
            totalPrice:totalPrice
        })
        
         return response.data
  
       
    } catch (error) {
        console.log("Create order Error", error);
        return null
        
    }
  };

  export const getOrderById = async (id:string) => {
    try {
       
        const response = await appAxios.get(`/order/${id}`)
        
         return response.data
  
       
    } catch (error) {
        console.log("Fetch order Error", error);
        return null
        
    }
  };

  export const fetchCustomerOrders = async (userId:string) => {
    try {
       
        const response = await appAxios.get(`/order?customerId=${userId}`)
        
         return response.data
  
       
    } catch (error) {
        console.log("Fetch Customer order Error", error);
        return null
        
    }
  };