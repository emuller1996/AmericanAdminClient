/* eslint-disable prettier/prettier */
import {
  CCard,
  CCloseButton,
  CContainer,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import './index.scss'
import FormUser from './components/FormUsers'
import { getAllUsersAdminService } from './services/users.services'
import ListUsers from './components/ListUsers'
const Users = () => {
  const [visible, setVisible] = useState(false)
  const [AllUsers, setAllUsers] = useState(undefined)

  useEffect(() => {
    getAllUsersAs()
  }, [])

  const getAllUsersAs = async () => {
    try {
      const token = localStorage.getItem('token')

      const t = await getAllUsersAdminService(token)
      console.log(t.data)
      setAllUsers(t.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CContainer>
        <div className="d-flex ">
          <button className="btn btn-info text-white  " onClick={() => setVisible(true)}>
            <i className="me-2 fa-solid fa-circle-plus"></i>Crear Nuevo Usuario
          </button>
        </div>

        <div>{AllUsers && <ListUsers users={AllUsers} />}</div>

        <COffcanvas
          backdrop="static"
          placement="end"
          className="myoffcanvas"
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader>
            <COffcanvasTitle>Crear Nuevo Usuario</COffcanvasTitle>
            <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
          </COffcanvasHeader>
          <COffcanvasBody>
            <FormUser loadData={getAllUsersAs} />
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </>
  )
}

export default Users
