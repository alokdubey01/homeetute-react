import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from './HOC/AuthContext'

export default function PrivateRoute() {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/login" />
}
