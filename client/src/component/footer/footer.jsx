import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="https://www.facebook.com/dafitiarg/" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/dafiti_arg?lang=es" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="https://www.instagram.com/dafiti_arg/?hl=es" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/dafiti-group-latam/?originalSubdomain=ar"
            className="me-4 text-reset"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/alemosmusi/ecommerce.git" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>HENRY SHOES
              </h6>
              <p>
                Somos una empresa familiar surgida de henry, nos dedicamos a ofrecerles el mejor calzado a nuestros
                clientes.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link to="/questions" className="text-dark">
                  Preguntas frecuentes
                </Link>
              </p>
              <p>
                <Link to="/" className="text-dark">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/terms" className="text-dark">
                  Terms
                </Link>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4">
        © 2022 Copyright:
        <Link to="/copyright" className="text-reset fw-bold">
          ALUMNOSHENRY
        </Link>
      </div>
    </footer>
  )
}
