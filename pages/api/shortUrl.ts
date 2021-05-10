import Joi from 'joi'
import nanoid from 'nanoid'
import { NextApiHandler } from 'next'
import { dbConnect } from '../../lib/db'
import ShortUrl from '../../models/ShortUrl'

const schema = Joi.object({
  url: Joi.string().trim().uri().required(),
})
const handler: NextApiHandler = async (req, res) => {
  const { body, method } = req

  await dbConnect()
  switch (method) {
    case 'POST':
      try {
        const { error } = schema.validate(body)

        if (error) throw error.details[0].message

        const short = nanoid.nanoid(7)

        const existing = await ShortUrl.findOne({ short })

        if (existing) throw new Error('Alias already in use, try again')

        short.toLowerCase()
        const newShortUrl = { full: body.url, short }
        await ShortUrl.create(newShortUrl)
        const data = `${req.headers.host}/${short}`
        res.status(201).json({ success: true, data })
      } catch (e) {
        let error = e
        const invalidUrlRe = /valid\suri/
        if (invalidUrlRe.test(e)) {
          error = 'Provide a valid url'
        }

        if (/required/.test(e) || /empty/.test(e)) {
          error = 'Provide a url'
        }

        res.status(400).json({ error })
      }

      break

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

export default handler
