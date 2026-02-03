import { Navigate, Outlet } from "react-router-dom";
import { AllState } from "../context/Context";

export default function ProtectedOrganizationRoutes({ isProfileLoading }) {
    if (isProfileLoading) return null;
    const { state: { organizationProfile } } = AllState();
    return organizationProfile ? <Outlet /> : <Navigate to="/login" />
}