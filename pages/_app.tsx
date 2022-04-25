import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { useState } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
      supportedLngs: ['en-US', 'es-ES'],
      fallbackLng: "en-US",
      detection: {
        order: ['localStorage', 'cookie', 'htmlTag', 'sessionStorage', 'path', 'subdomain'],
        caches: ['localStorage']
      },
      react: {
        useSuspense: false
      },
      backend: {
        loadPath: "./assets/locales/{{lng}}/translation.json",
      }
    })

  return <SessionProvider session={session} refetchInterval={5 * 60}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default MyApp
