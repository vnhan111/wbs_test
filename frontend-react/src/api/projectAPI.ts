import axios from "axios";

export interface ProjectResponse {
    projectId: number;
    projectCode: string;
    projectName: string;
    expectedStartDate?: string;
    expectedEndDate?: string;
    actualStartDate?: string;
    actualEndDate?: string;
    workProgress: number;
    estimateTime?: string;
    spentTime?: string;
    projectDeleteStatus: boolean;
    memberAuthorId?: number;
    authorFullName?: string;
    projectStatusId?: number;
    projectStatusName?: string; 
}

export interface CreateProjectRequest{
    projectCode: string;
    projectName: string;
    projectStatusId: number;
    expectedStartDate?: string;
    expectedEndDate?: string;
    memberAuthorId: number;
}

export interface UpdateProjectRequest{
    projectCode: string;
    projectName: string;
    projectStatusId: number;
    expectedStartDate?: string;
    expectedEndDate?: string;
    actualStartDate?: string;
    actualEndDate?: string;
    workProgress?: number;
    estimateTime?: number;
    spentTime?: number;
}

export const getAllProjectAPI = async () => {
    try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:5075/api/project`;
        const response = await axios.get<ProjectResponse[]>(url, {
            headers: {
                Authorization : `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch (error){
        console.error("Error getting all project", error);
        throw error;
    }
};

export const getProjectByIdAPI = async (projectId: number) => {
    try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:5075/api/project/${projectId}`;
        const response = await axios.get<ProjectResponse>(url, {
            headers: {
                Authorization : `Bearer ${token}`, 
            },
        });
        return response.data;
    }catch (error){
        console.error("Error getting project by id", error);
        throw error;
    }
}

export const createProjectAPI = async (body: CreateProjectRequest) => {
    try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:5075/api/project/create`;
        const response = await axios.post<ProjectResponse>(url, body, {
            headers: {
                Authorization : `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch(error) {
        console.error("Error creating project", error);
        throw error;
    }
}

export const updateProjectAPI = async (projectId: number, body: UpdateProjectRequest) => {
    try{
        const token = localStorage.getItem("token");
        const url = `http://localhost:5075/api/project/update/${projectId}`;
        const response = await axios.patch<ProjectResponse>(url, body, {
            headers: {
                Authorization : `Bearer ${token}`, 
            },
        });
        return response.data;
    } catch(error) {
        console.error("Error updating project", error);
        throw error;
    }
}

export const deleteProjectAPI = async (projectId: number): Promise<boolean> => {
    try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:5075/api/project/delete/${projectId}`;

        const response = await axios.delete<boolean>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
};