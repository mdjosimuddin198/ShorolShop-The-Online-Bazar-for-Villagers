import DammyData from "@/public/DammyData.json";

export const GET = async () => {
  return Response.json(DammyData);
};
