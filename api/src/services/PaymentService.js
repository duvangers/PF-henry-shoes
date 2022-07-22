const axios = require("axios");

class PaymentService {
  
  async createPayment(price_total, email) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: email,
      items: [
        {
          title: "HENRYSHOES",
          description: "SHOES description",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: price_total
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/user/orders"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer APP_USR-3505987715832633-072100-82367e53913333cc0b4e42b3e334c8c1-1164606939`
      }
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_14427249@testuser.com"
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer APP_USR-3505987715832633-072100-82367e53913333cc0b4e42b3e334c8c1-1164606939`
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;