import { verifyEmailAPI } from './../api/authAPI';
import Store from "../store/Store";
import { loginAPI, registerAPI, type LoginRequest, type RegisterRequest } from "../api/authAPI";
import { successLogin, failLogin, successRegister, failRegister, logout, successVerify, failVerify } from "../redux/slice/authSlice";

const { dispatch } = Store;

export class AuthService {
  static async login(userData: LoginRequest) {
    try {
      console.log("AuthService: Start login");
      const response = await loginAPI(userData);
      if (response) {
        console.log("AuthService: Login successful");
        dispatch(
          successLogin({
            token: response.token,
            user: response.user,
            message: response.message,
            success: response.success,
          })
        );
        return { success: true, data: response };
      } else {
        console.log("AuthService: Login failed");
        dispatch(failLogin("Login failed"));
        return { success: false };
      }
    } catch (err: unknown) { 
      console.error("AuthService: Login error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Login failed";
      dispatch(failLogin(errorMessage));
      return { success: false, error: errorMessage };
    }
  }

  static async register(userData: RegisterRequest) {
    try {
      console.log("AuthService: Start register");
      const response = await registerAPI(userData);
      if (response) {
        console.log("AuthService: Register successful");
        dispatch(
          successRegister(
            response
          )
        );
        return { success: true, data: response };
      } else {
        console.log("AuthService: Register failed");
        dispatch(failRegister("Register failed"));
        return { success: false };
      }
    } catch (err: unknown) { // ← Thay any thành unknown
      console.error("AuthService: Register error:", err);
      // An toàn type: giả sử err có thể là AxiosError hoặc Error
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Register failed";
      dispatch(failRegister(errorMessage));
      return { success: false, error: errorMessage };
    }
  }

  static async verifyEmail(email: string, code: string){
    try {
      console.log("AuthService: Starting verification process");

      const res = await verifyEmailAPI(email, code);

      console.log("AuthService: Verification successful");
      dispatch(successVerify());
      return { success: true, data: res };
    } catch (err: unknown) {
      console.error("AuthService: Verification error:", err);
      const errorMessage = err instanceof Error? err.message : "Verification failed";
      dispatch(failVerify(errorMessage));
      return { success: false, error: errorMessage };
    }
  }

  static logout() {
    try {
      console.log("AuthService: Start logout");
      dispatch(logout());
      console.log("AuthService: Logout successful");
      return { success: true };
    } catch (err: unknown) {
      console.error("AuthService: Logout error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Logout failed";
      return { success: false, error: errorMessage };
    }
  }
}