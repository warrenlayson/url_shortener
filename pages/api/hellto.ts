import { NextApiHandler } from 'next'
import { dbConnect } from '../../middleware/db'

const handler: NextApiHandler = async (req, res) => {
  await dbConnect()

  res.json({ data: 'hello' })
}
export default handler
