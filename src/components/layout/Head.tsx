import NextHead from 'next/head'
import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_TWITTER,
} from '@/utils/config'
interface HeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function Head({ title, description, image, url }: HeadProps) {
  return (
    <NextHead>
      <title>{title ?? SITE_NAME}</title>
      <meta name="description" content={description ?? SITE_DESCRIPTION} />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content={title ?? SITE_NAME} />
      <meta itemProp="description" content={description ?? SITE_DESCRIPTION} />
      <meta itemProp="image" content={image ?? SITE_IMAGE} />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={url ?? SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ?? SITE_NAME} />
      <meta
        property="og:description"
        content={description ?? SITE_DESCRIPTION}
      />
      <meta property="og:image" content={image ?? SITE_IMAGE} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ?? SITE_NAME} />
      <meta
        name="twitter:description"
        content={description ?? SITE_DESCRIPTION}
      />
      <meta name="twitter:image" content={image ?? SITE_IMAGE} />
      <meta data-rh="true" property="twitter:site" content={SOCIAL_TWITTER} />
    </NextHead>
  )
}
