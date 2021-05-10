export const getUrl = () =>
  process.env.NODE_ENV === 'production'
    ? process.env.VERCEL_URL
    : 'localhost:3000'
