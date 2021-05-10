import { GetServerSideProps } from 'next'
import { dbConnect } from '../../middleware/db'
import ShortUrl from '../../models/shortUrl'

const Url = () => {
  return <div></div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await dbConnect()

  if (ctx.params) {
    const url = ctx.params.url as string
    const res = await ShortUrl.findOne({ short: url })

    if (!res) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return {
      redirect: {
        destination: res.full,
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}

export default Url
