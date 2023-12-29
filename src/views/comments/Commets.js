/* eslint-disable prettier/prettier */
import { CContainer } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getAllCommentsService } from 'src/services/comments.services'
import CardComments from './components/CardComments'

const Commets = () => {
  const [AllComments, setAllComments] = useState(undefined)

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
          {AllComments && AllComments.map((c) => <CardComments key={c.id} c={c} />)}
        </div>
      </CContainer>
    </>
  )
}

export default Commets
