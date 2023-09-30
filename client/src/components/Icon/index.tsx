import React from 'react'

import registry from './registry'

export interface IconProps {
  name: keyof typeof registry
  size?: number
  className?: string
}

function Icon(props: IconProps) {
  const { name, size = 20, className } = props

  const SVGComponent = registry[name]

  if (SVGComponent == null) {
    console.warn(`No such icon named ${name}`)
    return null
  }

  return <SVGComponent className={className} width={size} height={size} />
}

export default Icon
