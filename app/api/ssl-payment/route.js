import dbConnect from "@/lib/database/db";
import axios from "axios";
import { ObjectId } from "mongodb";
import qs from "qs";

export const POST = async (req) => {
  const collection = await dbConnect("MyOrder");
  const paymentInfo = await req.json();

  const trxId = new ObjectId().toString();
  const initiate = {
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    total_amount: paymentInfo.totalPrice,
    currency: "BDT",
    tran_id: trxId,
    success_url: "/api/success-payment",
    fail_url: "/fail",
    cancel_url: "/cancel",
    ipn_url: "/ipn-success-payment",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: paymentInfo.name,
    cus_email: paymentInfo.email,
    cus_add1: paymentInfo.address,
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: paymentInfo.phone,
    cus_fax: "01711111111",
    ship_name: paymentInfo.name,
    ship_add1: paymentInfo.address,
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  //   console.log(paymentInfo);

  paymentInfo.tran_id = trxId;

  try {
    const response = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      qs.stringify(initiate),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const paymentData = {
      name: paymentInfo.name,
      email: paymentInfo.email,
      productId: paymentInfo.productId,
      quantity: paymentInfo.quantity,
      unitPrice: paymentInfo.unitPrice,
      totalPrice: paymentInfo.totalPrice,
      phone: paymentInfo.phone,
      address: paymentInfo.address,
      tran_id: trxId,
      paymentMethod: "ssl",
      PaymentStatus: "pending",
      deleveriStatus: "pending",
      createdAt: new Date(),
    };

    // Save to DB
    await collection.insertOne(paymentData);

    // const savePaymentData = await collection.insertOne(paymentInfo);
    const getWayURL = response?.data?.GatewayPageURL;
    // console.log(response.data);
    console.log(getWayURL);
    // sent GatewayPageURL
    return new Response(JSON.stringify({ gatPaymentUrl: getWayURL }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Payment session failed" }), {
      status: 500,
    });
  }
};
