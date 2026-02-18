import { ContactFormData } from "@/schemas/contact";
import { LoginFormData } from "@/schemas/login";
import { ResetPasswordState } from "@/schemas/resetPassword";
import axios, { AxiosInstance } from "axios";

class Api {
  private client: AxiosInstance;
  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseURL) {
      console.warn("Base url is missing in environment variables.");
    }

    this.client = axios.create({
      baseURL,
    });
  }

  async handleRegister(body: ContactFormData) {
    try {
      const res = await this.client.post(`/auth/register`, body, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async handleLogin(body: LoginFormData) {
    try {
      const res = await this.client.post(`/auth/login`, body, {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async handleMe() {
    try {
      const res = await this.client.get("/auth/me", { withCredentials: true });

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async handleForgotPassword(email: string) {
    try {
      const res = await this.client.post(
        "/auth/forgot-password",
        { email },
        {
          withCredentials: true,
        },
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async handleLogout() {
    try {
      const res = await this.client.post(
        "/auth/logout",
        {},
        { withCredentials: true },
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async handleResetPassword(formData: ResetPasswordState) {
    try {
      const res = await this.client.post("/auth/reset-password", formData, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const API = new Api();

export default API;
