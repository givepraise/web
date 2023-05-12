import { GetServerSideProps } from 'next'
import { Head } from '../../components/layout/Head'
import MainLayout from '../../components/layout/MainLayout'

const extractPath = (url: string | undefined): string => {
  if (!url) return ''
  const splitURL = url.split('/')
  const docsIndex = splitURL.indexOf('docs')
  return splitURL.slice(docsIndex + 1).join('/')
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const path = extractPath(req.url)

  if (res) {
    res.setHeader('Location', `https://docs.givepraise.xyz/${path}`)
    res.statusCode = 302 // use 302 for a temporary redirect
  }

  return { props: {} }
}

export const Docs = () => (
  <MainLayout>
    <Head />
    <h1 className="!mb-0">
      Docs moved to{' '}
      <a href="https://docs.givepraise.xyz">https://docs.givepraise.xyz</a>
    </h1>
  </MainLayout>
)

export default Docs
