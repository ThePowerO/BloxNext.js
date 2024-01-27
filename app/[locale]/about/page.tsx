import React from 'react'
import { useTranslations } from 'next-intl'

const About = () => {

  const t = useTranslations("AboutPage");

  return (
    <div>
      {t("h1")}
    </div>
  )
}

export default About
