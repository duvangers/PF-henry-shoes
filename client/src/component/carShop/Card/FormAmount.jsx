import React from "react";
import { Formik, Form, Field } from "formik";
import { amountSchema } from "../../../Validations/amountSchema.js";
import { changeAmount } from "../../../redux/actions";

export default function FormAmount({ amountP, key_value, dispatch }) {
  if (!amountP) {
    amountP = 1;
    dispatch(changeAmount({ key_value, amount: 1 }));
  }
  return (
    <div>
      <Formik
        initialValues={{
          amount: amountP,
        }}
        validationSchema={amountSchema}
        onSubmit={({ amount }) => {
          dispatch(changeAmount({ key_value, amount: Number(amount) }));
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <Field name="amount" className="input" />
            {/* If this field has been touched, and it contains an error, display it
             */}
            {touched.amount && errors.amount && <div>{errors.amount}</div>}
            <button type="submit" className="submitBtn">
              <i
                className="fa fa-chevron-circle-right fa-lg"
                aria-hidden="true"
              ></i>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
