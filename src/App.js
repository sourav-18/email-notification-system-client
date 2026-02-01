import React from 'react'
import Login from './components/organization/Login.component'
import AdminLogin from './components/admin/Login.component'
import AlertMessage from './components/common/AlertMessage.component'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar.component'
import NotFound from './components/common/NotFound.component'
import Credentials from './components/organization/Credentials.component'
import Notification from './components/organization/Notification.component'
import Organizations from './components/admin/Organizations.component'

function App() {

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black'>
      <AlertMessage />
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/credentials' element={<Credentials />} />
          <Route path='/notifications' element={<Notification/>} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/organizations' element={<Organizations />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App