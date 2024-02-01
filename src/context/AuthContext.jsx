/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import PropTypes from 'prop-types'
import React from 'react'
import axios from 'axios'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('token') ? localStorage.getItem('token') : null,
  )
  let [user, setUser] = useState(() =>
    localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
  )


  let loginUser = async (data) => {
    let response = await axios.post('/auth', data)
    let data2 = response.data
    if (response.status === 200) {
      setAuthTokens(data2.token)
      setUser(jwtDecode(data2.token))
      localStorage.setItem('token', data2.token)
      return response
    } else {
      alert('Something went wrong!')
    }
  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
}
AuthProvider.propTypes = {
  children: PropTypes.node,
}
