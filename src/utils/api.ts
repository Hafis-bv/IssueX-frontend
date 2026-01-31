import { ContactFormData } from "@/schemas/contact";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

class Api {
  async handleRegister(body: ContactFormData) {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, body);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}

const API = new Api();

export default API;
