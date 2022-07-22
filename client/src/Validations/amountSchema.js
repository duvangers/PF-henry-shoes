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
export const reviewSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Ingrese un nombre más largo")
    .max(50, "Ingrese menos de 50 caracteres")
    .required("Campo requerido"),

  title: yup.string().max(100, "Ingrese menos de 100 caracteres"),
  comment: yup.string().max(5000, "Ingrese menos de 5000 caracteres"),
  email: yup.string().email("Dirección no válida").required("Campo Requerido"),
});
