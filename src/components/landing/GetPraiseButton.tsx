import Link from 'next/link'
import React from 'react'

const GetPraiseButton = () => {
  return (
    <div>
      <Link className="button button--secondary button--lg" href="/waitlist">
        Get Praise!
      </Link>
    </div>
  )
}

export default GetPraiseButton
