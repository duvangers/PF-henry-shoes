import React from 'react'
import NewFeatures from './newFeatures'

function ContenedorFeatures() {
  return (
    <div>
         <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingOne">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <h3><strong>Aquí para crear nuevas brand y categories</strong></h3>
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body"><NewFeatures/></div>
    </div>
  </div>
</div> 

    </div>
  )
}
export default ContenedorFeatures