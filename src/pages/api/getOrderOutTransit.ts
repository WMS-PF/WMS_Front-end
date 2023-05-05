import { getOrderOutTransit } from "./Database/Database";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'GET') {
      try {
        let order = await getOrderOutTransit();
        res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}