/* eslint-disable prettier/prettier */
import { CForm, CFormInput } from '@coreui/react'
import React from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { postCreateUsersAdminService } from '../services/users.services'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'

export default function FormUser({ loadData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    console.log(data)

    try {
      const token = localStorage.getItem('token')

      const r = await postCreateUsersAdminService(token, data)
      console.log(r)
      await loadData()
      toast.success(r.data.message)
      reset()
    } catch (error) {}
  }
  return (
    <>
      <CForm autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-4 ">
          <div className="col-md-6">
            <CFormInput
              {...register('username', { required: true })}
              type="text"
              label="Username"
              text=""
            />
          </div>
          <div className="col-md-6">
            <CFormInput
              {...register('name', { required: true })}
              type="text"
              label="Nombre"
              text=""
            />
          </div>
          <div className="col-md-6">
            <CFormInput
              {...register('password', { required: true })}
              type="password"
              label="Contraseña"
              text=""
            />
          </div>
          <div className="col-md-6">
            <label className="mb-2" htmlFor="">
              Rol
            </label>
            <Form.Select {...register('role', { required: true })}>
              <option value={'Admin'}>Administrador</option>
              <option value={'Asesor'}>Asesor</option>
            </Form.Select>
          </div>
          <div className=" text-center ">
            <button type="submit" className=" btn btn-success ">
              <i className="fa-regular fa-floppy-disk me-2"></i>
              Guardar
            </button>
          </div>
        </div>
      </CForm>
    </>
  )
}
FormUser.propTypes = {
  loadData: PropTypes.func,
}
