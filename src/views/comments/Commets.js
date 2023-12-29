/* eslint-disable prettier/prettier */
import {
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getAllCommentsService, postCreateSubCommentsService } from 'src/services/comments.services'
import CardComments from './components/CardComments'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

const Commets = () => {
  const [AllComments, setAllComments] = useState(undefined)
  const [show, setShow] = useState(false)
  const [dataComent, setdataComent] = useState(undefined)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    data.CommentId = dataComent.id
    console.log(data)

    try {
      const token = localStorage.getItem('token')
      console.log(token)
      const r = await postCreateSubCommentsService(token, data)
      console.log(r)
      toast.success(r.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllComments()
  }, [])

  const getAllComments = async () => {
    const token = localStorage.getItem('token')

    const result = await getAllCommentsService(token)
    console.log(result?.data)
    setAllComments(result?.data)
  }

  return (
    <>
      <CContainer fluid>
        <p>Comentarios</p>

        <div className="row g-3">
          {AllComments &&
            AllComments.map((c) => (
              <CardComments
                onResponse={(e) => {
                  setShow(true)
                  setdataComent(e)
                }}
                key={c.id}
                c={c}
              />
            ))}
        </div>

        <CModal
          backdrop="static"
          keyboard={false}
          size="lg"
          visible={show}
          onClose={() => setShow(false)}
        >
          <CModalHeader onClose={() => setShow(false)}>
            <CModalTitle>TALLAS</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="d-flex flex-column  gap-3" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <CFormTextarea
                  {...register('comment', { required: true })}
                  label="Respuesta"
                  rows={3}
                ></CFormTextarea>
              </div>
              <div>
                <CFormInput
                  label="Nombre"
                  {...register('write_by', { required: true })}
                  aria-describedby="exampleFormControlInputHelpInline"
                />
              </div>
              <CButton type="submit">Responser</CButton>
            </CForm>
          </CModalBody>
        </CModal>
      </CContainer>
    </>
  )
}

export default Commets
