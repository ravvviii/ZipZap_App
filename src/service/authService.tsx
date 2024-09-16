import { useAuthStore } from "@state/authStore";
import { tokenStorage } from "@state/storage";
import axios from "axios";
import { BASE_URl } from "./config";


export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URl}/customer/login`, { phone });
    const { accessToken, refreshToken, customer } = response.data;

    tokenStorage.set("accessToken", accessToken);
    tokenStorage.set("refreshToken", refreshToken);

    const { setUser } = useAuthStore.getState();
    setUser(response.data.customer);

   
  } catch (error) {
    console.log("Login Error", error);
  }
};
