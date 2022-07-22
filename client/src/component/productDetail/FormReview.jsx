import "./FormReview.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { reviewSchema } from "../../Validations/amountSchema";
import { createReview } from "../../redux/actions";

function FormReview({
  userRating,
  setUserRating,
  userId,
  dispatch,
  productId,
}) {
  let arrRating = new Array(5).fill(0, 0).map((e, i) => {
    return i < userRating ? (e = 1) : e;
  });

  const handleClick = (e) => {
    e.preventDefault();
    setUserRating(e.target.id);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        title: "",
        comment: "",
      }}
      validationSchema={reviewSchema}
      onSubmit={(values) => {
        // console.log({ ...values, rating: userRating, productId }, userId);
        dispatch(
          createReview({ ...values, rating: userRating, productId }, userId)
        );
        //  dispatch(createReview(values,id));
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            <Form>
              <div className="form-row">
                <label className="name">Nombre</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className={errors.name && touched.name ? "input-error" : null}
                />
                <ErrorMessage name="name" component="span" className="error" />
              </div>
              <div className="form-row">
                <label className="name">E-mail</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="email" component="span" className="error" />
              </div>
              <div className="form-row">
                <label className="titles">Título</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className={
                    errors.title && touched.title ? "input-error" : null
                  }
                />

                <ErrorMessage name="title" component="span" className="error" />
              </div>
              <div className="form-rating">
                <label className="titles">Rating:</label>
                <div className="ratings">
                  {/* <input type="radio" name="rating" value="5" id="5" />
                  <label htmlFor="5">☆</label>
                  <input type="radio" name="rating" value="4" id="4" />
                  <label htmlFor="4">☆</label>
                  <input type="radio" name="rating" value="3" id="3" />
                  <label htmlFor="3">☆</label>
                  <input type="radio" name="rating" value="2" id="2" />
                  <label htmlFor="2">☆</label>
                  <input type="radio" name="rating" value="1" id="1" />
                  <label htmlFor="1">☆</label> */}
                  {arrRating &&
                    arrRating?.map((s, i) => (
                      <i
                        key={i}
                        id={i + 1}
                        className={`fa star-form ${
                          s === 1 ? "fa-star" : "fa-star grey"
                        } `}
                        onClick={(e) => handleClick(e)}
                      ></i>
                    ))}
                </div>
              </div>

              <div className="form-row">
                <label className="comment">Comentario</label>
                <Field
                  type="textarea"
                  name="comment"
                  id="comment"
                  className={
                    errors.comment && touched.comment ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="comment"
                  component="span"
                  className="error"
                />
              </div>
              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
                // onClick={(e)=>handleSubmit(e)}
              >
                Enviar Review
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default FormReview;
