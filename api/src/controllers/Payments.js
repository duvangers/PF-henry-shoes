

const getPayment = async (req, res) => {

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());


  PaymentInstance.getPaymentLink(req, res);



}
  module.exports = { getPayment };