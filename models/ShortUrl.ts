import { Document, Model, model, models, Schema } from 'mongoose'

export interface ShortUrl {
  full: string
  short: string
  clicks: number
}

interface ShortUrlBaseDocument extends ShortUrl, Document {}

interface ShortUrlModel extends Model<ShortUrlBaseDocument> {}

const shortUrlSchema = new Schema<ShortUrlBaseDocument, ShortUrlModel>({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
})

export default models.ShortUrl || model('ShortUrl', shortUrlSchema)
