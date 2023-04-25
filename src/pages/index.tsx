import { Button } from '../components/ui/Button'
import MainLayout from '@/components/layout/MainLayout'
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
    <MainLayout>
      <h1>
        Unlock the full potential of your community with{' '}
        <u>reputation scores</u>, <u>rewards</u> and <u>deep insights</u>
      </h1>
      <div>
        <PraiseHands />
      </div>
      <div>
        Praise is a community intelligence system that promotes active
        participation and collaboration through peer recognition and rewards. We
        help communities become more intelligent, productive and inclusive by
        providing a simple way for community members to acknowledge, praise and
        reward each other’s contributions.
      </div>
      <div className="black-section">
        <h2>How does it work?</h2>
        <div className="py-6">
          <div className="not-prose rounded-md bg-white p-3 font-thin text-slate-700">
            <code>
              /praise @vitalik.eth for &quot;inventing Ethereum&ldquo;
            </code>
          </div>
        </div>
        <p>
          Community members interact with a Discord Praise bot to acknowledge
          each other&apos;s contributions. This bottom-up approach to value
          recognition keeps the community engaged and invested. Praise can
          recognize any contribution, big or small, and even those made outside
          of any platform. This improves cooperation and promotes a more
          positive and productive community.
        </p>
        <Button
          onClick={() => {
            window.location.href = '/waitlist'
          }}>
          Get Praise!
        </Button>
      </div>
      <h1>A culture of giving and gratitude</h1>
      <div className="xs:mx-auto">
        <div className="xs:w-[500px] w-full">
          <TwitterTweetEmbed tweetId="1625095401853407233" />
        </div>
      </div>
      <h1>Four reasons to Praise</h1>
      <h2>1. Community Intelligence</h2>
      <div>
        Use Praise for insight into how your community works. Praise provides
        all kinds of data analysis and reports. We call it{' '}
        <strong>community intelligence</strong>.
      </div>
      <div>
        <PraiseHands size="small" />
      </div>
      <h2>2. Reputation</h2>
      <div>
        The Praise contribution graph represents a verifiable record of
        community contributions -{' '}
        <strong>who did what, when and to what impact?!</strong>
      </div>
      <div>
        <PraiseHands size="small" />
      </div>
      <h2>3. Rewards</h2>
      <div>
        Use Praise to reward contributors based on actual contributions and
        impact. Praise integrates with a number of{' '}
        <strong>token distribution platforms</strong>.
      </div>
      <div>
        <PraiseHands size="small" />
      </div>
      <h2>4. Culture of giving and gratitude</h2>
      <div>
        Use Praise to build a culture of cooperation, giving, and gratitude
        within your community. Research has shown that praise can{' '}
        <strong>reinforce positive feelings</strong> and{' '}
        <strong>strengthen bonds</strong> between people. In online communities,
        this can be especially important for creating a sense of community and
        fostering cooperation.
      </div>
    </MainLayout>
  )
}
