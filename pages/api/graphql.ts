import Cors from "micro-cors";
import { NextApiHandler } from "next";
import server from "../../gql";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();
const started = server.start();
const path = "/api/graphql";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "OPTIONS") return res.end();

  await started;
  await server.createHandler({ path })(req, res);

  return res.end();
};

// @ts-ignore
export default cors(handler);
