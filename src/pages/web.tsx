import LandingLayout from '@/components/layout/LandingLayout'
import ForceDirectedLogos from '@/components/web/ForceDirectedLogos'
import GetPraiseButton from '@/components/web/GetPraiseButton'
import PraiseHands from '@/components/web/PraiseHands'

export default function Web() {
  return (
    <LandingLayout>
      <div className="heroContainer">
        <div className="heroHeader">Praise</div>
        <div className="text-3xl">
          Unlock the full potential of your community with reputation scores,
          rewards and deep insights.
        </div>
      </div>
      <PraiseHands />
      Praise is a community intelligence system that promotes active
      participation and collaboration through peer recognition and rewards. We
      help communities become more intelligent, productive and inclusive by
      providing a simple way for community members to acknowledge, praise and
      reward each other’s contributions.
      <div className="black-section">
        ## How does it work? ``` /praise @vitalik.eth for &quot;inventing
        Ethereum&ldquo; ``` Community members interact with a Discord Praise bot
        to acknowledge each other&apos;s contributions. This bottom-up approach
        to value recognition keeps the community engaged and invested. Praise
        can recognize any contribution, big or small, and even those made
        outside of any platform. This improves cooperation and promotes a more
        positive and productive community.
        <GetPraiseButton /># A culture of giving and gratitude
      </div>
      <blockquote className="twitter-tweet">
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
      </blockquote>
      <h1> Four reasons to use Praise </h1>
      <h2 className="py-6"> 1. Community Intelligence </h2>
      <p>
        Use Praise for insight into how your community works. Praise provides
        all kinds of data analysis and reports. We call it **community
        intelligence**.
      </p>
      <PraiseHands size="small" />
      <h2 className="py-6">
        2. Reputation Use Praise to build reputation scores.
      </h2>
      <p>
        The Praise contribution graph represents a verifiable record of
        community contributions - **who did what, when and to what impact?!**
      </p>
      <PraiseHands size="small" />
      <h2 className="py-6">3. Rewards</h2>{' '}
      <p>
        Positive feelings** and **strengthen bonds** between people. In online
        communities, this can be especially important for creating a sense of
        community and fostering cooperation.
      </p>
      <h1>Who uses Praise?</h1>
      <ForceDirectedLogos />
    </LandingLayout>
  )
}
