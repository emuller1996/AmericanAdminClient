import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' })
  const [error, setError] = useState()
  const navigate = useNavigate()
  const onLogin = async (e) => {
    e.preventDefault()

    try {
      const result = await axios.post('/auth', user)
      console.log(result.data)
      localStorage.setItem('token', result.data.token)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setError({ message: error.response.data.message, code: error.response.status })
    }
  }

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CCardGroup>
              <CCard className="p-2">
                <CCardBody>
                  <CForm onSubmit={onLogin}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        onChange={handleInput}
                        value={user.usermane}
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        onChange={handleInput}
                        value={user.password}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        ERORR{`::${error.code}`}{' '}
                        <strong className="d-block">{error.message}</strong>
                      </div>
                    )}
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
