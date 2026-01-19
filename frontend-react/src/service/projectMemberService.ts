import Store from "../store/Store";
import { AddMemberAPI, getAllMembersByProjectIdAPI, type AddMemberRequest } from "../api/projectMemberAPI";
import { setProjectMembers, setError, setLoading, addMember } from "../redux/slice/projectMemberSlice";

const { dispatch } = Store;

export class ProjectMemberService {
    static async getAllMembersByProjectId(projectId: number) {
        try {
            console.log("ProjectMemberService: Start fetch all members by project ID ", projectId);
            dispatch(setLoading(true));
            const projectMembers = await getAllMembersByProjectIdAPI(projectId);
            if (projectMembers) {
                console.log("ProjectMemberService: Fetch project members successful");
                dispatch(setProjectMembers(projectMembers));
                return { success: true, data: projectMembers };
            } else {
                console.log("ProjectMemberService: No data received");
                dispatch(setError("No project members found"));
                return { success: false, error: "No project members found" };
            }
        } catch (err: unknown) {
            console.error("ProjectMemberService: Fetch project members error:", err);
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred while fetching project members";
            dispatch(setError(errorMessage));
            return { success: false, error: errorMessage };
        }
    }

    static async addMember(projectId: number, data: AddMemberRequest) {
        try {
            console.log("ProjectMemberService: Start adding member", data);
            dispatch(setLoading(true));

            const response = await AddMemberAPI(projectId, data);

            if (response) {
                console.log("ProjectMemberService: Member adding successfully", response);
                dispatch(addMember(response));
                return { success: true, data: response };
            } else {
                throw new Error("Failed to add member - empty response");
            }
        } catch (err: unknown) {
            console.error("ProjectMemberService: Add member failed", err);
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred while adding member";

            dispatch(setError(errorMessage));
            return { success: false, error: errorMessage };
        } finally {
            dispatch(setLoading(false));
        }
    }
}