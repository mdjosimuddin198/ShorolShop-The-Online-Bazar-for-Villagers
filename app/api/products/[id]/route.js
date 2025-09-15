import DammyData from "@/public/DammyData.json";

export const GET = async (req, { params }) => {
  const { id } = await params;
  console.log(params);
  const product = DammyData.find((p) => {
    return p.id === parseInt(id);
  });
  if (!product) {
    return new Response(JSON.stringify({ message: "faild to find product " }));
  }

  return new Response(JSON.stringify(product));
};
