import { isServer } from './isServer'

export const getUrl = () =>
  process.env.NODE_ENV === 'production'
    ? isServer()
      ? process.env.VERCEL_URL
      : process.env.NEXT_PUBLIC_VERCEL_URL
    : 'localhost:3000'
