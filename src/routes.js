import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Features
const ProductList = React.lazy(() => import('./views/product/Product'))
const Category = React.lazy(() => import('./views/category/index'))
const Orders = React.lazy(() => import('./views/orders/index'))
const OrdersUpdate = React.lazy(() => import('./views/orders/edit/index'))
const Clients = React.lazy(() => import('./views/clients/index'))
const SizeComponent = React.lazy(() => import('./views/product/sizes/index'))
const Commets = React.lazy(() => import('./views/comments/Commets'))
const Users = React.lazy(() => import('./views/users/Users'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/productos', name: 'Productos', element: ProductList, exact: true },
  { path: '/categorias', name: 'Productos / Categorias', element: Category },
  { path: '/ordenes', name: 'Ordendes', element: Orders },
  { path: '/ordenes/:id', name: 'Editar  asOrdendes', element: OrdersUpdate },
  { path: '/clientes', name: 'Clientes', element: Clients },
  { path: '/productos/tallas', name: 'Tallas', element: SizeComponent },
  { path: '/comentarios/', name: 'Commetarios', element: Commets },
  { path: '/usuarios/', name: 'Users', element: Users },
]

export default routes
