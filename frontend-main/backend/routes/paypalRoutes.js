const express = require("express");
const axios = require("axios");

const router = express.Router();

async function generateAccessToken() {
  const response = await axios({
    url: `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.access_token;
}

// Create order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const accessToken = await generateAccessToken();

    const response = await axios({
      url: `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      },
    });

    res.json({
      id: response.data.id,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
    res.status(500).json({
      message: "Create PayPal order failed",
    });
  }
});

// Capture order
router.post("/:orderId/capture", async (req, res) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await axios({
      url: `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${req.params.orderId}/capture`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "Capture failed",
    });
  }
});

module.exports = router;