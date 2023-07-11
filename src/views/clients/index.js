import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ClientTable from './ClienteTable'

const ClientCompoent = () => {
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    getAllUser()
    return () => {
      console.log('desmonte orders')
    }
  }, [])

  const getAllUser = async () => {
    const result = await axios.get('/user')
    setClientes(result.data.users)
  }

  return (
    <div className="container">
      <ClientTable clientes={clientes} />
    </div>
  )
}

export default ClientCompoent
