import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilLayers,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Ecomerce',
  },
  {
    component: CNavItem,
    name: 'Productos',
    to: '/productos',
    icon: <i className="mx-3 fa-solid fa-box"></i>,
  },
  {
    component: CNavItem,
    name: 'Cliente',
    to: '/clientes',
    icon: <i className="mx-3 fa-solid fa-users-between-lines"></i>,
  },
  {
    component: CNavItem,
    name: 'Ordenes',
    to: '/ordenes',
    icon: <i className="mx-3 fa-solid fa-truck-arrow-right"></i>,
  },
  {
    component: CNavItem,
    name: 'Comentarios',
    to: '/comentarios',
    icon: <i className="mx-3 fa-regular fa-comment"></i>,
  },
  {
    component: CNavTitle,
    name: 'Configuracion',
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/usuarios',
    icon: <i className="mx-3 fa-solid fa-user-gear"></i>,
  },
]

export default _nav
