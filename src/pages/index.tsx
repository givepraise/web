import NoSSR from '@/components/layout/NoSSR'
import { Head } from '@/components/layout/Head'
import { Form } from '@/components/ui/form/Form'

export default function Home() {
  return (
    <NoSSR>
      <Head />
      <main>
        <h1 className="mt-10 text-4xl font-bold">Next.js Web3 Starter</h1>
        <h3 className="mt-1 mb-6 text-lg font-medium">
          Powered by General Magic
        </h3>
      </main>

      <Form />
    </NoSSR>
  )
}
