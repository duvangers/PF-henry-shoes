import * as Yup from "yup";

 Yup.addMethod(Yup.array, 'unique', function(categories, mapper = a => a) {
  return this.test('unique', categories, function(list) {
      return list.length  === new Set(list.map(mapper)).size;
  });
});
 export const validSchema = Yup.object().shape({
    name: Yup.string().min(4,"mínimo 4 caracteres").required("Debe ingresar un nombre válido y único"),
    brandID: Yup.string().required("debe seleccionar una marca de zapatos, si no se encuentra la marca puede crearla(luego apretar el boton de recargar)"),
    description: Yup.string().min(10,"mínimo 10 caracteres ").required("poner una breve descripción"),
    price: Yup.number().min(1).required("debes poner precio"),
   material: Yup.string().required("debes colocar el material del que está hecho"),
   released: Yup.date().required("debes poner la fecha de lanzamiento"),
   designer: Yup.string().required("Introduce el nombre del diseñador."),
   details: Yup.string().min(5,"mínimo 5 caracteres").required("poner los detalles principales"),
   shoe_condition: Yup.string().required("colocar el estado en que se encuentra el producto"),
   categories: Yup.array().of(Yup.string().required("colocar a que categoria pertenece, si no se encuentra la categoria puede crearla(luego apretar el boton de recargar)")).unique('no debes tener categorias repetidas'),
   colorID: Yup.string().required("Debes elegir un color."),
   genderID: Yup.string().required("debes elegir el genero de la talla"),
  //  img:Yup.required('is requerid url of img'),

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
  rating: 0,
  categories: [''],

}
