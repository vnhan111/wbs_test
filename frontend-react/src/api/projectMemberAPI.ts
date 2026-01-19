import axios from 'axios';
import { API_BASE_URL } from '../utils/constant';

export interface ProjectMemberResponse {
    mediateProjectMemberId: number;
    memberId: number;
    memberFullName: string;
    roleId: number;
    roleName?: string;
    startDate?: string;
    endDate?: string;
    isCurrent: boolean;
}

export interface AddMemberRequest {
    memberId: number;
    roleId: number;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
}

export const getAllMembersByProjectIdAPI = async (projectId: number) => {
    try {
        const token = localStorage.getItem('token');
        const url = `${API_BASE_URL}/projectmember/${projectId}`;
        const response = await axios.get<ProjectMemberResponse[]>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching project members:', error);
        throw error;
    }
}

export const AddMemberAPI = async (projectId: number, body: AddMemberRequest) => {
    try {
        const token = localStorage.getItem("token");
        const url = `${API_BASE_URL}/projectmember/${projectId}`;
        const response = await axios.post<ProjectMemberResponse>(url, body, {
            headers: {
                Authorization : `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch(error) {
        console.error("Error adding member", error);
        throw error;
    }
}