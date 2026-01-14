import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

export interface LoginRequest {
    loginName: string;
    passWord: string;
}
export interface RegisterRequest {
    loginName: string;
    memberFullName: string;
    email: string;
    passWord: string;
}
export interface UserResponse {
    memberId: string;
    memberFullName: string;
    email: string;
    loginName: string;
    phoneNumber?: string;
    roleId: string;
    isActive: boolean;
}
export interface LoginResponse {
    token: string;
    message: string;
    success: boolean;
    member: UserResponse;
}
export interface RequestPasswordRequest {
    password: string;
    confirmPassword: string;
}

export const loginAPI = async (body: LoginRequest) => {
    try {
        const url = `${API_BASE_URL}/auth/login`;
        const response = await axios.post<LoginResponse>(url, body);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const registerAPI = async (body: RegisterRequest) => {
    try {
        const url = `${API_BASE_URL}/auth/register`;
        const response = await axios.post<UserResponse>(url, body);
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}

export const verifyEmailAPI = async (email: string, code: string) => {
    try {
        const url = `${API_BASE_URL}/auth/verify-email`;
        const response = await axios.get<UserResponse>(url, {
            params: { email, code }
        });
        return response.data;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
}

export const forgotPasswordAPI = async (email: string) => {
    try {
        const url = `${API_BASE_URL}/auth/forgot-password`;
        const response = await axios.post(url, email,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
}

export const resetPasswordAPI = async (email: string, resetCode: string, resetPassword: RequestPasswordRequest) => {
    try {
        const url = `${API_BASE_URL}/auth/reset-password`;
        const response = await axios.post(url,
            {
                password: resetPassword.password,
                confirmPassword: resetPassword.confirmPassword
            }, {
            params: {
                email, resetCode
            }
        }
        );
        return response.data;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
}