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
    const result = await axios.get('http://localhost:3001/user')
    console.log(result.data)
    setClientes(result.data.users)
  }

  return (
    <div className="container">
      <ClientTable clientes={clientes} />
    </div>
  )
}

export default ClientCompoent
