import axios from "axios";
// import { BASE_URl } from "./config";

export const BASE_URL = 'https://zipzap-server.onrender.com/api';
export const SOCKET_URL = 'https://zipzap-server.onrender.com';

export const getAllCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data
      
    } catch (error) {
      console.error("Error while fetching categories", error);
      
     
    }
  };
  



  export const getProductsByCategoryId = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching products", error);
    }
  };
  