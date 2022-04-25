import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next'
import Navbar from '../components/Navbar';
import { useTranslation } from "react-i18next";
import Link from 'next/link';

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Habitat</title>
      </Head>
      <Navbar />
      <div>
        <h1>{t('Take a look inside')}</h1>
        <Link href={'/properties'}>{t('Properties')}</Link>
      </div>
    </>
  )
}

export default Home
