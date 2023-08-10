import { NextApiRequest, NextApiResponse } from "next";

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  try {
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
