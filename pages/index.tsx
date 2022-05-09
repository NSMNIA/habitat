import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import Navbar from '../components/Navbar';

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
        {t('Habitat is a platform for realtors to advertise their properties and find the best ones.')}
        <br />
        <Link href={'/properties'}>{t('Properties')}</Link>
      </div>
    </>
  )
}

export default Home
