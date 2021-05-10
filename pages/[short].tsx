import { GetServerSideProps } from 'next'
import { dbConnect } from '../lib/db'
import ShortUrl from '../models/ShortUrl'

export default function Short() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await dbConnect()

  if (ctx.params) {
    const short = ctx.params.short as string
    const res = await ShortUrl.findOne({ short })

    if (!res) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
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
