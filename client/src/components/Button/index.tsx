import React from 'react'
import {
  Button as NextButton,
  ButtonProps as NextButtonProps,
} from '@nextui-org/button'

import { mergeClasses } from '@/utils/tailwind'

interface ButtonProps {
  color?: NextButtonProps['color']
  variant?: NextButtonProps['variant']
}

function Button(props: ButtonProps & NextButtonProps) {
  const { color, variant, ...nextButtonProps } = props

  return (
    <NextButton
      {...nextButtonProps}
      color={color ?? 'default'}
      variant={variant ?? 'flat'}
      className={mergeClasses([nextButtonProps.className])}
    />
  )
}

export default Button
