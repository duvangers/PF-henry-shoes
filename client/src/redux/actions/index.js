import Axios from 'axios'
import * as actionTypes from '../action-types'
import Sweal from 'sweetalert2'

// Axios.defaults.baseURL = 'https://app-henry-shoes.herokuapp.com/api'
Axios.defaults.baseURL = 'http://localhost:3001/api'

export const getUsers = () => {
  return async function (dispatch) {
    try {
      let users = await Axios('/users')
      return dispatch({
        type: actionTypes.GET_ALL_USERS,
        payload: users.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllOrders = () => {
  return async function (dispatch) {
    try {
      let orders = await Axios('/ordens')
      return dispatch({
        type: actionTypes.GET_ALL_ORDERS,
        payload: orders.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllUserReviews = id => {
  return async function (dispatch) {
    try {
      let info = await Axios(`/reviewsUser/${id}`)
      return dispatch({
        type: actionTypes.GET_ALL_USER_REVIEWS,
        payload: info.data,
      })
    } catch (error) {
      console.log(error.response)
    }
  }
}
export const getAllOrdersUser = id => {
  return async function (dispatch) {
    try {
      let info = await Axios(`/ordensUser/${id}`)
      return dispatch({
        type: actionTypes.GET_ALL_ORDERS_USER,
        payload: info.data,
      })
    } catch (error) {
      console.log(error.response)
    }
  }
}

export const getAllShoes = () => {
  return async function (dispatch) {
    try {
      let info = await Axios('/shoes')
      return dispatch({
        type: actionTypes.GET_ALL_SHOES,
        payload: info.data,
      })
    } catch (error) {
      console.log(error.response)
    }
  }
}

export const getAllBrands = () => {
  return async function (dispatch) {
    try {
      const response = await Axios('/brands')
      const { data: payload } = response

      return dispatch({
        type: actionTypes.GET_ALL_BRANDS,
        payload,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllCategories = () => {
  return async function (dispatch) {
    try {
      let categories = await Axios('/categories')
      return dispatch({
        type: actionTypes.GET_ALL_CATEGORIES,
        payload: categories.data,
      })
    } catch (error) {
      console.log(error.response)
    }
  }
}

export const getAllColors = () => {
  return async function (dispatch) {
    try {
      const response = await Axios('/colors')
      const { data: payload } = response

      return dispatch({
        type: actionTypes.GET_ALL_COLORS,
        payload,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllGenders = () => {
  return async function (dispatch) {
    try {
      const response = await Axios('/genders')
      const { data: payload } = response

      return dispatch({
        type: actionTypes.GET_ALL_GENDERS,
        payload,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllDetails = id => {
  return async function (dispatch) {
    try {
      let categories = await Axios(`/productDetails/${id}`)
      return dispatch({
        type: actionTypes.GET_SHOES_DETAILS,
        payload: categories.data,
      })
    } catch (error) {
      console.log(error.response)
    }
  }
}

export function CleanStateDetail(payload) {
  return {
    type: actionTypes.CLEAN_DETAIL,
    payload,
  }
}

export const getFilterCategories = payload => {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.GET_FILTERS_CATEGORY,
      payload,
    })
  }
}

export const getFilterBrands = payload => {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.GET_FILTERS_BRANDS,
      payload,
    })
  }
}

export const updateFilters = payload => {
  return dispatch => {
    return dispatch({
      type: actionTypes.UPDATE_FILTERS,
      payload,
    })
  }
}

export const getFiltersSearchbar = payload => {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.GET_FILTERS_SEARCHBAR,
      payload,
    })
  }
}

export const getQuestions = () => {
  return async function (dispatch) {
    try {
      let info = await Axios('questions')
      return dispatch({
        type: actionTypes.GET_QUESTIONS,
        payload: info.data,
      })
    } catch (error) {
      console.log(error.response)
    }
  }
}

export function deleteQuestions(id) {
  return function (dispatch) {
    return Axios.delete(`/questions/${id}`).then(response => {
      dispatch({
        type: actionTypes.DELETE_QUESTIONS,
        payload: response.data,
      })
    })
  }
}

export function createQuestion(question) {
  return function (dispatch) {
    return Axios.post('/questions', question).then(response => {
      dispatch({
        type: actionTypes.CREATE_QUESTION,
        payload: response.data,
      })
    })
  }
}

export const addCarrito = producto => {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.GET_ADD_CARRITO,
      payload: producto,
    })
  }
}

export const deleteProductCarrito = payload => {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.DELETE_PRODUCT_CARRITO,
      payload,
    })
  }
}

export const changeAmount = payload => {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.CHANGE_AMOUNT_PRODUCT,
      payload,
    })
  }
}

export const createShoes = shoes => {
  return async function () {
    try {
      const post = await Axios.post('/shoes', shoes)
      return post
    } catch (error) {
      console.log(error)
    }
  }
}

export const createCategories = categories => {
  return async function () {
    try {
      const post = await Axios.post('/categories', categories)
      return post
    } catch (error) {
      console.log(error)
    }
  }
}

export const createBrands = brands => {
  return async function () {
    try {
      const post = await Axios.post('/brands', brands)
      return post
    } catch (error) {
      console.log(error)
    }
  }
}

export const createColors = colors => {
  return async function () {
    try {
      const post = await Axios.post('/colors', colors)
      return post
    } catch (error) {
      console.log(error)
    }
  }
}

export const createGenders = gender => {
  return async function () {
    try {
      const post = await Axios.post('/genders', gender)
      return post
    } catch (error) {
      console.log(error)
    }
  }
}

export function userLogin(data) {
  return async function (dispatch) {
    try {
      const response = await Axios.post('/login', data)
      return dispatch({
        type: actionTypes.USER_LOGIN,
        payload: response.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function userLogout() {
  return function (dispatch) {
    return {
      type: actionTypes.USER_LOGOUT,
    }
  }
}

export function createOrden(payload, userId) {
  return async function (dispatch) {
    try {
      console.log(payload)
      const response = await Axios.post(`/ordens/${userId}`, payload)
      Sweal.fire('Orden creada con éxito!', `${response.data.msg}`, 'success')
      return dispatch({
        type: actionTypes.DELETE_CARRITO,
        payload: [],
      });
      
    } catch (error) {
      Sweal.fire('Ups hubo un error', `${error.response.data.msg}`, 'error')
      console.log(error.response)
    }
  }
}

export function updateUserDetails(payload, userId) {
  return async function (dispatch) {
    try {
      const response = await Axios.put(`/usersUpdate/${userId}`, payload)
      return dispatch({
        type: actionTypes.UPDATE_USER_DETAILS,
        payload: response,
      })
    } catch (error) {
      Sweal.fire({
        icon: 'warning',
        text: 'Hubo un error al actualizar los datos.',
      })
    }
  }
}



export function createOrderMP(body) {
  return function (dispatch) {
    if(body.price_total > 1){
      return Axios.post('/payment', body).then(response => {
        dispatch({
          type: actionTypes.CREATE_ORDERMP,
          payload: response.data.init_point,
        })
      })

    }
  }
}