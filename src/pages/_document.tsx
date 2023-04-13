import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <title data-rh="true">
        Building a culture of giving and gratitude | Praise 🙏
      </title>

      <Head>
        {/*<!-- Google / Search Engine Tags -->*/}
        <meta
          data-rh="true"
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <meta
          data-rh="true"
          name="description"
          content="Praise is a rewards system allowing communities to acknowledge and reward member contributions."
        />
        <meta
          data-rh="true"
          name="name"
          content="Building a culture of giving and gratitude | Praise 🙏"
        />

        {/*<!-- Facebook Meta Tags -->*/}
        <meta
          data-rh="true"
          property="og:image"
          content="https://givepraise.xyz/img/share.png"
        />
        <meta
          data-rh="true"
          property="og:url"
          content="https://givepraise.xyz/"
        />
        <meta
          data-rh="true"
          property="og:title"
          content="Building a culture of giving and gratitude | Praise 🙏"
        />
        <meta
          data-rh="true"
          property="og:description"
          content="Praise is a rewards system allowing communities to acknowledge and reward member contributions."
        />

        {/*<!-- Twitter Meta Tags -->*/}
        <meta
          data-rh="true"
          name="twitter:image"
          content="https://givepraise.xyz/img/share.png"
        />
        <meta
          data-rh="true"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          data-rh="true"
          property="twitter:title"
          content="Building a culture of giving and gratitude | Praise 🙏"
        />
        <meta data-rh="true" property="twitter:site" content="@givepraise" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
