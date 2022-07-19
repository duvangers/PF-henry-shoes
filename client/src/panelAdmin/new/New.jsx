import "./new.scss";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productInputs, sizes } from "./formSource";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray
} from "formik";

import {validSchema , initialValue} from "./validNew" ;
import {
  createShoes,
  getAllGenders,
  getAllColors,
  getAllCategories,
  getAllBrands,

} from "../../redux/actions/index.js";

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
  // const inputs = productInputs;
  // const [file, setFile] = useState("");
  const [enviado , setEnviado] = useState(false)

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
          onSubmit={(valores ,{ resetForm }) => {
            console.log(valores);
            console.log("formulario enviado");
            dispatch(createShoes(valores))
            setEnviado(true)
            resetForm()
            setTimeout(()=>{
              setEnviado(false)
            },3000)
          }}
        >
          {({ errors ,values }) => (
            <Form className='formulario'>
              {/* <div className="left">
                <img
                  src={
                    values.img
                      ? URL.createObjectURL(values.img)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div> */}
             <div className="bottom"> 
              <div className="right">
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <Field
                    type="file"
                    id="file"
                    name="img"
                    // onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>        
                 
                  <div className="formInput">
                  <label htmlFor="name">Name :</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="name"
                  />
                  <ErrorMessage
                    name="name"
                    component={() => (
                      <div className="error">{errors.name}</div>
                    )}
                  />
                
                </div>
                <div className="formInput">
                  <label htmlFor="nickname">Nickname :</label>
                  <Field
                    type="text"
                    id="nickname"
                    name="nickname"
                    placeholder="name"
                  />
                </div>
                
                <div className="formInput">
                  <label htmlFor="description">Description :</label>
                  <Field
                    type="text"
                    id="description"
                    name="description"
                    placeholder="description"
                  />
                  <ErrorMessage
                    name="description"
                    component={() => (
                      <div className="error">{errors.description}</div>
                    )}
                  />
                  </div>
                <div className="formInput">
                  <label htmlFor="price">Price :</label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder="price"
                  />
                  <ErrorMessage
                    name="price"
                    component={() => (
                      <div className="error">{errors.price}</div>
                    )}
                  />
                  </div>
                <div className="formInput">
                  <label htmlFor="material">Material :</label>
                  <Field
                    type="text"
                    id="material"
                    name="material"
                    placeholder="material"
                  />
                  <ErrorMessage
                    name="material"
                    component={() => (
                      <div className="error">{errors.material}</div>
                    )}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="released">Released :</label>
                  <Field
                    type="date"
                    id="released"
                    name="released"
                    placeholder="released"
                  />
                  <ErrorMessage
                    name="released"
                    component={() => (
                      <div className="error">{errors.released}</div>
                    )}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="designer">Designer :</label>
                  <Field
                    type="text"
                    id="designer"
                    name="designer"
                    placeholder="designer"
                  />
                  <ErrorMessage
                    name="designer"
                    component={() => (
                      <div className="error">{errors.designer}</div>
                    )}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="details">Details :</label>
                  <Field
                    type="text"
                    id="details"
                    name="details"
                    placeholder="details"
                  />
                  <ErrorMessage
                    name="details"
                    component={() => (
                      <div className="error">{errors.details}</div>
                    )}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="shoe_condition">Shoe condition :</label>
                  <Field
                    type="text"
                    id="shoe_condition"
                    name="shoe_condition"
                    placeholder="shoe_condition"
                  />
                  <ErrorMessage
                    name="shoe_condition"
                    component={() => (
                      <div className="error">{errors.shoe_condition}</div>
                    )}
                  />
                </div> 
                
                 
              
                <FieldArray name="size_range">
            {({ insert, remove, push }) => (
              <div>
                {values.size_range.length > 0 &&
                  values.size_range.map((size, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`size_range.${index}.size`}> Size :</label>
                        <Field
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
                            <div className="error">{errors.size_range.size}</div>)}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`size_range.${index}.stock`}>Stock :</label>
                        <Field
                          name={`size_range.${index}.stock`}
                          placeholder="21"
                          type="number"
                        />
                        <ErrorMessage
                          name={`size_range.${index}.stock`}
                          component={() => (
                            <div className="error">{errors.size_range.stock}</div>)}
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ size: '', stock: 0 })}
                >
                  Add Size
                </button>
              </div>
            )}
          </FieldArray>


<div className="formInput">
                  <label>Gender :</label>
                  <Field name="genderID" as="select">
                    <option value="">Select gender</option>
                    {Genders?.map((theGender) => (
                      <option key={theGender.id} value={theGender.id}>
                        {theGender.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                          name="genderID"
                          component={() => (
                            <div className="error">{errors.genderID}</div>)}
                        />
                </div>

                <div className="formInput">
                  <label>Brands</label>
                  <Field name="brandID" as="select">
                    <option value="">Select brands</option>
                    {Brands?.map((theBrands) => (
                      <option key={theBrands.id} value={theBrands.id}>
                        {theBrands.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                          name="brandID"
                          component={() => (
                            <div className="error">{errors.brandID}</div>)}
                        />
                </div>
                
                <div className="formInput">
                  <label>Colors :</label>
                  <Field name="colorID" as="select">
                    <option value="">Select colors</option>
                    {Colors?.map((color, i) => (
                      <option key={i} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                          name="colorID"
                          component={() => (
                            <div className="error">{errors.colorID}</div>)}
                        />
                </div>
                <FieldArray name="categories">
            {({ insert, remove, push }) => (
              <div>
                {values.categories?.map((gender, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`categories.${index}`}>Categories :</label>
                        <Field
                          name={`categories.${index}`}
                          as="select"
                        >
                        <option value="">select categories</option>
                           {Categories?.map((theCategory) => (
                             <option key={theCategory.id} value={theCategory.id}>
                               {theCategory.name}
                             </option>
                           ))}
                    </Field>
                        <ErrorMessage
                          name={`categories.${index}`}
                          component={() => (
                            <div className="error">{errors.categories}</div>)}
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}

                <button
                  type="button"
                  className="secondary"
                  onClick={() => push()}
                >
                  Add Categorie
                </button>
              </div>
            )}

          </FieldArray>
                <button type="submit">Send</button>
              </div>
              {!!enviado === false ? null : <div className="exito">Se creó con éxito</div>} 
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default New;
