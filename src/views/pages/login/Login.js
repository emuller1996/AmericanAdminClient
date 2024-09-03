import React, { useContext, useState } from 'react'
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthContext from 'src/context/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' })
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const { loginUser } = useContext(AuthContext)

  const navigate = useNavigate()
  const onLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(undefined)
    if (user.username === '' || user.password === '') {
      toast.error('el usuario y la contraseña son requeridas')
      setLoading(false)
      return false
    }
    try {
      const result = await loginUser(user)
      console.log(result.data)
      localStorage.setItem('token', result.data.token)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setError({
        message: error?.response?.data?.message,
        code: error?.response?.status,
        detail: error?.response?.data?.detail,
      })
    } finally {
      setLoading(false)
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
                  <CForm autoComplete="off" onSubmit={onLogin}>
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
                      />
                    </CInputGroup>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        <strong className="d-block">{error.message}</strong>
                        <span className="d-block">{error.detail}</span>
                      </div>
                    )}

                    {loading && (
                      <div className="text-center p-4 mx-auto">
                        <CSpinner color="secondary" />
                      </div>
                    )}

                    <CRow className="justify-content-center">
                      <CCol xs={1}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
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
