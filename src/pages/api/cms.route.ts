import { NextApiRequest, NextApiResponse } from "next";

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("request made... body:", req.body);
  try {
    await new Promise((res) => {
      setTimeout(() => res(1), 2000);
    });
    const result = {
      "fetched-string": "true",
      "hello-nick": "true",
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(403).json({ err: "Error!" });
  }
};

export default route;
