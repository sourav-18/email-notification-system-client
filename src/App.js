import React, { useEffect, useState } from 'react'
import Login from './components/organization/Login.component'
import AdminLogin from './components/admin/Login.component'
import AlertMessage from './components/common/AlertMessage.component'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar.component'
import NotFound from './components/common/NotFound.component'
import Credentials from './components/organization/Credentials.component'
import Notification from './components/organization/Notification.component'
import Organizations from './components/admin/Organizations.component'
import CredentialsForAdmin from './components/admin/Credentials.component'
import NotificationForAdmin from './components/admin/Notifications.component'
import Signup from './components/organization/Signup.component'
import LoginProfile from './components/common/LoginProfile.component'
import LogoutProfile from './components/common/LogoutProfile.component.jsx'
import constantData from './utils/constant.util.js'
import { removeUserDataFormLocalStorage } from './utils/fun.util.js'
import adminApi from "./services/admin.service.js";
import organizationApi from "./services/organization.service.js";
import { AllState } from './context/Context.jsx'
import ProtectedOrganizationRoutes from './utils/ProtectedOrganizationRoutes.util.js'
import ProtectedAdminRoutes from './utils/ProtectedAdminRoutes.util.js'
import ApiDocs from './components/common/ApiDocs.component.jsx'

function App() {

  const { dispatch, state: { adminProfile, organizationProfile, loadProfile } } = AllState();
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  async function handleLoadProfile() {
    dispatch({ type: constantData.reducerActionType.removeAllProfileData });
    const currentUser = localStorage.getItem("user-type");
    if (currentUser === constantData.userType.admin) {
      const apiRes = await adminApi.admin.profileDetails();
      if (apiRes.status == "success") {
        dispatch({
          type: constantData.reducerActionType.adminProfileSet,
          payload: apiRes.data
        });
      } else {
        removeUserDataFormLocalStorage();
      }
    } else if (currentUser === constantData.userType.organization) {
      const apiRes = await organizationApi.profileDetails();
      if (apiRes.status == "success") {
        console.log(apiRes.data)
        dispatch({
          type: constantData.reducerActionType.organizationProfileSet,
          payload: apiRes.data
        });
      } else {
        removeUserDataFormLocalStorage();
      }
    }

    setIsProfileLoading(false);
    return;

  }

  useEffect(() => {
    handleLoadProfile();
  }, [loadProfile])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black'>
      <AlertMessage />
      <Router>
        <Navbar />
        {adminProfile || organizationProfile ? <LogoutProfile /> : <LoginProfile />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/api-docs' element={<ApiDocs/>} />

          <Route element={<ProtectedOrganizationRoutes isProfileLoading={isProfileLoading} />}>
            <Route path='/' element={<Credentials />} />
            <Route path='/notifications' element={<Notification />} />
          </Route>

          <Route element={<ProtectedAdminRoutes isProfileLoading={isProfileLoading} />}>
            <Route path='/admin/organizations' element={<Organizations />} />
            <Route path='/admin/credentials' element={<CredentialsForAdmin />} />
            <Route path='/admin/notifications' element={<NotificationForAdmin />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App