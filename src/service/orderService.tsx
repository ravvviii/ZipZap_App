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