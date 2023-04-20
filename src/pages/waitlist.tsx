import PraiseHands from '@/components/landing/PraiseHands'
import Link from 'next/link'
import WaitlistForm from '@/components/landing/WaitListForm'
import MainLayout from '@/components/layout/MainLayout'

export default function Waitlist() {
  return (
    <MainLayout>
      <div className="mx-auto mt-12 max-w-2xl text-center">
        <div className="mb-12 text-8xl">Get Praise, join the waiting list!</div>
        <div className="text-3xl">
          Unlock the full potential of your community with reputation scores,
          rewards and deep insights.
        </div>
      </div>
      <div className="my-12">
        <PraiseHands />
      </div>
      <p>
        For a limited time, we&apos;re offering free deployment and setup
        services to selected communities. Join the waiting list and be the first
        to know when a new slot becomes available.
      </p>
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
