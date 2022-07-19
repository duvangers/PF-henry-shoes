import React, { useEffect } from 'react'
import './style.css'

export default function Copyright() {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://platform.linkedin.com/badges/js/profile.js'
    script.async = true
    script.defer = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className='container'>
      <div class="row align-items-start">

      <div
        className="badge-base LI-profile-badge col"
        data-locale="es_ES"
        data-size="medium"
        data-theme="light"
        data-type="HORIZONTAL"
        data-vanity="agu-lemos-fullstack-web-development"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://es.linkedin.com/in/agu-lemos-fullstack-web-development?trk=profile-badge"
        ></a>
      </div>
      <div
        class="badge-base LI-profile-badge col"
        data-locale="es_ES"
        data-size="medium"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="diegopizarro10"
        data-version="v1"
      >
        <a
          class="badge-base__link LI-simple-link"
          href="https://ar.linkedin.com/in/diegopizarro10?trk=profile-badge"
        ></a>
      </div>
      <div
        class="badge-base LI-profile-badge col"
        data-locale="es_ES"
        data-size="medium"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="alexis1614"
        data-version="v1"
      >
        <a
          class="badge-base__link LI-simple-link"
          href="https://ar.linkedin.com/in/alexis1614?trk=profile-badge"
        ></a>
      </div>
      </div>
     </div>
  )
}
