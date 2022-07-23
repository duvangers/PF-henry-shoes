import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions } from '../../redux/actions'

export function Questions() {
  const questions = useSelector(state => state.Questions)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])

  return (
    <div className="col-6">
      {questions && questions.length > 0
        ? questions.map(q => (
            <div className="accordion-item " key={q.id}>
              <div className="accordion-item">
                <h2 className="accordion-header" id={`panelsStayOpen-heading${q.id}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#panelsStayOpen-collapse${q.id}`}
                    aria-expanded="false"
                    aria-controls={`panelsStayOpen-collapse${q.id}`}
                  >
                  <strong>{q.question}</strong>  
                  </button>
                </h2>
                <div
                  id={`panelsStayOpen-collapse${q.id}`}
                  className="accordion-collapse collapse show"
                  aria-labelledby={`panelsStayOpen-heading${q.id}`}
                >
                  <div className="accordion-body">
                    <strong>{q.answers}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ''}
    </div>
  )
}
