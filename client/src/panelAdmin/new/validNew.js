import * as Yup from "yup";

export const validSchema = Yup.object().shape({
    name: Yup.string().required("You must enter a valid and unique name"),
    brandID: Yup.string().required("you must select a shoe brand, if the brand is not found you can create it"),
    description: Yup.string().required("put a brief description"),
    price: Yup.number().min(1).required("you must put a price"),
   material: Yup.string().required("you must place the material from which it is made"),
   released: Yup.date().required("you must put the release date"),
   designer: Yup.string().required("Enter the name of the designer"),
   details: Yup.string().required("put the main details"),
   shoe_condition: Yup.string().required("place the condition in which the product is found"),
   categories: Yup.array().of(Yup.string().required("place which category it belongs to")),
   colorID: Yup.string().required("You must choose a color, if you don't find the right one you can create one"),
   genderID: Yup.string().required("you must choose the gender of the size, if you do not find the correct one you can create one"),
  //  size_range:Yup.required('debes elegir los talles disponibles con sus stock disponible'),
  // size_range:Yup.array().required('debes elegir un talle y su stock')


  });


export const initialValue ={
  name: "",
  nickname:"",
  brandID: "",
  description: "",
  price: 0,
  img:"",
  colorID: "",
  size_range: [{size:'',stock:0}],
  material: "",
  released: "",
  genderID: "",
  designer: "",
  details: "",
  shoe_condition: "",
  // rating: 0,
  categories: [],

}