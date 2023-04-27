import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SOCIAL_TWITTER,
} from '@/utils/config'

import NextHead from 'next/head'

interface HeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function Head({ title, description, image, url }: HeadProps) {
  const absImageUrl = image
    ? `${process.env.SITE_URL}${image}`
    : `${process.env.SITE_URL}${SITE_IMAGE}`
  return (
    <NextHead>
      <title>{title ?? SITE_NAME}</title>
      <meta name="description" content={description ?? SITE_DESCRIPTION} />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content={title ?? SITE_NAME} />
      <meta itemProp="description" content={description ?? SITE_DESCRIPTION} />
      <meta itemProp="image" content={absImageUrl} />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={url ?? process.env.SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ?? SITE_NAME} />
      <meta
        property="og:description"
        content={description ?? SITE_DESCRIPTION}
      />
      <meta property="og:image" content={absImageUrl} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ?? SITE_NAME} />
      <meta
        name="twitter:description"
        content={description ?? SITE_DESCRIPTION}
      />
      <meta name="twitter:image" content={absImageUrl} />
      <meta data-rh="true" property="twitter:site" content={SOCIAL_TWITTER} />
    </NextHead>
  )
}
