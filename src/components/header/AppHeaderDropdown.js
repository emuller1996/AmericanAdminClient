import React, { useContext } from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilArrowThickFromLeft, cilFile } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import AuthContext from 'src/context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const { logoutUser, user } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={'https://american-shop-eco.vercel.app/assets/img/Logo.png'} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Usuario</CDropdownHeader>
        <div
          className="mx-3 d-flex flex-column gap-0 my-1 text-center "
          style={{ fontSize: '0.8em', fontWeight: 'bolder' }}
        >
          <b className="my-2">{user.name}</b>
          <div className="d-flex  justify-content-between  gap-0 align-items-start">
            <b>Usuario </b>
            <span className="">{user.username}</span>
          </div>
          <div className="d-flex  justify-content-between  gap-0 align-items-start">
            <b>Role</b>
            <span className="">{user.role}</span>
          </div>
        </div>
        <CDropdownHeader className="bg-light fw-semibold py-2"></CDropdownHeader>

        {/* <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <div className="text-center mt-2">
          <CButton
            color="danger"
            className="text-white"
            size="sm"
            onClick={() => {
              logoutUser()
              navigate('/login')
            }}
          >
            <CIcon icon={cilArrowThickFromLeft} className="me-2" />
            Cerrar Session
          </CButton>
        </div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
