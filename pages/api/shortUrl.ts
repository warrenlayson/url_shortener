import { NextApiHandler } from 'next'
import { dbConnect } from '../../middleware/db'
import ShortUrl from '../../models/shortUrl'

const handler: NextApiHandler = async (req, res) => {
  const { body, method } = req

  await dbConnect()
  switch (method) {
    case 'POST':
      const { url } = body

      try {
        const shortUrl = await ShortUrl.create({ full: url })
        res.status(201).json({ success: true, data: shortUrl.short })
      } catch (error) {
        res.status(400).json({ success: false })
      }

      break

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default handler
