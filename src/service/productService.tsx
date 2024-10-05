import axios from "axios";
import { BASE_URl } from "./config";



export const getAllCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URl}/categories`);
      return response.data
      
    } catch (error) {
      console.error("Error while fetching categories", error);
      
     
    }
  };
  



  export const getProductsByCategoryId = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URl}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching products", error);
    }
  };
  