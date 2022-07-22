import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {createBrands , createCategories ,getAllCategories,getAllBrands} from "../../redux/actions/index.js"
const NewFeatures = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(getAllBrands())
   dispatch(getAllCategories())
  },[dispatch])
  const Brands = useSelector(state => state.Brands)
  const Categories = useSelector(state => state.Categories)
  const categorias = Categories.map(e=>e.name.toLowerCase())
  const marcas = Brands.map(e=>e.name.toLowerCase())
  const [formularioEnviadoCategorie, cambiarFormularioEnviadoCategorie] = useState(false);
  const [formularioEnviadoBrand, cambiarFormularioEnviadoBrand] = useState(false);

  return (
    <>
 <Formik
 initialValues={{
  //CATEGORIA
   name: "",
 }}
 
 validate={(valores) => {
   let errores = {};
   if (!valores.name) {
     errores.name = "Por favor ingresa un nombre";
    }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
      errores.name = "El nombre solo puede contener letras y espacios";
   }else if(categorias.includes(valores.name.toLowerCase())){
    errores.name= "esta categoria ya existe"
   }
   return errores;
 }}
 onSubmit={(valores, { resetForm }) => {
   resetForm();
   dispatch(createCategories(valores))
   console.log("Formulario enviado");
   cambiarFormularioEnviadoCategorie(true);
        setTimeout(() => cambiarFormularioEnviadoCategorie(false), 5000);
   }}
 >
   {({ errors }) => (
<Form className="formulario">
  <div>
  <label htmlFor="name"><h4>New Categorie :</h4></label>
  <Field
    type="text"
    id="categories"
    name="name"
    placeholder="new categories"
  />
  <ErrorMessage
    name="name"
    component={() => <div className="error">{errors.name}</div>}
  />
</div>
         <button type="submit">Enviar</button>
         {formularioEnviadoCategorie && (
           <p className="exito">Formulario enviado con exito!</p>
           )}
         </Form>
       )}
     </Formik>
     <Formik
     initialValues={{
      //BRAND
      name: "",
    }}
    validate={(valores) => {
      let errores = {}
      if (!valores.name) {
        errores.name= "Por favor ingresa una marca";
       }else if (
        !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)){
         errores.name ="El nombre solo puede contener letras y espacios";
      }else if(marcas.includes(valores.name.toLowerCase())){
       errores.name = "esta marca ya existe"
      }
      return errores;
    }}
    onSubmit={(valores, { resetForm }) => {
      resetForm();
      dispatch(createBrands(valores))
      console.log("Formulario enviado");
      cambiarFormularioEnviadoBrand(true);
           setTimeout(() => cambiarFormularioEnviadoBrand(false), 5000);
      }}
     >
      {({ errors }) => (
<Form className="formulario">
<div>
  <label htmlFor="name"><h4>New Brand :</h4></label>
<Field
  type="text"
  id="brand"
  name="name"
  placeholder="new brand"
/>
    <ErrorMessage
 name="name"
 component={() => <div className="error">{errors.name}</div>}
  />
</div>

         <button type="submit">Enviar</button>
         {formularioEnviadoBrand && (
           <p className="exito">Formulario enviado con exito!</p>
           )}
         </Form>
       )}
     </Formik>
    </>
  );
};

export default NewFeatures


