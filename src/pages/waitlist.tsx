import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import WaitlistForm from '@/components/landing/WaitListForm'
import { Head } from '@/components/layout/Head'

export default function Waitlist() {
  return (
    <MainLayout>
      <Head title="Waitlist page" />
      <h1>
        {' '}
        For a limited time, we&apos;re offering free deployment and setup
        services to selected communities. Join the waiting list and be the first
        to know when a new slot becomes available.
      </h1>

      <div className="black-section">
        <h2>Get Praise - Waitlist</h2>
        <WaitlistForm />
      </div>

      <p className="mb-12">
        Don&apos;t want to wait? The open-source version of Praise is available
        now for self-hosting, with{' '}
        <Link
          href="/docs/category/run-praise-on-a-server"
          className="text-pink-600 underline">
          easy setup instructions
        </Link>
      </p>
    </MainLayout>
  )
}
