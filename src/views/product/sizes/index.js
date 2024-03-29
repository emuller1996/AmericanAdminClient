import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const SizeComponent = () => {
  const [sizeInput, setSizeInput] = useState('')
  const [sizeAll, setSizeAll] = useState(undefined)

  useEffect(() => {
    getAllSize()
  }, [])

  const onSaveSize = async () => {
    const token = localStorage.getItem('token')
    if (sizeInput !== '') {
      try {
        const result = await axios.post(
          '/sizes',
          { size: sizeInput },
          {
            headers: { 'access-token': token },
          },
        )
        console.log(result.data)
        setSizeInput('')
        getAllSize()
      } catch (error) {
        if (error.response.status > 400) {
          toast.error(error.response.data.message)
        }
      }
    } else {
      toast.error('Talla es Requerida')
    }
  }

  const getAllSize = async () => {
    try {
      const resutl = await axios.get('/sizes')
      setSizeAll(resutl.data.sizes)
    } catch (error) {}
  }

  return (
    <>
      <div className="container">
        <h4> Gestion Tallas </h4>
        <div className="row justify-content-center align-items-start g-2">
          <div className="col-md-6">
            <div className="d-flex form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="formId1"
                id="formId1"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="formId1">Talla</label>
              <button onClick={onSaveSize} type="button" className="ms-3 btn btn-primary">
                Guardar
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <ul className="list-group ">
              {sizeAll &&
                sizeAll.map((s) => (
                  <li key={s.id} className="list-group-item py-3">
                    {`Talla : ${s.size}`}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default SizeComponent
