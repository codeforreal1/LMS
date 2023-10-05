'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { mergeClasses } from '@/utils/tailwind'
import HeroArt from '@/assets/images/hero-art.png'
import styles from './styles.module.css'

function HeroImage() {
  return (
    <motion.div
      className={mergeClasses([
        styles.heroArtImageStyles,
        'drop-shadow-2xl shrink-0',
      ])}
      animate={{ translateY: -50 }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        type: 'keyframes',
        duration: 8,
        ease: 'anticipate',
      }}
    >
      <Image
        src={HeroArt}
        alt="A panda coding in a laptop."
        loading="eager"
        priority
        quality={100}
        className="shrink-0 w-100 h-100"
        placeholder="blur"
      />
    </motion.div>
  )
}

export default HeroImage
