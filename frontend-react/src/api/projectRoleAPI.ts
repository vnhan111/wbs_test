import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

export interface RoleProjectMemberResponse {
    roleId: number;
    roleName: string;
}

export const getAllRolesAPI = async () => {
    try {
        const token = localStorage.getItem("token");
        const url = `${API_BASE_URL}/projectmember/roles`;
        const response = await axios.get<RoleProjectMemberResponse[]>( url, {
            headers:{
                Authorization : `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch (error){
        console.error("Error getting all role", error);
        throw error;
    }
}