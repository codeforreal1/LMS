import React from 'react'

import Layout from '@/components/Layout'
import { mergeClasses } from '@/utils/tailwind'
import HeroBrandSVG from '@/assets/images/hero-brand.svg'
import styles from './styles.module.css'
import HeroImage from './HeroImage'

const HeroBrand = HeroBrandSVG as React.FC<React.SVGProps<SVGElement>>

function Hero() {
  return (
    <Layout className={mergeClasses([styles.heroContainer, 'relative'])}>
      <section className="flex lg:flex-row lg:justify-between flex-col items-center gap-16 lg:gap-0 px-8 lg:px-16 xl:px-24">
        <div className="z-[2] relative">
          <h1 className="uppercase hidden drop-shadow-xl">Code For Real</h1>
          <HeroBrand className="md:w-[300px] xl:w-[400px] w-[280px] m-auto md:m-0" />
          <h2 className="my-5 text-xl md:text-2xl text-primary dark:text-gray1 font-medium drop-shadow-xl text-center md:text-left">
            Coding Unleashed.
            <span className="block">Empowering Your Digital Odyssey.</span>
          </h2>
        </div>
        <HeroImage />
      </section>
      <div className={styles.animatedBG}></div>
    </Layout>
  )
}

export default Hero
