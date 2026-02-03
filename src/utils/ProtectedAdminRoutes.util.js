import { Navigate, Outlet } from "react-router-dom";
import { AllState } from "../context/Context";

export default function ProtectedAdminRoutes({ isProfileLoading }) {
    if (isProfileLoading) return null;
    const { state: { adminProfile } } = AllState();
    return adminProfile ? <Outlet /> : <Navigate to="/admin/login" />
}