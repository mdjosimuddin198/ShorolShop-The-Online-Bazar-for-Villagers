import dbConnect from "@/lib/database/db";
import axios from "axios";
import { redirect } from "next/navigation";

export const POST = async (req) => {
  // payment success data
  const paymentSuccess = await req.formData();
  const valId = paymentSuccess.get("val_id");
  const storeId = paymentSuccess.get("store_id");

  const validationURL = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${process.env.SSL_STORE_ID}&store_passwd=${process.env.SSL_STORE_PASSWORD}&v=1&format=json`;

  // validation part
  const { data } = await axios.get(validationURL);
  // console.log("is valid payment", data);
  if (data.status !== "VALID") {
    redirect("/payment_fail");
  }
  //  update payment status in db
  const collection = await dbConnect("MyOrder");
  const order = await collection.findOne({ tran_id: data.tran_id });
  if (!order) {
    redirect("/payment_fail");
  }
  const updateStatus = await collection.updateOne(
    { tran_id: data.tran_id },
    {
      $set: {
        PaymentStatus: "success",
      },
    }
  );
  redirect("/success_payment");
  // console.log(udpateStatus);
};
