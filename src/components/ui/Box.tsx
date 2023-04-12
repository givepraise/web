import React from 'react'
import { classNames } from '../../utils/'

type BoxVariant = 'basic' | 'wide'

interface BoxProps {
  variant?: BoxVariant
  className?: string
  ref?: React.MutableRefObject<null>
  children?:
    | JSX.Element
    | string
    | (string | JSX.Element | undefined | JSX.Element[])[]
    | string[]
    | JSX.Element[]
}

// eslint-disable-next-line react/display-name
export const Box = React.forwardRef(
  (
    { variant, className, children }: BoxProps,
    ref: React.LegacyRef<HTMLDivElement> | undefined
  ): JSX.Element => {
    const baseClass =
      'border shadow-none md:shadow-md rounded-none md:rounded-xl bg-white'
    const defaultClass = `w-full md:w-[710px] p-5 ${baseClass}`
    const wideClass = `w-full md:w-[710px] xl:w-[960px] p-5 ${baseClass}`

    let variantClass = defaultClass
    switch (variant) {
      case 'basic':
        variantClass = baseClass
        break
      case 'wide':
        variantClass = wideClass
        break
      default:
        variantClass = defaultClass
        break
    }

    return (
      <div className={classNames(variantClass, className)} ref={ref}>
        {children}
      </div>
    )
  }
)
