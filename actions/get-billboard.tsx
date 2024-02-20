import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (): Promise<Billboard[]> => {
  const res = await fetch(URL, {
    next: { revalidate: 300 },
  });
  const billboards = await res.json();

  return billboards;
};

export default getBillboard;
