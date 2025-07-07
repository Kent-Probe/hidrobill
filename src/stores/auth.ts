import { defineStore } from "pinia";
import { User } from "../models/user";
import { cookieStorage } from "../plugins/cookieAdapter";
import { login } from "../services/auth/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      name: "",
      username: "",
    } as User,
    token: "",
    isError: false,
    error: {
      message: "",
    },
    loading: false,
  }),
  actions: {
    async login(username: string, password: string): Promise<User> {
      this.isError = false;
      this.loading = true;
      try {
        const userResult = await login(username, password);
        this.user = {
          name: userResult.user.name,
          username: userResult.user.username,
        };
        this.token = userResult.token;
        return {
          username: userResult.username,
          name: userResult.name,
        };
      } catch (error) {
        this.isError = true;
        this.error.message = error;
        return {
          username: "",
          name: "",
        };
      } finally {
        this.loading = false;
      }
    },
    autoLogin() {
      const token = this.token;
      if (token) {
        try {
          // Verify token is still valid
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));
          const currentTime = Date.now() / 1000;

          if (tokenPayload.exp && tokenPayload.exp > currentTime) {
            return true;
          } else {
            // Token expired, clear data
            this.token = "";
            this.user = { name: "", username: "" };
          }
        } catch (error) {
          console.error("Invalid token format");
          this.token = "";
          this.user = { name: "", username: "" };
        }
      }
      return false;
    },
    logout() {
      this.token = "";
      this.user = { name: "", username: "" };
      this.isError = false;
      this.error.message = "";
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
  persist: {
    storage: cookieStorage,
  },
});
