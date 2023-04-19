import GetPraiseButton from '@/components/landing/GetPraiseButton'
import LandingLayout from '@/components/layout/LandingLayout'
import PraiseHands from '@/components/landing/PraiseHands'
import { TwitterTweetEmbed } from 'react-twitter-embed'

export default function Landing() {
  const tweetHtml: string = `<blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          Learn a little bit more about reward systems and{' '}
          <a href="https://twitter.com/praise?ref_src=twsrc%5Etfw">@praise</a>{' '}
          through this insightful video featuring{' '}
          <a href="https://twitter.com/_liviade?ref_src=twsrc%5Etfw">
            @_liviade
          </a>{' '}
          from{' '}
          <a href="https://twitter.com/commonsstack?ref_src=twsrc%5Etfw">
            @commonsstack
          </a>{' '}
          <a href="https://twitter.com/tecmns?ref_src=twsrc%5Etfw">@tecmns</a>{' '}
          <a href="https://t.co/UaZaimKn36">pic.twitter.com/UaZaimKn36</a>
        </p>
        &mdash; ETHBarcelona ( :D , :D ) (@eth_barcelona){' '}
        <a href="https://twitter.com/eth_barcelona/status/1625095401853407233?ref_src=twsrc%5Etfw">
          February 13, 2023
        </a>
      </blockquote>`

  return (
    <LandingLayout>
      <div className="heroContainer">
        <div className="heroHeader">Praise - Staging</div>
        <div className="text-3xl">
          Unlock the full potential of your community with reputation scores,
          rewards and deep insights.
        </div>
      </div>
      <div className="my-12">
        <PraiseHands />
      </div>
      <p className="px-4">
        Praise is a community intelligence system that promotes active
        participation and collaboration through peer recognition and rewards. We
        help communities become more intelligent, productive and inclusive by
        providing a simple way for community members to acknowledge, praise and
        reward each other’s contributions.
      </p>
      <div className="black-section">
        <h2>How does it work?</h2>
        <div className="mt-6 mb-12 rounded-md bg-white p-3 text-slate-700">
          <code>/praise @vitalik.eth for &quot;inventing Ethereum&ldquo;</code>
        </div>
        <p>
          Community members interact with a Discord Praise bot to acknowledge
          each other&apos;s contributions. This bottom-up approach to value
          recognition keeps the community engaged and invested. Praise can
          recognize any contribution, big or small, and even those made outside
          of any platform. This improves cooperation and promotes a more
          positive and productive community.
        </p>
        <GetPraiseButton />
      </div>
      <h1>A culture of giving and gratitude</h1>
      <div className="twitter-tweet">
        <TwitterTweetEmbed tweetId="1625095401853407233" />
      </div>
      <h1>Four reasons to use Praise</h1>
      <h2 className="py-6">1. Community Intelligence</h2>
      <p className="px-4">
        Use Praise for insight into how your community works. Praise provides
        all kinds of data analysis and reports. We call it{' '}
        <strong>community intelligence</strong>.
      </p>
      <div className="mt-12 mb-1">
        <PraiseHands size="small" />
      </div>
      <h2 className="py-6">
        2. Reputation Use Praise to build reputation scores.
      </h2>
      <p className="px-4">
        The Praise contribution graph represents a verifiable record of
        community contributions - **who did what, when and to what impact?!**
      </p>
      <div className="mt-12 mb-1">
        <PraiseHands size="small" />
      </div>
      <h2 className="py-6">3. Rewards</h2>
      <p className="mb-24 px-4">
        Positive feelings** and **strengthen bonds** between people. In online
        communities, this can be especially important for creating a sense of
        community and fostering cooperation.
      </p>
    </LandingLayout>
  )
}
