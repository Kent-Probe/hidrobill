import { defineStore } from "pinia";
import { RegisterDataUser, User } from "../models/user";
import { cookieStorage } from "../plugins/cookieAdapter";
import { login, register, updateUserState } from "../services/auth/auth";

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
    result: {
      success: false,
      message: "",
    },
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
    async registerUser(registerUser: RegisterDataUser): Promise<void> {
      this.loading = true;
      try {
        const dataToSend = {
          names: registerUser.names,
          lastnames: registerUser.lastnames,
          username: registerUser.username,
          password: registerUser.password,
        };
        const result = await register(dataToSend);
        this.result = {
          success: result.success,
          message: result.message,
        };
      } catch (error) {
        this.result = {
          success: false,
          message: error instanceof Error ? error : "Error desconocido",
        };
      } finally {
        this.loading = false;
      }
    },
    async updateUser(id: string, state: string): Promise<void> {
      this.loading = true;
      try {
        const result = await updateUserState(id, state);
        this.result = {
          success: result.success,
          message: result.message,
        };
      } catch (error) {
        this.result = {
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
        };
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
  persist: {
    storage: cookieStorage,
  },
});
