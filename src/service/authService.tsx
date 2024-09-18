import { useAuthStore } from "@state/authStore";
import { tokenStorage } from "@state/storage";
import { resetAndNavigate } from "@utils/NavigationUtils";
import axios from "axios";
import { appAxios } from "./apiinterceptors";
import { BASE_URl } from "./config";






export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URl}/customer/login`, { phone });
    const { accessToken, refreshToken, customer } = response.data;

    if (accessToken && refreshToken) {
      tokenStorage.set("accessToken", accessToken);
      tokenStorage.set("refreshToken", refreshToken);
    } else {
      console.error("Missing tokens in response");
    }

    const { setUser } = useAuthStore.getState();
    if (customer) {
      setUser(customer);
    } else {
      console.error("Missing customer data in response");
    }
  } catch (error) {
    console.error("Login Error", error);
    
    throw new Error("Failed to login. Please try again.");
  }
};






export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URl}/delivery/login`, { email,password });
    const { accessToken, refreshToken, deliveryPartner } = response.data;

    if (accessToken && refreshToken) {
      tokenStorage.set("accessToken", accessToken);
      tokenStorage.set("refreshToken", refreshToken);
    } else {
      console.error("Missing tokens in response");
    }

    const { setUser } = useAuthStore.getState();
    if (deliveryPartner) {
      setUser(deliveryPartner);
    } else {
      console.error("Missing deliveryPartner data in response");
    }
  } catch (error) {
    console.error("Login Error", error);
    
    throw new Error("Failed to login. Please try again.");
  }
};





export const refresh_tokens = async () => {
  try {
      const refreshToken = tokenStorage.getString('refreshToken');
      const response = await axios.post(`${BASE_URl}/refresh-token`, { refreshToken });
      
      const new_access_token = response.data.accessToken;
      const new_refresh_token = response.data.refreshToken;

      tokenStorage.set('accessToken', new_access_token);
      tokenStorage.set('refreshToken', new_refresh_token);

      return new_access_token;
  } catch (error) {
      console.log('REFRESH TOKEN', error);
      tokenStorage.clearAll()
      resetAndNavigate("CustomerLogin")
  }
};




export const refetchUser = async (setUser:any) => {
  try {
     
      const response = await appAxios.get(`/user`)
      
        setUser(response.data.user)

     
  } catch (error) {
      console.log("Login Error", error);
      
  }
};

