export const getUrl = () =>
  process.env.NODE_ENV === 'production' ? 'saballa.xyz' : 'localhost:3000'
