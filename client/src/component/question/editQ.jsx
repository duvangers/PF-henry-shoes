import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createQuestion, getQuestions } from '../../redux/actions'
import EditQ from './editQuestion'

export function Questions() {
  const questions = useSelector(state => state.Questions)
  const qdel = useSelector(state => state.Qdelete)
  const [inputQ, setinputQ] = useState('')
  const [inputA, setinputA] = useState('')
  const [trueB, setTrueB] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getQuestions())
  }, [qdel])

  const [input, setInput] = useState({
    question: '',
    answers: '',
  })
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const changeT = function () {
    setTrueB(true)
  }

  useEffect(() => {
    if (input.question.length > 2 && input.answers.length > 2) {
      dispatch(createQuestion(input))
    }

    input.question = ''
    input.answers = ''
  }, [trueB])
  const changeF = function () {
    setTrueB(false)
  }

  return (
    // <div className="questions">
    //     {
    //         questions && questions.length>0 ? questions.map((q)=><div className="col-lg-12 col-md-12 mb-4"><h1>{q.question}</h1><p>{q.answers}</p></div>):""
    //     }

    // </div>
    <div className="questions">
      {questions && questions.length > 0
        ? questions.map(q => <EditQ key={q.id} id={q.id} question={q.question} answers={q.answers}></EditQ>)
        : ''}
      {trueB === false ? (
        <button className="btn btn-warning" onClick={changeT}>
          +
        </button>
      ) : (
        <>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3">
              QUESTIONS
            </span>
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              onChange={handleInputChange}
              name="question"
            />
          </div>
          <div class="input-group">
            <span class="input-group-text">ANSWERS</span>
            <textarea
              class="form-control"
              aria-label="With textarea"
              onChange={handleInputChange}
              name="answers"
            ></textarea>
          </div>
          {input.question.length > 1 && input.answers.length > 1 ? (
            <button className="btn btn-success" onClick={changeF}>
              +
            </button>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  )
}
