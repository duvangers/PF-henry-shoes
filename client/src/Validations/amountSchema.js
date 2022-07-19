import * as yup from "yup";
export const amountSchema = yup.object().shape({
  amount: yup
    .number("Debe ingresar un número")
    .typeError("Ingrese un número")
    .integer("Solo se aceptan Enteros")
    .min(1, "Ingrese un número mayor a 1")
    .max(10, "Ingrese un número menor a 10")
    .required("Campo requerido"),
});
