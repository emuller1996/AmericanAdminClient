import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DefaultLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = JSON.stringify(localStorage.getItem('token')).toString()
    console.log(token)
    if (token === 'null') {
      navigate('/login')
      console.log('REGRESAR')
    } else {
      axios
        .get(`auth/validate/${token.substring(1, token.length - 1)}`)
        .then((data) => console.log(data))
        .catch((err) => navigate('/login'))
    }
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
