import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteQuestions } from '../../redux/actions'

export default function EditQ({ id, question, answers }) {
  const dispatch = useDispatch()

  const eliminar = function () {
    dispatch(deleteQuestions(id))
  }

  return (
    <div>
      <p>
        {question}{' '}
        <button className="btn btn-danger" onClick={eliminar}>
          X
        </button>
      </p>
    </div>
  )
}
