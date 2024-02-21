/* eslint-disable prettier/prettier */
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { importProductsService } from 'src/services/product.services'

export default function ImportForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    console.log(data)
    const token = localStorage.getItem('token')
    const f = new FormData()
    f.append('file', data.file[0])
    try {
      const r = await importProductsService(f, token)
      console.log(r)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form
        className="d-flex flex-column gap-2 align-items-center"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Control type="file" {...register('file', { required: true })} />
        <div>
          <Button variant="primary" type="submit">
            Importt
          </Button>
        </div>
      </form>
    </div>
  )
}
