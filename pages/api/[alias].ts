import db from '$lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const handlers = {
      GET: async () => {
        const { alias } = req.query;
        if (typeof alias !== 'string') {
          res.status(400).end();
          return;
        }

        const sqlRes = await db.query(
          `/* SQL */
            select *
            from links
            where alias = $1
          `,
          [alias]
        );

        const [row] = sqlRes.rows;

        if (!row) {
          res.status(404).end();
          return;
        }

        const { destination_url } = row;
        res.redirect(destination_url);

        return;
      }
    };

    if (!handlers[req.method]) {
      return res.status(405).end();
    }

    await handlers[req.method]();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
}
