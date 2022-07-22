import "./new.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productInputs, sizes ,featuresInputs } from "./formSource";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { validSchema, initialValue } from "./validNew";
import {createShoes,getAllGenders,getAllColors,getAllCategories,getAllBrands,} from "../../redux/actions/index.js";
import ContenedorFeatures from "./contenedorFeatures";
const New = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGenders());
    dispatch(getAllCategories());
    dispatch(getAllColors());
    dispatch(getAllBrands());
  }, [dispatch]);
  const Categories = useSelector((state) => state.Categories);
  const Brands = useSelector((state) => state.Brands);
  const Colors = useSelector((state) => state.Colors);
  const Genders = useSelector((state) => state.Genders);
  const [enviado, setEnviado] = useState(false);
  const [image,setImage] = useState("")
  
  const uploadImage= async e=>{
       const files = e.target.files
       const data = new FormData()
       data.append('file', files[0])
       data.append('upload_preset','henry-shoes-cloudinary') //nombre de la carpeta de cloudinary
       const res = await fetch(
        "https://api.cloudinary.com/v1_1/diegop1zarro/image/upload",
        {
          method:"POST",
          body:data
        }
       )
       const file = await res.json()
       setImage(file.secure_url)
       initialValue.img = file.secure_url
  }
 const cleanImage =()=>{
  setImage("")
  initialValue.img = ""
 }
 const rechargeFeatures =()=>{
  dispatch(getAllBrands());
  dispatch(getAllCategories());
 }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Agregar Nuevo Producto</h1>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={validSchema}
          onSubmit={(valores, { resetForm }) => {
            console.log("formulario enviado");
            dispatch(createShoes(valores));
            setEnviado(true);
            resetForm();
            setImage('')
            setTimeout(() => {
              setEnviado(false);
            }, 3000);
          }}
        >
          
          {({ errors, values }) => (
            <Form className="bottom">
              <div className="left">
                <img
                  src={
                      image
                      ? image
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
               <button className="deleteButton" onClick={cleanImage} >Eliminar foto</button> 
              </div>
              {/* <div className="bottom"> */}
                <div className="right">
                <button className="buttonAdd" onClick={rechargeFeatures}>Recargar categorie/brand</button> 
                  <div className="formInput">
                    <label htmlFor="img">
                     <strong>Upload Image:</strong>
                      <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <Field
                      type="file"
                      id="img"
                      name="file"
                      placeholder="URL"
                      onChange={uploadImage}
                      style={{ display: "none" }}
                    />
                  </div>
                  <ErrorMessage
                    name="img"
                    component={() => <div className="error">{errors.img}</div>}
                  />
                  <div className="Form">
                    {productInputs.map((input) => (
                      <div className="formInput" key={input.id}>
                        <label htmlFor={input.name}> <strong>{input.label}</strong></label>
                        <Field
                        className="input"
                          type={input.type}
                          placeholder={input.placeholder}
                          name={input.name}
                        />
                        <ErrorMessage
                          name={input.name}
                          component={() => (
                            <div className="error">
                              {input.name === "name" ? errors.name
                                : input.name === "description" ? errors.description
                                : input.name === "price" ? errors.price
                                : input.name === "material" ? errors.material
                                : input.name === "released" ? errors.released
                                : input.name === "designer" ? errors.designer
                                : input.name === "details" ? errors.details
                                : input.name === "shoe_condition" ? errors.shoe_condition
                                : input.name === "img" ? errors.img
                                : null}
                            </div>
                          )}
                        />
                      </div>
                    ))}
                    {featuresInputs.map((input) => (
                      <div className="formInput" key={input.id}>
                        <label htmlFor={input.name}><strong>{input.label}</strong></label>
                        <Field
                          as={input.as}
                          // className="form-select"
                        className="input"
                          placeholder={input.placeholder}
                          name={input.name}
                        >
                          <option value="">Select {input.label}</option>
                        {input.name === "genderID" ? Genders?.map((theGender) => (
                      <option key={theGender.id} value={theGender.id}>
                        {theGender.name}
                      </option> )) : 
                       input.name === "brandID" ? Brands?.map((theBrands) => (
                      <option key={theBrands.id} value={theBrands.id}>
                        {theBrands.name}
                      </option>)) :
                      input.name === "colorID" ? Colors?.map((color, i) => (
                        <option key={i} value={color.id}>
                          {color.name}
                        </option>
                      )) : null
                    }  
                          </Field>
                        <ErrorMessage
                          name={input.name}
                          component={() => (
                            <div className="error">
                              {input.name === "genderID"?
                              errors.genderID : input.name === "brandID"?
                              errors.brandID : input.name === "colorID"?
                              errors.colorID
                              : null}
                            </div>
                          )}
                        />
                      </div>
                    ))}
                  <FieldArray name="categories">
                    {({ insert, remove, push }) => (
                      <div className="formInput" >
                        {values.categories?.map((gender, index) => (
                          <div key={index}>
                              <label htmlFor={`categories.${index}`}><strong>Categories :</strong></label>
                              <Field
                                // className="form-select"
                                className="input"
                                name={`categories.${index}`}
                                as="select"
                              >
                                <option value="">select categories</option>
                                {Categories?.map((theCategory) => (
                                  <option
                                    key={theCategory.id}
                                    value={theCategory.id}
                                  >
                                    {theCategory.name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name={`categories.${index}`}
                                component={() => (
                                  <div className="error">
                                    {errors.categories}
                                  </div>
                                )}
                              />
                            <div>
                              <button
                                type="button"
                                className="buttonX"
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="buttonAdd"
                          onClick={() => push()}
                        >
                          Add Categorie
                        </button>
                      </div>
                    )}
                  </FieldArray>
                
                  <FieldArray name="size_range">
                    {({ insert, remove, push }) => (
                      <div className="formInput">
                        {values.size_range.length > 0 &&
                          values.size_range.map((size, index) => (
                            <div  key={index}>
                              <div className="col">
                                <label htmlFor={`size_range.${index}.size`}><strong>Size :</strong></label>
                                <Field
                                className="input"
                                // className="form-select"
                                  name={`size_range.${index}.size`}
                                  as="select"
                                >
                                  <option value="">Select sizes</option>
                                  {sizes?.map((theSize, i) => (
                                    <option key={i} value={theSize}>
                                      {theSize}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name={`size_range.${index}.size`}
                                  component={() => (
                                    <div className="error">
                                      {errors.size_range}
                                    </div>
                                  )}
                                />
                              </div>
                              <div className="col">
                                <label htmlFor={`size_range.${index}.stock`}><strong>Stock :</strong></label>
                                <Field
                                  name={`size_range.${index}.stock`}
                                  placeholder="21"
                                  type="number"
                                className="input"
                                />
                                <ErrorMessage
                                  name={`size_range.${index}.stock`}
                                  component={() => (
                                    <div className="error">
                                      {errors.size_range}
                                    </div>
                                  )}
                                />
                              </div>
                              <div className="col">
                                <button
                                  type="button"
                                  className="buttonX"
                                  onClick={() => remove(index)}
                                >
                                  X
                                </button>
                              </div>
                            </div>
                          ))}
                        <button
                          type="button"
                          className="buttonAdd"
                          onClick={() => push({ size: "", stock: 0 })}
                        >
                          Add Size
                        </button>
                      </div>
                    )}
                  </FieldArray>
              {/* <button type="submit">Send</button>
              {!!enviado === false ? null : (
                <div className="exito">Se creó con éxito</div>
              )} */}
          </div> 
          <button className="buttonSend" type="submit">Send</button>
              {!!enviado === false ? null : (
                <div className="exito">Se creó con éxito</div>
              )}
          </div>
            </Form>
          )}
        </Formik>
                <div  className="bottom">
              <ContenedorFeatures/>
                </div>
      </div>
    </div>
  );
};

export default New;
