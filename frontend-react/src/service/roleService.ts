import Store from "../store/Store";
import { getAllRolesAPI } from "../api/projectRoleAPI";
import {setLoading, setRoles, setError, } from "../redux/slice/roleSlice";

const { dispatch } = Store;
export class RoleService {
    static async getAllRoles() {
        try {
                    console.log("RoleService: Start fetch all roles");
                    dispatch(setLoading(true));
                    const roles = await getAllRolesAPI();
                    if (roles) {
                        console.log("RoleService: Fetch roles successful");
                        dispatch(setRoles(roles));
                        return { success: true, data: roles };
                    } else {
                        console.log("RoleService: No data received");
                        dispatch(setError("No roles found"));
                        return { success: false, error: "No roles found" };
                    }
                } catch (err: unknown) {
                    console.error("RoleService: Fetch roles error:", err);
                    const errorMessage =
                        err instanceof Error
                            ? err.message
                            : "An unknown error occurred while fetching roles";
                    dispatch(setError(errorMessage));
                    return { success: false, error: errorMessage };
                }
    }
}