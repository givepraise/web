import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from 'next'

import { Button } from '../../components/ui/Button'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import fetch from 'node-fetch'
import { load } from 'cheerio'

type MetaData = {
  slug: string | string[] | undefined
  title: string
  image: string
  description: string
}

export default function Blog({
  metaData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { slug, title, image, description } = metaData

  return (
    <div className="flex justify-center min-h-screen ">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta
          property="og:url"
          content={`https://givepraise.xyz/blog/${slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
      </Head>

      <div className="z-10 flex flex-col">
        <div
          onClick={() =>
            window.open(`https://givepraise.substack.com/p/${slug}`)
          }
          className="p-8 mx-5 mt-10 mb-8 text-base font-normal prose transition duration-200 ease-in-out bg-white rounded-lg cursor-pointer h-min drop-shadow-lg hover:-translate-y-1 hover:scale-105 md:mx-0 md:mt-20 md:w-full md:max-w-3xl">
          {image && (
            <Image
              className="mb-4 rounded-lg"
              src={image}
              alt={title}
              width={768}
              height={384}
            />
          )}
          <h1 className="mb-0">{title}</h1>
          <p className="prose-xl">{description}</p>
        </div>

        <Link href={`https://givepraise.substack.com/p/${slug}`}>
          <Button className="z-10">Read more </Button>
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // If you have a way of getting all possible ids, do it here
  // Example: fetch all ids from the API, database, etc.

  // This is a fallback function that will be called for routes that were not generated at build time
  return {
    paths: [], // Replace with your paths
    fallback: 'blocking', // Can also be `true`, but 'blocking' will provide a better user experience
  }
}

export const getStaticProps: GetStaticProps<{
  metaData: MetaData
}> = async (context) => {
  const slug = context.params?.slug

  const res = await fetch(`https://givepraise.substack.com/p/${slug}`)
  const text = await res.text()
  const $ = load(text)

  const title = $('meta[property="og:title"]').attr('content') || ''
  const image = $('meta[property="og:image"]').attr('content') || ''
  const description = $('meta[property="og:description"]').attr('content') || ''

  return {
    props: {
      metaData: {
        slug,
        title,
        image,
        description,
      },
    },
    revalidate: 3600,
  }
}
