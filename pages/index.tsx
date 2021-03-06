import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Wrapper } from '../components/Wrapper'

interface FormValues {
  url: string
}

export default function Home() {
  const initialValues: FormValues = { url: '' }
  const [status, setStatus] = useState<'initial' | 'success' | 'error'>(
    'initial'
  )
  return (
    <div className="min-h-screen">
      <Head>
        <title>URL Shortener</title>
        <meta
          name="description"
          content="A quick and easy url shortener and completely free"
        />
      </Head>
      <header className="sticky inset-0 z-10 bg-white shadow-lg">
        <Wrapper>
          <h1 className="text-3xl font-bold text-gray-900">URL Shortener</h1>
        </Wrapper>
      </header>
      <main>
        <Wrapper>
          <div className="p-8 shadow-md ">
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                try {
                  const res = await axios.post('/api/shortUrl', values)

                  const shortUrl = res.data.data
                  if (!shortUrl) {
                    setStatus('error')
                  }

                  setStatus('success')
                  actions.setFieldValue('url', shortUrl)
                } catch (err) {
                  setStatus('error')
                }

                actions.setSubmitting(false)
              }}
            >
              {(formik) => (
                <Form className="">
                  <div className="flex flex-col items-center gap-1 md:flex-row">
                    <label htmlFor="url" className="sr-only">
                      Url
                    </label>
                    <Field
                      type="text"
                      name="url"
                      id="url"
                      className="w-full h-10 px-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 "
                      placeholder="Shorten your link"
                    />
                    {status === 'success' ? (
                      <Button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById(
                            'url'
                          ) as HTMLInputElement
                          input.select()
                          document.execCommand('copy')
                          console.log('copied!')
                        }}
                      >
                        Copy
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        isLoading={formik.isSubmitting}
                        className="w-full md:w-auto"
                        loadingText="Shortening..."
                      >
                        Shorten
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Wrapper>
      </main>
      <footer className="absolute bottom-0 left-0 w-full text-white bg-indigo-500">
        <Wrapper>Copyright &copy; URL Shortener 2021</Wrapper>
      </footer>
    </div>
  )
}
